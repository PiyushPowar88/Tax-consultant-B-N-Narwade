# Image Upload & Management System - Setup Guide

## Overview
This system allows admins to upload images (stored as BLOB in MySQL) and display them on the frontend, particularly for company owner photos.

## Setup Instructions

### 1. Database Setup
**Copy and run this SQL in your MySQL database:**

```sql
CREATE TABLE IF NOT EXISTS images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_type VARCHAR(50) NOT NULL COMMENT 'Type of image: owner, hero, service, team, etc.',
  image_name VARCHAR(255) NOT NULL COMMENT 'Original filename of the image',
  image_data LONGBLOB NOT NULL COMMENT 'Image file stored as binary data',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_image_type (image_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Backend - Already Updated ✓
- ✅ Created `imageRoutes.js` with upload and retrieval endpoints
- ✅ Updated `server.js` to include image routes
- ✅ Installed `multer` package for file handling
- ✅ All endpoints are protected with admin authentication

### 3. Frontend - Already Updated ✓
- ✅ Updated `Dashboard.jsx` with image upload interface
- ✅ Added image management tab in admin panel
- ✅ Updated `Home.jsx` to fetch and display owner image from database

### 4. Run the Application

**Backend:**
```bash
cd Backend
npm install  # If you haven't already
npm start    # or npm run dev
```

**Frontend:**
```bash
cd Frontend
npm install  # If you haven't already
npm run dev
```

## Features

### Admin Dashboard - Images Tab

**Upload Images:**
1. Go to Admin Dashboard → Images tab
2. Select image type (Owner, Hero, Service, Team, Other)
3. Choose an image file (JPEG, PNG, GIF, WebP - Max 10MB)
4. Preview appears automatically
5. Click "Upload Image"

**Manage Images:**
- View all uploaded images in a table
- See image type, filename, upload date
- View image preview by clicking "View" link
- Delete images with one click

### API Endpoints

**Upload Image (POST)** - Protected (Admin Only)
```
POST /api/images/upload
Headers: Authorization: <token>
Body: FormData with:
  - image: File
  - image_type: String (owner, hero, service, team, other)
  - image_name: String (optional)

Response: { message: "Image uploaded successfully", id: <imageId> }
```

**Get Image by ID (GET)** - Public
```
GET /api/images/:id
Returns: Image binary data with appropriate Content-Type
```

**Get Image by Type (GET)** - Public
```
GET /api/images/type/:image_type
Returns: Latest image metadata for that type
{ id, image_type, image_name }
```

**Get All Images (GET)** - Protected (Admin Only)
```
GET /api/images/admin/all
Headers: Authorization: <token>
Returns: Array of all images with metadata
```

**Delete Image (DELETE)** - Protected (Admin Only)
```
DELETE /api/images/:id
Headers: Authorization: <token>
Response: { message: "Image deleted successfully" }
```

## Frontend Integration

### Home Page - Company Owner Section
The Home page now automatically fetches and displays the latest owner image:
```javascript
// Fetches image with type 'owner' from database
// Falls back to placeholder if no image found
<img src={`http://localhost:5000/api/images/${ownerImageId}`} alt="Company Owner" />
```

### Admin Dashboard - Image Management
Tabbed interface with:
- Services tab (existing functionality)
- Images tab (new functionality)

## Troubleshooting

**Issue: "Failed to upload image" error**
- Ensure the file is a valid image format (JPEG, PNG, GIF, WebP)
- Check file size (max 10MB)
- Verify you're logged in as admin

**Issue: Owner image not showing on home page**
- Upload an image with type "owner" in admin dashboard
- Refresh the home page
- Check browser console for network errors

**Issue: Database error**
- Run the SQL table creation query
- Check your MySQL connection in `.env`
- Verify database user has necessary permissions

## File Structure

```
Backend/
├── routes/
│   ├── imageRoutes.js (NEW)
│   ├── adminRoutes.js
│   ├── adminServiceRoutes.js
│   ├── serviceRoutes.js
│   └── inquiryRoutes.js
├── database/
│   └── images_table.sql (SQL for creating table)
└── server.js (Updated)

Frontend/
├── src/
│   ├── admin/
│   │   └── Dashboard.jsx (Updated with image management)
│   └── pages/
│       ├── Home.jsx (Updated to load owner image)
│       └── Services.jsx
└── package.json
```

## Notes

- Images are stored as BLOB (Binary Large Object) in MySQL
- Maximum file size is 10MB per image
- Supported formats: JPEG, PNG, GIF, WebP
- Each image type can have multiple versions; latest is fetched
- All upload/delete operations require admin authentication
- Image retrieval is public (anyone can view)

## Next Steps

1. Create the images table using the SQL script
2. Start backend server
3. Start frontend server
4. Login to admin dashboard
5. Go to Images tab and upload company owner image
6. Home page will automatically display it

---

For questions or issues, check the console logs for detailed error messages.
