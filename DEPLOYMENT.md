# 🚀 Deployment Guide untuk Vercel

## ⚠️ Penting: File Storage di Vercel

Vercel serverless functions **tidak bisa menulis ke filesystem biasa** (read-only). File uploads menggunakan `/tmp` directory (max 512MB, bersifat temporary).

### 📌 **Rekomendasi Production:**
Untuk production, sebaiknya gunakan **AWS S3** atau **cloud storage** lain. Aplikasi ini sudah support S3:
```env
FILE_DRIVER = s3  # Ganti dari 'local' ke 's3'
ACCESS_KEY_ID = your-aws-access-key
SECRET_ACCESS_KEY = your-aws-secret-key
AWS_DEFAULT_S3_BUCKET = your-bucket-name
AWS_S3_REGION = us-east-1
```

> **Note:** Saat ini menggunakan `/tmp/files` untuk temporary file storage. File akan hilang setelah serverless function restart.

---

## 📋 Langkah-langkah Deploy ke Vercel

### 1️⃣ **Persiapan Environment Variables**

Error yang Anda alami terjadi karena environment variables tidak terdefinisi di Vercel. Berikut cara mengatasinya:

#### **A. Melalui Vercel Dashboard (RECOMMENDED)**

1. Buka [Vercel Dashboard](https://vercel.com/dashboard)
2. Pilih project Anda atau import project baru
3. Masuk ke **Settings** → **Environment Variables**
4. Tambahkan variable berikut **SATU PER SATU**:

##### **Required Variables:**

```env
NODE_ENV = production
APP_PORT = 3000
APP_NAME = NestJS API
API_PREFIX = api
APP_FALLBACK_LANGUAGE = en
APP_HEADER_LANGUAGE = x-custom-lang
```

##### **Frontend/Backend URLs:**
```env
FRONTEND_DOMAIN = https://your-app.vercel.app
BACKEND_DOMAIN = https://your-app.vercel.app
```
⚠️ **Ganti dengan URL Vercel Anda setelah deploy pertama**

##### **Database (Neon PostgreSQL):**
```env
DATABASE_TYPE = postgres
DATABASE_HOST = ep-sparkling-scene-ad0gdtgu-pooler.c-2.us-east-1.aws.neon.tech
DATABASE_PORT = 5432
DATABASE_USERNAME = neondb_owner
DATABASE_PASSWORD = npg_n92jxqepGkLS
DATABASE_NAME = neondb
DATABASE_SYNCHRONIZE = false
DATABASE_MAX_CONNECTIONS = 100
DATABASE_SSL_ENABLED = true
DATABASE_REJECT_UNAUTHORIZED = false
DATABASE_URL = postgresql://neondb_owner:npg_n92jxqepGkLS@ep-sparkling-scene-ad0gdtgu-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

##### **File Storage:**
```env
FILE_DRIVER = local
```

##### **Mail Configuration:**
```env
MAIL_HOST = localhost
MAIL_PORT = 1025
MAIL_DEFAULT_EMAIL = noreply@example.com
MAIL_DEFAULT_NAME = Api
MAIL_IGNORE_TLS = true
MAIL_SECURE = false
MAIL_REQUIRE_TLS = false
```

##### **Authentication Secrets (⚠️ GANTI INI!):**
```env
AUTH_JWT_SECRET = your_very_long_random_secret_key_here_min_32_chars
AUTH_JWT_TOKEN_EXPIRES_IN = 15m
AUTH_REFRESH_SECRET = your_very_long_random_refresh_secret_here_min_32_chars
AUTH_REFRESH_TOKEN_EXPIRES_IN = 3650d
AUTH_FORGOT_SECRET = your_very_long_random_forgot_secret_here_min_32_chars
AUTH_FORGOT_TOKEN_EXPIRES_IN = 30m
AUTH_CONFIRM_EMAIL_SECRET = your_very_long_random_email_secret_here_min_32_chars
AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN = 1d
```

**Generate Random Secrets:**
```bash
# Jalankan di terminal untuk generate random secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

##### **Worker (Optional, jika pakai Redis):**
```env
WORKER_HOST = redis://your-redis-host:6379/1
```

---

#### **B. Melalui Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Set environment variables
vercel env add NODE_ENV
vercel env add DATABASE_TYPE
vercel env add DATABASE_HOST
# ... dan seterusnya
```

---

### 2️⃣ **Konfigurasi Build & Deploy**

File `vercel.json` sudah dibuat dengan konfigurasi:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/main.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/main.ts"
    }
  ]
}
```

---

### 3️⃣ **Deploy ke Vercel**

#### **Via Dashboard:**
1. Push code ke GitHub
2. Import project di Vercel Dashboard
3. Pilih repository
4. Vercel akan otomatis detect NestJS
5. Set environment variables (lihat step 1)
6. Deploy!

#### **Via CLI:**
```bash
# Deploy
vercel

# Deploy ke production
vercel --prod
```

---

### 4️⃣ **Troubleshooting**

#### **Error: Environment Variables validation failed**
✅ **Solusi:** Pastikan SEMUA variable yang required sudah diset di Vercel

Cek file: `src/utils/validate-config.ts` untuk list semua variable yang required.

#### **Error: Database connection failed**
✅ **Solusi:** 
- Pastikan `DATABASE_SSL_ENABLED=true`
- Pastikan Neon database sudah aktif
- Check connection string di `DATABASE_URL`

#### **Error: Cannot find module**
✅ **Solusi:**
```bash
# Clear cache & reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Error: Build timeout**
✅ **Solusi:** Vercel free tier memiliki limit 45 detik untuk build. Jika project terlalu besar, consider:
- Upgrade ke Vercel Pro
- Atau deploy ke platform lain (Railway, Render, Fly.io)

---

### 5️⃣ **Post-Deployment**

1. **Update Domain URLs:**
   Setelah deploy berhasil, update environment variables:
   ```env
   FRONTEND_DOMAIN = https://your-actual-app.vercel.app
   BACKEND_DOMAIN = https://your-actual-app.vercel.app
   ```

2. **Test API:**
   ```bash
   curl https://your-app.vercel.app/api
   ```

3. **Check Logs:**
   - Vercel Dashboard → Project → Deployments → View Function Logs

4. **Setup Custom Domain (Optional):**
   - Vercel Dashboard → Project → Settings → Domains

---

### 6️⃣ **Alternative: Deploy ke Platform Lain**

Jika Vercel tidak cocok, coba platform lain:

#### **Railway** (Recommended untuk NestJS)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login & Deploy
railway login
railway init
railway up
```

#### **Render**
1. Connect GitHub
2. New Web Service
3. Set environment variables
4. Deploy

#### **Fly.io**
```bash
# Install flyctl
brew install flyctl  # Mac
# atau download dari fly.io

# Deploy
fly launch
```

---

## 🔐 **Security Notes**

1. ⚠️ **JANGAN commit file `.env` ke Git**
2. ⚠️ **Ganti semua secret keys di production**
3. ⚠️ **Use strong random passwords**
4. ✅ Enable database SSL
5. ✅ Use environment variables untuk semua secrets

---

## 📝 **Checklist Deploy**

- [ ] Set semua environment variables di Vercel
- [ ] Ganti AUTH secrets dengan random keys
- [ ] Pastikan DATABASE_SSL_ENABLED=true
- [ ] Test database connection
- [ ] Push code ke GitHub
- [ ] Deploy ke Vercel
- [ ] Update FRONTEND_DOMAIN & BACKEND_DOMAIN
- [ ] Test API endpoints
- [ ] Check logs untuk errors
- [ ] Setup custom domain (optional)

---

## 🆘 **Need Help?**

Jika masih ada error:
1. Check Vercel Function Logs
2. Verify semua environment variables
3. Test locally dengan `npm run start:prod`
4. Check Neon database status
5. Contact support atau buka issue di GitHub

---

**Happy Deploying! 🚀**
