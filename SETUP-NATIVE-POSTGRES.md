# 🚀 Setup & Running Guide - Native PostgreSQL (Port 5433)

Panduan lengkap instalasi dan menjalankan aplikasi NestJS Boilerplate DatiDashi dengan PostgreSQL native Windows (tanpa Docker).

---

## 📋 **Prerequisites**

Pastikan sudah terinstall:

- ✅ **Node.js** (v18 atau lebih tinggi) - [Download](https://nodejs.org/)
- ✅ **PostgreSQL** (versi 12+) - [Download](https://www.postgresql.org/download/windows/)
- ✅ **Git** - [Download](https://git-scm.com/)
- ✅ **VS Code** (Optional) - [Download](https://code.visualstudio.com/)

---

## 🔧 **Step 1: Clone Repository**

```bash
git clone https://github.com/PrkHlyaa/nestjs-boilerplate-DatiDashi.git
cd nestjs-boilerplate-DatiDashi
```

---

## 📦 **Step 2: Install Dependencies**

```bash
npm install
```

Tunggu hingga semua package terinstall (sekitar 2-5 menit).

---

## 🗄️ **Step 3: Setup PostgreSQL Native**

### **A. Install PostgreSQL di Windows**

1. Download PostgreSQL dari [postgresql.org](https://www.postgresql.org/download/windows/)
2. Jalankan installer
3. Saat instalasi, catat:
   - **Port:** `5433` (atau 5432 jika tidak bentrok)
   - **Username:** `postgres` (default)
   - **Password:** Buat password yang kuat (contoh: `postgres123`)
   - **Database:** `postgres` (default)

4. Centang "Stack Builder" (optional - untuk tools tambahan)

### **B. Verifikasi PostgreSQL Running**

Buka **PowerShell** atau **Command Prompt**:

```bash
# Cek service PostgreSQL
sc query postgresql-x64-16

# Expected Output:
# STATE: 4 RUNNING
```

Jika tidak running, start service:

```bash
# Start PostgreSQL service
net start postgresql-x64-16
```

### **C. Test Connection ke Database**

```bash
# Connect menggunakan psql
psql -h localhost -p 5433 -U postgres

# Jika berhasil, akan muncul prompt:
# postgres=#

# Keluar dari psql:
\q
```

---

## ⚙️ **Step 4: Konfigurasi Environment Variables**

### **A. Copy Environment Template**

```bash
# Copy file env-example-relational menjadi .env
cp env-example-relational .env
```

### **B. Edit File `.env`**

Buka file `.env` dengan text editor, lalu ubah konfigurasi database:

```env
# ========================================
# DATABASE CONFIGURATION (Native PostgreSQL)
# ========================================

# UBAH INI: Gunakan port native PostgreSQL Anda
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5433          # Sesuaikan dengan port PostgreSQL Anda
DATABASE_USERNAME=postgres  # Username PostgreSQL Anda
DATABASE_PASSWORD=postgres123  # Password PostgreSQL Anda
DATABASE_NAME=api           # Nama database yang akan dibuat
DATABASE_SYNCHRONIZE=false
DATABASE_MAX_CONNECTIONS=100
DATABASE_SSL_ENABLED=false
DATABASE_REJECT_UNAUTHORIZED=false
DATABASE_CA=
DATABASE_KEY=
DATABASE_CERT=

# ========================================
# JWT TOKEN CONFIGURATION
# ========================================

# REKOMENDASI: Perpanjang untuk development
AUTH_JWT_TOKEN_EXPIRES_IN=24h        # Token valid 24 jam (development)
AUTH_REFRESH_TOKEN_EXPIRES_IN=7d     # Refresh token valid 7 hari

# Generate secret keys dengan command:
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

AUTH_JWT_SECRET=your-secret-key-here
AUTH_REFRESH_SECRET=your-refresh-secret-key-here

# ========================================
# APPLICATION CONFIGURATION
# ========================================

NODE_ENV=development
APP_PORT=3000
APP_NAME=DatiDashi
FRONTEND_DOMAIN=http://localhost:3000
BACKEND_DOMAIN=http://localhost:3000
API_PREFIX=api

# ========================================
# MAIL CONFIGURATION (Development)
# ========================================

MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USER=
MAIL_PASSWORD=
MAIL_IGNORE_TLS=true
MAIL_SECURE=false
MAIL_REQUIRE_TLS=false
MAIL_DEFAULT_EMAIL=noreply@example.com
MAIL_DEFAULT_NAME=DatiDashi
MAIL_CLIENT_PORT=1080

# ========================================
# FILE UPLOAD CONFIGURATION
# ========================================

FILE_DRIVER=local
ACCESS_KEY_ID=
SECRET_ACCESS_KEY=
AWS_S3_REGION=
AWS_DEFAULT_S3_BUCKET=
```

### **C. Generate JWT Secret Keys**

Jalankan command ini untuk generate secret keys yang aman:

```bash
# Generate AUTH_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate AUTH_REFRESH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy hasil output dan paste ke file `.env`:

```env
AUTH_JWT_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
AUTH_REFRESH_SECRET=z6y5x4w3v2u1t0s9r8q7p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1
```

---

## 🗃️ **Step 5: Create Database**

### **A. Buat Database Baru**

```bash
# Connect ke PostgreSQL
psql -h localhost -p 5433 -U postgres

# Di prompt psql, jalankan:
CREATE DATABASE api;

# Verifikasi database dibuat:
\l

# Keluar:
\q
```

### **B. Atau otomatis dengan script:**

```bash
# Windows PowerShell
$env:PGPASSWORD="postgres123"; psql -h localhost -p 5433 -U postgres -c "CREATE DATABASE api;"
```

---

## 🔄 **Step 6: Run Database Migrations**

Migrasi akan membuat semua tabel yang diperlukan:

```bash
npm run migration:run
```

**Expected Output:**
```
query: SELECT * FROM current_schema()
query: CREATE TABLE "file" ...
query: CREATE TABLE "role" ...
query: CREATE TABLE "status" ...
query: CREATE TABLE "user" ...
query: CREATE TABLE "session" ...
query: CREATE TABLE "product" ...
query: CREATE TABLE "pricing" ...
query: CREATE TABLE "feature" ...
query: CREATE TABLE "about" ...
query: CREATE TABLE "organization_member" ...

Migration completed successfully!
```

---

## 🌱 **Step 7: Seed Database dengan Data Dummy**

Isi database dengan data dummy untuk testing:

```bash
npm run seed:run:relational
```

**Expected Output:**
```
Seeding: CreateAdmin1730000000000
Done seeding: CreateAdmin1730000000000
Seeding: CreateRoles1730000000001
Done seeding: CreateRoles1730000000001
Seeding: CreateStatuses1730000000002
Done seeding: CreateStatuses1730000000002
Seeding: CreateProducts1730000000003
Done seeding: CreateProducts1730000000003
Seeding: CreatePricings1730000000004
Done seeding: CreatePricings1730000000004
Seeding: CreateFeatures1730000000005
Done seeding: CreateFeatures1730000000005
Seeding: CreateAbout1730000000006
Done seeding: CreateAbout1730000000006
Seeding: CreateOrganizationMembers1730000000007
Done seeding: CreateOrganizationMembers1730000000007

All seeds completed successfully!
```

### **Default Admin Credentials:**

Setelah seeding, Anda bisa login dengan:

```
Email: admin@example.com
Password: secret
```

---

## 🚀 **Step 8: Run Application**

### **Development Mode (Recommended):**

```bash
npm run start:dev
```

**Expected Output:**
```
[Nest] Starting Nest application...
[Nest] TypeOrmModule dependencies initialized
[Nest] ConfigModule dependencies initialized
[Nest] PassportModule dependencies initialized
...
[Nest] Nest application successfully started
```

Server akan berjalan di: **http://localhost:3000**

### **Production Mode:**

```bash
# Build aplikasi
npm run build

# Run production
npm run start:prod
```

---

## 🌐 **Step 9: Access Application**

Buka browser dan akses:

### **Landing Page:**
```
http://localhost:3000
```

### **Login Page:**
```
http://localhost:3000/login
```

Login dengan credentials:
- **Email:** `admin@example.com`
- **Password:** `secret`

### **Admin Panel:**
```
http://localhost:3000/admin
```

Setelah login, Anda akan diarahkan ke admin panel untuk manage:
- Products
- Pricings
- Features
- About Sections
- Organization Members

### **API Documentation (Swagger):**
```
http://localhost:3000/docs
```

---

## 🔍 **Troubleshooting**

### **Problem 1: Port 5433 Already in Use**

```bash
# Cek process yang pakai port 5433
netstat -ano | findstr :5433

# Kill process (ganti PID dengan hasil dari command di atas)
taskkill /PID 1234 /F
```

### **Problem 2: Cannot Connect to Database**

**Cek PostgreSQL service:**
```bash
sc query postgresql-x64-16
```

**Start service jika stopped:**
```bash
net start postgresql-x64-16
```

**Test connection:**
```bash
psql -h localhost -p 5433 -U postgres
```

### **Problem 3: Migration Failed**

**Drop database dan buat ulang:**
```bash
# Connect ke postgres
psql -h localhost -p 5433 -U postgres

# Drop database
DROP DATABASE api;

# Buat ulang
CREATE DATABASE api;

# Keluar
\q

# Run migration lagi
npm run migration:run
```

### **Problem 4: Port 3000 Already in Use**

**Ubah port di `.env`:**
```env
APP_PORT=3001
```

Atau kill process:
```bash
netstat -ano | findstr :3000
taskkill /PID 1234 /F
```

### **Problem 5: JWT Token Unauthorized**

**Clear localStorage dan login ulang:**

Buka Console (F12) di browser:
```javascript
localStorage.clear();
window.location.href = '/login';
```

Lalu login dengan `admin@example.com` / `secret`

---

## 📝 **Useful Commands**

### **Database Commands:**

```bash
# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Generate new migration
npm run migration:generate -- src/database/migrations/YourMigrationName

# Run seeds
npm run seed:run:relational

# Create seed
npm run seed:create -- src/database/seeds/relational/YourSeedName
```

### **Development Commands:**

```bash
# Start development server
npm run start:dev

# Build production
npm run build

# Run production
npm run start:prod

# Run tests
npm run test

# Run E2E tests
npm run test:e2e

# Lint code
npm run lint

# Format code
npm run format
```

### **Database Management:**

```bash
# Connect to database
psql -h localhost -p 5433 -U postgres -d api

# List all tables
\dt

# Describe table
\d product

# View all data in products table
SELECT * FROM product;

# Count records
SELECT COUNT(*) FROM product;

# Exit
\q
```

---

## 🔄 **Switching from Docker (Port 5432) to Native (Port 5433)**

Jika sebelumnya menggunakan Docker PostgreSQL (port 5432), ikuti langkah ini:

### **1. Stop Docker Containers**

```bash
docker compose down
```

### **2. Install PostgreSQL Native**

Follow **Step 3** di atas.

### **3. Update `.env` File**

```env
# DARI (Docker):
DATABASE_HOST=postgres
DATABASE_PORT=5432

# KE (Native):
DATABASE_HOST=localhost
DATABASE_PORT=5433
```

### **4. Create New Database**

```bash
psql -h localhost -p 5433 -U postgres -c "CREATE DATABASE api;"
```

### **5. Run Migrations & Seeds**

```bash
npm run migration:run
npm run seed:run:relational
```

### **6. Start Application**

```bash
npm run start:dev
```

---

## 📊 **Database Structure**

Setelah migration, database akan memiliki tabel:

- **file** - File uploads
- **role** - User roles (Admin, User)
- **status** - User statuses (Active, Inactive)
- **user** - Users & admins
- **session** - User sessions
- **product** - Products/Services
- **pricing** - Pricing plans
- **feature** - Feature highlights
- **about** - About sections
- **organization_member** - Team members

---

## 🎯 **Next Steps**

1. ✅ Customize data dummy sesuai kebutuhan
2. ✅ Upload foto produk ke `public/images/products/`
3. ✅ Konfigurasi email service untuk production
4. ✅ Setup SSL certificate untuk HTTPS
5. ✅ Deploy ke hosting (Vercel, Railway, Heroku, dll)

---

## 📚 **Additional Resources**

- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Best Practices](https://jwt.io/introduction)

---

## 🆘 **Need Help?**

Jika mengalami masalah:

1. Cek section **Troubleshooting** di atas
2. Baca error message dengan teliti
3. Cek terminal output untuk error details
4. Verifikasi semua prerequisites terinstall
5. Pastikan PostgreSQL service running

---

## 📄 **License**

MIT License - See LICENSE file for details

---

**Happy Coding! 🚀**

*Last Updated: November 9, 2025*
