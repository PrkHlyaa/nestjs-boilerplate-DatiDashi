# 🚀 Deployment Guide - Vercel + Neon PostgreSQL

Panduan lengkap untuk deploy aplikasi NestJS DatiDashi ke Vercel dengan database Neon PostgreSQL.

---

## 📋 **Prerequisites**

1. ✅ Akun GitHub (sudah ada repository)
2. ✅ Akun Vercel (https://vercel.com)
3. ✅ Database Neon PostgreSQL sudah terkonfigurasi
4. ✅ Branch `nobby` sudah ter-push ke GitHub

---

## 🔧 **Step 1: Persiapan File**

### 1.1 Pastikan File Penting Ada:
- ✅ `vercel.json` - Konfigurasi Vercel
- ✅ `.vercelignore` - File yang diabaikan saat deployment
- ✅ `package.json` - Dependencies & build scripts
- ✅ `.env` - Template environment variables

### 1.2 Build Script di `package.json`:
```json
{
  "scripts": {
    "build": "nest build",
    "start:prod": "node dist/main"
  }
}
```

---

## 🌐 **Step 2: Setup Vercel**

### 2.1 Login ke Vercel
1. Buka https://vercel.com
2. Login dengan GitHub account
3. Authorize Vercel untuk akses repository

### 2.2 Import Project
1. Klik **"Add New Project"**
2. Pilih repository: `PrkHlyaa/nestjs-boilerplate-DatiDashi`
3. Pilih branch: **`nobby`** (PENTING!)
4. Framework Preset: **Other** (atau kosongkan)

### 2.3 Configure Project

**Build & Development Settings:**
```
Framework Preset: Other
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Development Command: npm run start:dev
```

---

## 🔐 **Step 3: Environment Variables di Vercel**

Tambahkan Environment Variables berikut di Vercel Dashboard:

### **General Settings:**
```bash
NODE_ENV=production
APP_PORT=3000
APP_NAME=NestJS DatiDashi API
API_PREFIX=api
APP_FALLBACK_LANGUAGE=en
APP_HEADER_LANGUAGE=x-custom-lang
FRONTEND_DOMAIN=https://your-vercel-app.vercel.app
BACKEND_DOMAIN=https://your-vercel-app.vercel.app
```

### **Database Neon (PENTING!):**
```bash
DATABASE_TYPE=postgres
DATABASE_URL=postgresql://neondb_owner:npg_ovVcL6pGE1Mm@ep-cold-water-a150onl8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
DATABASE_SYNCHRONIZE=false
DATABASE_MAX_CONNECTIONS=100
DATABASE_SSL_ENABLED=true
DATABASE_REJECT_UNAUTHORIZED=false
```

### **File Upload:**
```bash
FILE_DRIVER=local
```

### **JWT Authentication:**
```bash
AUTH_JWT_SECRET=your-super-secret-jwt-key-production
AUTH_JWT_TOKEN_EXPIRES_IN=24h
AUTH_REFRESH_SECRET=your-super-secret-refresh-key-production
AUTH_REFRESH_TOKEN_EXPIRES_IN=45d
AUTH_FORGOT_SECRET=your-secret-for-forgot-password
AUTH_FORGOT_TOKEN_EXPIRES_IN=30m
AUTH_CONFIRM_EMAIL_SECRET=your-secret-for-confirm-email
AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN=1d
```

### **Email (Opsional - untuk production bisa gunakan SendGrid/Mailgun):**
```bash
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_IGNORE_TLS=false
MAIL_SECURE=false
MAIL_REQUIRE_TLS=true
MAIL_DEFAULT_EMAIL=noreply@datidashi.com
MAIL_DEFAULT_NAME=DatiDashi
```

---

## 🚀 **Step 4: Deploy**

### 4.1 Deploy via Vercel Dashboard
1. Klik **"Deploy"** setelah konfigurasi selesai
2. Tunggu proses build (~2-5 menit)
3. Vercel akan otomatis deploy

### 4.2 Deploy via CLI (Alternatif)
```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel --prod
```

---

## 🗄️ **Step 5: Database Migration (PENTING!)**

Setelah deployment berhasil, jalankan migration di Neon:

### 5.1 Via Local Terminal:
```bash
# Pastikan .env sudah mengarah ke Neon
npm run migration:run
```

### 5.2 Via Neon SQL Editor:
1. Buka Neon Dashboard: https://console.neon.tech
2. Pilih database `neondb`
3. Buka **SQL Editor**
4. Jalankan migration manual jika diperlukan

### 5.3 Seed Data (Opsional):
```bash
npm run seed:run:relational
```

---

## ✅ **Step 6: Verifikasi Deployment**

### 6.1 Cek URL Deployment:
Vercel akan memberikan URL seperti:
- **Production:** `https://nestjs-boilerplate-dati-dashi.vercel.app`
- **Preview:** `https://nestjs-boilerplate-dati-dashi-git-nobby-prkhlyaa.vercel.app`

### 6.2 Test Endpoints:
```bash
# Home Page
https://your-app.vercel.app/

# API Health Check
https://your-app.vercel.app/api/

# Login Page
https://your-app.vercel.app/login

# Admin Panel
https://your-app.vercel.app/admin
```

### 6.3 Test API dengan cURL:
```bash
# Get Products
curl https://your-app.vercel.app/api/products

# Login (harus POST)
curl -X POST https://your-app.vercel.app/api/auth/email/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secret"}'
```

---

## 🔧 **Troubleshooting**

### ❌ **Error: Cannot find module 'dist/main'**
**Solusi:**
1. Pastikan build script berjalan: `npm run build` di local
2. Cek `vercel.json` src harus `dist/main.js`
3. Cek `package.json` ada script `build`

### ❌ **Error: Database connection failed**
**Solusi:**
1. Cek environment variables di Vercel Dashboard
2. Pastikan `DATABASE_URL` benar
3. Pastikan `DATABASE_SSL_ENABLED=true`
4. Cek Neon database masih aktif

### ❌ **Error: 502 Bad Gateway**
**Solusi:**
1. Cek build logs di Vercel Dashboard
2. Pastikan `dist/main.js` ter-generate
3. Cek dependencies di `package.json`

### ❌ **Error: Module not found**
**Solusi:**
```bash
# Install semua dependencies
npm install

# Clear cache & rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## 🔄 **Update Deployment**

### Auto Deploy (Git Push):
```bash
git add .
git commit -m "feat: update feature"
git push origin nobby
```
Vercel otomatis deploy setiap push ke branch `nobby`.

### Manual Redeploy:
1. Buka Vercel Dashboard
2. Pilih project
3. Tab **Deployments**
4. Klik **⋯** → **Redeploy**

---

## 📊 **Monitoring**

### Vercel Dashboard:
- **Analytics:** Lihat traffic, response time
- **Logs:** Real-time logs untuk debugging
- **Domains:** Custom domain setup

### Neon Dashboard:
- **Database Size:** Monitor storage usage
- **Connections:** Lihat active connections
- **Queries:** Slow query analysis

---

## 🎯 **Production Checklist**

- [ ] Environment variables sudah di-set di Vercel
- [ ] Database Neon sudah running
- [ ] Migration sudah dijalankan
- [ ] Seed data sudah di-insert
- [ ] JWT secret sudah diganti (production secret)
- [ ] CORS sudah dikonfigurasi dengan benar
- [ ] Email service sudah dikonfigurasi (jika diperlukan)
- [ ] Custom domain sudah di-set (opsional)
- [ ] SSL/HTTPS aktif (otomatis dari Vercel)

---

## 🔗 **Useful Links**

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Neon Dashboard:** https://console.neon.tech
- **Repository:** https://github.com/PrkHlyaa/nestjs-boilerplate-DatiDashi
- **Branch Nobby:** https://github.com/PrkHlyaa/nestjs-boilerplate-DatiDashi/tree/nobby

---

## 📝 **Notes**

1. **Vercel Free Tier:**
   - ✅ 100GB bandwidth/month
   - ✅ Unlimited deployments
   - ✅ Automatic HTTPS
   - ⚠️ Serverless functions timeout: 10s (Hobby) / 60s (Pro)

2. **Neon Free Tier:**
   - ✅ 0.5GB storage
   - ✅ 1 project
   - ✅ Always-on compute (dengan batasan)
   - ⚠️ Database auto-suspend setelah 5 menit idle

3. **Performance Tips:**
   - Gunakan connection pooling (sudah ada di DATABASE_URL)
   - Set `DATABASE_MAX_CONNECTIONS=100`
   - Monitor Vercel function execution time

---

**Deployment Berhasil! 🎉**

Aplikasi NestJS DatiDashi sudah live di Vercel dengan database Neon PostgreSQL.
