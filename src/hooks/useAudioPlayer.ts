import { useState, useRef, useCallback } from 'react';

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentExercise: string | null;
  currentMeditation: string | null;
}

export const useAudioPlayer = () => {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.7,
    currentExercise: null,
    currentMeditation: null
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playBreathingTone = useCallback((frequency: number = 220, duration: number = 4000) => {
    const audioContext = initAudioContext();
    
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(state.volume * 0.3, audioContext.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;
  }, [state.volume, initAudioContext]);

  const playBreathingExercise = useCallback((exerciseType: string) => {
    // Stop any currently playing audio
    if (state.isPlaying) {
      stop();
    }
    
    setState(prev => ({ 
      ...prev, 
      isPlaying: true, 
      currentExercise: exerciseType,
      currentMeditation: null 
    }));
    
    const patterns = {
      '4-7-8': {
        inhale: 4000,
        hold: 7000,
        exhale: 8000,
        cycles: 4
      },
      'box': {
        inhale: 4000,
        hold: 4000,
        exhale: 4000,
        hold2: 4000,
        cycles: 5
      },
      'belly': {
        inhale: 6000,
        exhale: 6000,
        cycles: 6
      }
    };

    const pattern = patterns[exerciseType as keyof typeof patterns];
    if (!pattern) return;

    let currentCycle = 0;
    const totalDuration = Object.values(pattern).reduce((sum, val) => 
      typeof val === 'number' && val < 1000 ? sum : sum + (val as number), 0
    ) * pattern.cycles;

    setState(prev => ({ ...prev, duration: totalDuration / 1000 }));

    const runCycle = () => {
      if (currentCycle >= pattern.cycles) {
        setState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      currentTime: 0,
      currentExercise: null,
      currentMeditation: null 
    }));
        return;
      }

      let phaseTime = 0;
      
      // Inhale
      setTimeout(() => {
        playBreathingTone(220, pattern.inhale);
      }, phaseTime);
      phaseTime += pattern.inhale;

      // Hold (if exists)
      if ('hold' in pattern) {
        setTimeout(() => {
          playBreathingTone(330, pattern.hold);
        }, phaseTime);
        phaseTime += pattern.hold;
      }

      // Exhale
      setTimeout(() => {
        playBreathingTone(165, pattern.exhale);
      }, phaseTime);
      phaseTime += pattern.exhale;

      // Second hold for box breathing
      if ('hold2' in pattern) {
        setTimeout(() => {
          playBreathingTone(275, pattern.hold2);
        }, phaseTime);
        phaseTime += pattern.hold2;
      }

      currentCycle++;
      setTimeout(runCycle, phaseTime);
    };

    // Start progress tracking
    let startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setState(prev => ({ ...prev, currentTime: elapsed }));
    }, 100);

    runCycle();
  }, [playBreathingTone]);

  const playMeditation = useCallback((meditationId: string) => {
    // Stop any currently playing audio
    if (state.isPlaying) {
      stop();
    }
    
    setState(prev => ({ 
      ...prev, 
      isPlaying: true, 
      currentMeditation: meditationId,
      currentExercise: null 
    }));
    
    // Simulate meditation audio with ambient tones
    const durations = {
      '1': 15 * 60, // 15 minutes
      '2': 20 * 60, // 20 minutes
      '3': 12 * 60, // 12 minutes
      '4': 5 * 60   // 5 minutes
    };

    const duration = durations[meditationId as keyof typeof durations] || 10 * 60;
    setState(prev => ({ ...prev, duration }));

    // Play ambient background tone
    const audioContext = initAudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(110, audioContext.currentTime); // Low ambient tone
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(state.volume * 0.1, audioContext.currentTime + 2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);

    oscillatorRef.current = oscillator;
    gainNodeRef.current = gainNode;

    // Progress tracking
    let startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed >= duration) {
        stop();
      } else {
        setState(prev => ({ ...prev, currentTime: elapsed }));
      }
    }, 1000);
  }, [state.volume, initAudioContext]);

  const stop = useCallback(() => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
      oscillatorRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      currentTime: 0,
      currentExercise: null,
      currentMeditation: null 
    }));
  }, []);

  const setVolume = useCallback((volume: number) => {
    setState(prev => ({ ...prev, volume }));
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.3, audioContextRef.current?.currentTime || 0);
    }
  }, []);

  return {
    ...state,
    playBreathingExercise,
    playMeditation,
    stop,
    setVolume
  };
};