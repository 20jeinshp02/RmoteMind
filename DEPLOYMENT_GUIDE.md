# Production Deployment Guide

This guide covers deploying your wellness application with Stripe payment integration to production.

## 🚀 Deployment Options

### Option 1: Heroku (Recommended for beginners)

#### 1. Install Heroku CLI (Multiple Options)

**Option A: Using Homebrew (if available)**
```bash
brew install heroku/brew/heroku
```

**Option B: Direct Download (Recommended if no Homebrew)**
1. Go to [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. Download the installer for macOS
3. Run the installer package

**Option C: Using npm**
```bash
npm install -g heroku
```

**Option D: Using curl**
```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

#### 2. Login to Heroku
```bash
heroku login
```

#### 2. Create Heroku App
```bash
# Create new app
heroku create your-wellness-app-backend

# Add environment variables
heroku config:set STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
heroku config:set CLIENT_URL=https://your-frontend-domain.com
heroku config:set NODE_ENV=production
```

#### 3. Deploy Backend
```bash
# Create Procfile
echo "web: node backend-example.js" > Procfile

# Initialize git and deploy
git init
git add .
git commit -m "Initial backend deployment"
heroku git:remote -a your-wellness-app-backend
git push heroku main
```

#### 4. Update Frontend Configuration
Update your frontend `.env`:
```env
VITE_API_URL=https://your-wellness-app-backend.herokuapp.com/api
VITE_ENVIRONMENT=production
```

### Option 2: Vercel (For full-stack deployment)

#### 1. Install Vercel CLI
```bash
npm i -g vercel
vercel login
```

#### 2. Configure vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend-example.js",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/backend-example.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ],
  "env": {
    "STRIPE_SECRET_KEY": "@stripe-secret-key",
    "STRIPE_WEBHOOK_SECRET": "@stripe-webhook-secret",
    "NODE_ENV": "production"
  }
}
```

#### 3. Deploy
```bash
# Add environment variables
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET

# Deploy
vercel --prod
```

### Option 3: DigitalOcean App Platform

#### 1. Create App
- Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
- Connect your GitHub repository
- Configure build settings

#### 2. Environment Variables
Add in App Platform dashboard:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NODE_ENV=production`
- `CLIENT_URL=https://your-frontend-domain.com`

### Option 4: AWS (Advanced)

#### Using AWS Lambda + API Gateway
1. Package your backend as Lambda function
2. Set up API Gateway for HTTP endpoints
3. Configure environment variables in Lambda
4. Set up CloudFront for frontend distribution

## 🔧 Frontend Deployment

### Option 1: Netlify
```bash
# Build for production
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=dist
```

### Option 2: Vercel
```bash
# Deploy frontend
vercel --prod
```

### Option 3: GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Deploy
npm run build
npm run deploy
```

## 🔒 Security Checklist

### Environment Variables
- ✅ Never commit `.env` files to version control
- ✅ Use platform-specific environment variable systems
- ✅ Rotate keys regularly
- ✅ Use different keys for staging/production

### HTTPS & CORS
- ✅ Enable HTTPS on all domains
- ✅ Configure CORS properly
- ✅ Set secure headers
- ✅ Use CSP (Content Security Policy)

### Webhook Security
- ✅ Verify webhook signatures
- ✅ Use HTTPS endpoints only
- ✅ Implement rate limiting
- ✅ Log webhook events for debugging

## 📊 Monitoring & Logging

### Application Monitoring
```javascript
// Add to your backend
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log important events
logger.info('Payment successful', { sessionId, amount, customer });
logger.error('Webhook verification failed', { error: err.message });
```

### Health Check Endpoint
```javascript
// Add to backend-example.js
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  });
});
```

### Stripe Monitoring
- Monitor webhook delivery success rates
- Set up alerts for failed payments
- Track subscription metrics
- Monitor for suspicious activity

## 🧪 Testing in Production

### Smoke Tests
1. **Frontend loads correctly**
2. **"See Plans" button works**
3. **Subscription modal opens**
4. **Stripe checkout redirects properly**
5. **Webhooks receive events**
6. **Success page displays**

### Load Testing
```bash
# Install artillery
npm install -g artillery

# Create load test config
echo '
config:
  target: "https://your-backend-domain.com"
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "Health check"
    requests:
      - get:
          url: "/health"
' > load-test.yml

# Run load test
artillery run load-test.yml
```

## 🚨 Troubleshooting

### Common Production Issues

1. **CORS Errors**
   ```javascript
   // Update CORS configuration
   app.use(cors({
     origin: process.env.CLIENT_URL,
     credentials: true
   }));
   ```

2. **Environment Variables Not Loading**
   ```bash
   # Check if variables are set
   heroku config
   # or
   vercel env ls
   ```

3. **Webhook Timeouts**
   ```javascript
   // Add timeout handling
   app.use('/webhook/stripe', express.raw({ 
     type: 'application/json',
     limit: '1mb'
   }));
   ```

4. **SSL Certificate Issues**
   - Ensure HTTPS is properly configured
   - Check certificate validity
   - Verify domain DNS settings

### Debug Commands
```bash
# Check server logs
heroku logs --tail
# or
vercel logs

# Test webhook endpoint
curl -X POST https://your-domain.com/webhook/stripe \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Check SSL certificate
openssl s_client -connect your-domain.com:443
```

## 📈 Performance Optimization

### Frontend
- Enable gzip compression
- Optimize images and assets
- Use CDN for static files
- Implement lazy loading

### Backend
- Use connection pooling
- Implement caching
- Add rate limiting
- Optimize database queries

### Monitoring Tools
- **Uptime**: UptimeRobot, Pingdom
- **Performance**: New Relic, DataDog
- **Errors**: Sentry, Bugsnag
- **Analytics**: Google Analytics, Mixpanel

---

**Ready for production?** Follow this guide step by step and you'll have a robust, scalable payment system! 🚀