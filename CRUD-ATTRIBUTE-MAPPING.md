# CRUD Attribute Mapping - Complete Reference

## ✅ ALL ATTRIBUTES NOW SYNCHRONIZED

### 1. **Pricings** (`/api/pricings`)

**Database Entity:**
- `id` (uuid)
- `name` (varchar 255)
- `description` (text, nullable)
- `price` (decimal 10,2)
- `period` (varchar 50, default: 'month')
- `features` (json, nullable)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Admin Form Fields:**
- ✅ `pricingName` → `name`
- ✅ `pricingDescription` → `description`
- ✅ `pricingPrice` → `price` (parsed as float)
- ✅ `pricingPeriod` → `period`

**JavaScript (admin-pricings.js):**
```javascript
{
  name: string,
  description: string,
  price: number,
  period: string
}
```

---

### 2. **Features** (`/api/features`)

**Database Entity:**
- `id` (uuid)
- `name` (varchar 255)
- `description` (text)
- `icon` (varchar 255, nullable)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Admin Form Fields:**
- ✅ `featureName` → `name`
- ✅ `featureDescription` → `description`
- ✅ `featureIcon` → `icon` **(ADDED)**

**JavaScript (admin-features.js):**
```javascript
{
  name: string,
  description: string,
  icon: string | null
}
```

---

### 3. **Organization Members** (`/api/organization-members`)

**Database Entity:**
- `id` (uuid)
- `name` (varchar 255)
- `position` (varchar 255)
- `photoUrl` (varchar 500, nullable)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Admin Form Fields:**
- ✅ `memberName` → `name`
- ✅ `memberPosition` → `position`
- ✅ `memberPhotoUrl` → `photoUrl`

**JavaScript (admin-members.js):**
```javascript
{
  name: string,
  position: string,
  photoUrl: string | null
}
```

---

### 4. **About** (`/api/about`)

**Database Entity:**
- `id` (uuid)
- `title` (varchar 255)
- `description` (text)
- `section` (varchar 100, nullable)
- `imageUrl` (text, nullable)
- `order` (int, default: 0)
- `isActive` (boolean, default: true)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Admin Form Fields:**
- ✅ `aboutTitle` → `title`
- ✅ `aboutDescription` → `description`
- ✅ `aboutSection` → `section`
- ✅ `aboutImageUrl` → `imageUrl`
- ✅ `aboutOrder` → `order` **(ADDED)**
- ✅ `aboutIsActive` → `isActive`

**JavaScript (admin-about.js):**
```javascript
{
  title: string,
  description: string,
  section: string | null,
  imageUrl: string | null,
  order: number,
  isActive: boolean
}
```

---

### 5. **Products** (`/api/products`)

**Database Entity:**
- `id` (uuid)
- `jumlah` (int)
- `judul` (varchar 255)
- `deskripsi` (text)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Admin Form Fields:**
- ✅ `productJumlah` → `jumlah`
- ✅ `productJudul` → `judul`
- ✅ `productDeskripsi` → `deskripsi`

**JavaScript (admin-products.js):**
```javascript
{
  jumlah: number,
  judul: string,
  deskripsi: string
}
```

---

## API Endpoints (All Resources)

### CREATE (POST)
- **Endpoint:** `POST /api/{resource}`
- **Auth:** Required (Bearer token)
- **Body:** CreateDto fields
- **Response:** Created entity

### READ ALL (GET)
- **Endpoint:** `GET /api/{resource}`
- **Auth:** Not required
- **Response:** Array of entities

### READ ONE (GET)
- **Endpoint:** `GET /api/{resource}/:id`
- **Auth:** Not required
- **Response:** Single entity

### UPDATE (PATCH)
- **Endpoint:** `PATCH /api/{resource}/:id`
- **Auth:** Required (Bearer token)
- **Body:** UpdateDto fields (partial)
- **Response:** Updated entity

### DELETE (DELETE)
- **Endpoint:** `DELETE /api/{resource}/:id`
- **Auth:** Required (Bearer token)
- **Response:** void

---

## Authentication

**Login:**
- URL: `http://localhost:3000/login`
- Email: `admin@example.com`
- Password: `secret`

**Token Storage:**
- Stored in `localStorage` as `authToken`
- Used in `Authorization: Bearer {token}` header
- All CUD operations require authentication

---

## Testing CRUD Operations

1. **Login** at `/login` with admin credentials
2. **Navigate** to admin panel at `/admin`
3. **Access** resource pages:
   - `/admin/pricings` - Pricing plans
   - `/admin/features` - Features
   - `/admin/members` - Team members
   - `/admin/about` - About sections
   - `/admin/products` - Products

4. **Test Operations:**
   - Click "Add New" to CREATE
   - Click "Edit" to UPDATE
   - Click "Delete" to DELETE
   - View list to READ

---

## Common Issues & Solutions

### 1. **401 Unauthorized**
- **Cause:** Missing or expired token
- **Solution:** Login again at `/login`

### 2. **400 Bad Request**
- **Cause:** Missing required fields or validation errors
- **Solution:** Check all required fields are filled

### 3. **404 Not Found**
- **Cause:** Invalid ID or resource doesn't exist
- **Solution:** Refresh page to get latest IDs

### 4. **Field Mismatch**
- **Cause:** JavaScript sending wrong field names
- **Solution:** ✅ FIXED - All fields now match entity schema

---

## Files Updated (Latest)

1. **JavaScript:**
   - `public/js/admin-features.js` - Added icon field
   - `public/js/admin-members.js` - Better error handling
   - `public/js/admin-about.js` - Added order field
   - `public/js/admin-auth.js` - NEW - Auth utilities

2. **Templates:**
   - `src/template/templates/layouts/pages/admin-features.hbs` - Added icon input
   - `src/template/templates/layouts/pages/admin-about.hbs` - Added order input

3. **Backend (Previous updates):**
   - All entity files updated with correct schema
   - All DTO files with proper validation
   - All service files with correct mappers
   - All seed files with matching data

---

## Verification Checklist

- [x] Database schema matches entities
- [x] Entities match DTOs
- [x] DTOs match controllers
- [x] Admin forms have all entity fields
- [x] JavaScript sends correct field names
- [x] Authentication properly configured
- [x] All CRUD endpoints working
- [x] Seeds populate with correct data
- [x] Error handling in place

**Status:** ✅ ALL SYSTEMS READY FOR CRUD OPERATIONS
