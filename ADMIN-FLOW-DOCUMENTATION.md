# 🔐 Admin Panel - Complete Flow Documentation

## 🎯 User Journey

### 1. **Landing Page** (Home - Public)
**URL:** `http://localhost:3000/`

**Sections Displayed:**
- ✅ **Hero Section** - Welcome banner
- ✅ **About Section** - Managed by admin via `/admin/about`
- ✅ **Organization Structure** - Managed by admin via `/admin/members`
- ✅ **Products & Services** - Managed by admin via `/admin/products`
- ✅ **Features** - Managed by admin via `/admin/features`
- ✅ **Pricing** - Managed by admin via `/admin/pricings`

**Login Access:**
- Top-right corner: **"Login"** button
- Navigates to: `/login`

---

### 2. **Login Page**
**URL:** `http://localhost:3000/login`

**Credentials:**
```
Email: admin@example.com
Password: secret
```

**Login Process:**
1. User enters email & password
2. Click "Login" button
3. System calls API: `POST /api/v1/auth/email/login`
4. On success:
   - Token saved to `localStorage.authToken`
   - Redirect to: `/admin` (Admin Dashboard)
5. On failure:
   - Error message displayed

---

### 3. **Admin Dashboard**
**URL:** `http://localhost:3000/admin`

**Authentication:** Required (JWT token)

**Dashboard Stats:**
- Total Products
- Total Pricings
- Total Features
- Total About Sections
- Total Team Members

**Navigation Menu:**
- 📊 Dashboard (current)
- 👥 Users Management
- 📦 Products Management
- 💰 Pricing Management
- ⭐ Features Management
- ℹ️ About Management
- 👨‍💼 Team Members Management

---

## 📋 Admin Can Manage (CRUD Operations)

### 1. **Products** (`/admin/products`)

**What Users See on Landing Page:**
- Section: "Produk dan Layanan"

**Admin Can:**
- ➕ Create new product
- ✏️ Edit existing product
- 🗑️ Delete product
- 👁️ View all products

**Fields:**
- `jumlah` (number) - Quantity/Count
- `judul` (string) - Title
- `deskripsi` (text) - Description

**API Endpoints:**
```
POST   /api/products         (Create - Auth Required)
GET    /api/products         (Read All - Public)
GET    /api/products/:id     (Read One - Public)
PATCH  /api/products/:id     (Update - Auth Required)
DELETE /api/products/:id     (Delete - Auth Required)
```

---

### 2. **Pricing Plans** (`/admin/pricings`)

**What Users See on Landing Page:**
- Section: "Paket Harga"

**Admin Can:**
- ➕ Create new pricing plan
- ✏️ Edit plan details
- 🗑️ Delete plan
- 👁️ View all plans

**Fields:**
- `name` (string) - Plan name (e.g., "Starter Plan")
- `description` (text) - Plan description
- `price` (decimal) - Price in rupiah
- `period` (string) - Billing period (month/year/project)
- `features` (json) - Array of features

**Example:**
```json
{
  "name": "Professional Plan",
  "description": "Ideal for growing businesses",
  "price": 15000000,
  "period": "project",
  "features": ["Custom Web App", "Database Design", "API Development"]
}
```

**API Endpoints:**
```
POST   /api/pricings         (Create - Auth Required)
GET    /api/pricings         (Read All - Public)
GET    /api/pricings/:id     (Read One - Public)
PATCH  /api/pricings/:id     (Update - Auth Required)
DELETE /api/pricings/:id     (Delete - Auth Required)
```

---

### 3. **Features** (`/admin/features`)

**What Users See on Landing Page:**
- Section: "Fitur Unggulan"

**Admin Can:**
- ➕ Create new feature
- ✏️ Edit feature
- 🗑️ Delete feature
- 👁️ View all features

**Fields:**
- `name` (string) - Feature name
- `description` (text) - Feature description
- `icon` (string) - FontAwesome icon class (e.g., "fa-shield-alt")

**Icon Examples:**
- `fa-expand-arrows-alt` - Scalability
- `fa-shield-alt` - Security
- `fa-headset` - Support
- `fa-cloud` - Cloud Technology
- `fa-chart-line` - Analytics

**API Endpoints:**
```
POST   /api/features         (Create - Auth Required)
GET    /api/features         (Read All - Public)
GET    /api/features/:id     (Read One - Public)
PATCH  /api/features/:id     (Update - Auth Required)
DELETE /api/features/:id     (Delete - Auth Required)
```

---

### 4. **Team Members** (`/admin/members`)

**What Users See on Landing Page:**
- Section: "Struktur Organisasi"

**Admin Can:**
- ➕ Add new team member
- ✏️ Edit member info
- 🗑️ Remove member
- 👁️ View all members

**Fields:**
- `name` (string) - Member name
- `position` (string) - Job title/position
- `photoUrl` (string) - Photo URL (optional)

**Example:**
```json
{
  "name": "Rizki Pratama",
  "position": "CEO & Founder",
  "photoUrl": "https://images.unsplash.com/photo-123.jpg"
}
```

**API Endpoints:**
```
POST   /api/organization-members         (Create - Auth Required)
GET    /api/organization-members         (Read All - Public)
GET    /api/organization-members/:id     (Read One - Public)
PATCH  /api/organization-members/:id     (Update - Auth Required)
DELETE /api/organization-members/:id     (Delete - Auth Required)
```

---

### 5. **About Sections** (`/admin/about`)

**What Users See on Landing Page:**
- Section: "Tentang Kami"
- Dynamic content based on admin input

**Admin Can:**
- ➕ Create new about section
- ✏️ Edit section content
- 🗑️ Delete section
- 👁️ View all sections
- 🔄 Reorder sections (via `order` field)
- 👁️‍🗨️ Toggle active/inactive status

**Fields:**
- `title` (string) - Section title
- `description` (text) - Section content
- `section` (string) - Section type (about/vision/mission/history/values)
- `imageUrl` (string) - Optional image URL
- `order` (number) - Display order (0, 1, 2...)
- `isActive` (boolean) - Show/hide on public page

**Example:**
```json
{
  "title": "Visi Kami",
  "description": "Menjadi pemimpin dalam inovasi teknologi...",
  "section": "vision",
  "imageUrl": "https://example.com/vision.jpg",
  "order": 1,
  "isActive": true
}
```

**API Endpoints:**
```
POST   /api/about         (Create - Auth Required)
GET    /api/about         (Read All - Public)
GET    /api/about/:id     (Read One - Public)
PATCH  /api/about/:id     (Update - Auth Required)
DELETE /api/about/:id     (Delete - Auth Required)
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────┐
│  Landing Page   │
│   (Home.hbs)    │
└────────┬────────┘
         │
         ├──► Hero Section (Static)
         │
         ├──► About Section ◄───────┐
         │                          │
         ├──► Organization ◄────────┤
         │                          │
         ├──► Products ◄────────────┤
         │                          │
         ├──► Features ◄────────────┤
         │                          │
         └──► Pricing ◄─────────────┤
                                    │
┌───────────────────────────────────┤
│         DATABASE                  │
│                                   │
│  ┌─────────────────┐             │
│  │ abouts          │◄────────────┤
│  ├─────────────────┤             │
│  │ organization_   │◄────────────┤
│  │ members         │             │
│  ├─────────────────┤             │
│  │ products        │◄────────────┤
│  ├─────────────────┤             │
│  │ features        │◄────────────┤
│  ├─────────────────┤             │
│  │ pricings        │◄────────────┤
│  └─────────────────┘             │
│                                   │
└───────────────────────────────────┤
                                    │
┌───────────────────────────────────┘
│   ADMIN PANEL
│   (Login Required)
│
├──► /admin/about      (Manage About)
├──► /admin/members    (Manage Team)
├──► /admin/products   (Manage Products)
├──► /admin/features   (Manage Features)
└──► /admin/pricings   (Manage Pricing)
```

---

## 🔐 Authentication & Authorization

### Token Storage
- **Location:** `localStorage.authToken`
- **Type:** JWT Bearer Token
- **Expiry:** Stored in `localStorage.tokenExpiry`

### Protected Routes (Require Auth)
- ✅ All admin pages (`/admin/*`)
- ✅ All CUD operations (Create, Update, Delete)

### Public Routes (No Auth)
- ✅ Landing page (`/`)
- ✅ Login page (`/login`)
- ✅ All GET endpoints (Read operations)

### Auth Flow
```javascript
// 1. Login
POST /api/v1/auth/email/login
Body: { email, password }
Response: { token, refreshToken, tokenExpires }

// 2. Store token
localStorage.setItem('authToken', token);

// 3. Use token in requests
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}

// 4. Handle expired token
if (response.status === 401) {
  // Redirect to login
  window.location.href = '/login';
}
```

---

## 📝 CRUD Operations - Step by Step

### Example: Managing Pricing Plans

#### 1. **CREATE** New Pricing Plan

**Steps:**
1. Navigate to `/admin/pricings`
2. Click "Add Pricing Plan" button
3. Fill form:
   - Name: "Enterprise Plan"
   - Description: "For large organizations"
   - Price: 50000000
   - Period: "project"
4. Click "Save"

**What Happens:**
```javascript
POST /api/pricings
Headers: { Authorization: Bearer <token> }
Body: {
  "name": "Enterprise Plan",
  "description": "For large organizations",
  "price": 50000000,
  "period": "project"
}

Response: 201 Created
{
  "id": "uuid-here",
  "name": "Enterprise Plan",
  ...
}
```

**Result:**
- New plan saved to database
- Appears on admin list
- **Immediately visible on public landing page**

---

#### 2. **UPDATE** Existing Plan

**Steps:**
1. Find plan in list
2. Click "Edit" button
3. Modify fields (e.g., change price to 45000000)
4. Click "Save"

**What Happens:**
```javascript
PATCH /api/pricings/:id
Headers: { Authorization: Bearer <token> }
Body: {
  "price": 45000000
}

Response: 200 OK
{
  "id": "uuid-here",
  "price": 45000000,
  ...
}
```

**Result:**
- Plan updated in database
- **Landing page shows new price immediately** (after refresh)

---

#### 3. **DELETE** Plan

**Steps:**
1. Find plan in list
2. Click "Delete" button
3. Confirm deletion

**What Happens:**
```javascript
DELETE /api/pricings/:id
Headers: { Authorization: Bearer <token> }

Response: 200 OK
```

**Result:**
- Plan removed from database
- **Disappears from landing page**

---

## 🎨 UI Components

### Admin Panel Features
- ✅ Sidebar navigation
- ✅ Responsive design
- ✅ Modal forms for Create/Edit
- ✅ Confirmation dialogs for Delete
- ✅ Success/Error notifications
- ✅ Loading states
- ✅ Data validation

### Landing Page Integration
- ✅ All sections pull from database
- ✅ Real-time updates (after page refresh)
- ✅ Conditional rendering (show only active items)
- ✅ Proper fallbacks if data is empty

---

## 🧪 Testing Checklist

### For Each Resource (Products, Pricings, Features, Members, About):

- [ ] Login as admin
- [ ] Navigate to resource management page
- [ ] **CREATE:** Add new item → Verify it appears on landing page
- [ ] **UPDATE:** Edit item → Verify changes reflect on landing page
- [ ] **DELETE:** Remove item → Verify it's gone from landing page
- [ ] **READ:** View list in admin panel
- [ ] **VALIDATE:** Try submitting empty form → Should show error
- [ ] **AUTH:** Logout and try to edit → Should redirect to login

---

## 🔧 Troubleshooting

### Problem: Changes in admin don't appear on landing page
**Solution:** 
1. Check if you're logged in
2. Refresh the landing page (Ctrl+F5)
3. Check browser console for errors
4. Verify data saved in database (use Adminer at localhost:8080)

### Problem: "401 Unauthorized" when editing
**Solution:**
1. Login again at `/login`
2. Token may have expired
3. Check `localStorage.authToken` exists

### Problem: About section not showing
**Solution:**
1. Ensure `isActive` is checked when creating
2. Set `order` to control display position
3. Check if `aboutSections` is passed to template

---

## 📊 Database Schema Quick Reference

### Pricings Table
```sql
id          uuid PRIMARY KEY
name        varchar(255)
description text
price       decimal(10,2)
period      varchar(50)
features    json
createdAt   timestamp
updatedAt   timestamp
```

### Features Table
```sql
id          uuid PRIMARY KEY
name        varchar(255)
description text
icon        varchar(255)
createdAt   timestamp
updatedAt   timestamp
```

### Organization Members Table
```sql
id          uuid PRIMARY KEY
name        varchar(255)
position    varchar(255)
photoUrl    varchar(500)
createdAt   timestamp
updatedAt   timestamp
```

### About Table
```sql
id          uuid PRIMARY KEY
title       varchar(255)
description text
section     varchar(100)
imageUrl    text
order       integer DEFAULT 0
isActive    boolean DEFAULT true
createdAt   timestamp
updatedAt   timestamp
```

---

## 🎯 Summary

**Admin's Power:**
- Login once → Manage EVERYTHING users see
- No code changes needed
- Real-time content management
- Full CRUD on all sections

**User Experience:**
- Visit landing page
- See dynamic content
- All managed by admin
- Always up-to-date

**Security:**
- Only admins can modify
- Public can only view
- JWT authentication
- Secure API endpoints

---

**Ready to use! 🚀**

Login → Manage → Users See Changes!
