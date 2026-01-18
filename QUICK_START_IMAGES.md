# Quick Start - Image Upload System

## What Was Done ✅

### Backend Changes
1. **Created imageRoutes.js** - Complete image management API
   - Upload images with multer
   - Store as BLOB in MySQL
   - Retrieve images by ID or type
   - Admin authentication protection

2. **Updated server.js** - Added image routes to Express app

3. **Updated package.json** - Added multer dependency

4. **Created database folder with SQL** - Table creation script

### Frontend Changes
1. **Enhanced Dashboard.jsx** - Admin image management
   - New "Images" tab in dashboard
   - Upload interface with preview
   - Image gallery with delete functionality
   - Type selector (Owner, Hero, Service, Team, Other)

2. **Updated Home.jsx** - Fetch owner image from database
   - Loads latest "owner" type image automatically
   - Falls back to placeholder if none exist
   - Dynamic image display

3. **Services.jsx** - Already updated with professional cards

## Step-by-Step to Get It Running

### 1️⃣ Create Database Table
Open MySQL and run this SQL:
```sql
CREATE TABLE IF NOT EXISTS images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_type VARCHAR(50) NOT NULL,
  image_name VARCHAR(255) NOT NULL,
  image_data LONGBLOB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_image_type (image_type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

Or use the file: `Backend/database/images_table.sql`

### 2️⃣ Start Backend
```bash
cd Backend
npm install  # (if needed)
npm start    # or: npm run dev
```
Server will run on http://localhost:5000

### 3️⃣ Start Frontend
```bash
cd Frontend
npm install  # (if needed)
npm run dev
```
Frontend will run on http://localhost:5173 (or similar)

### 4️⃣ Upload Company Owner Image
1. Navigate to Admin Login page
2. Login with your admin credentials
3. Go to Dashboard → Images tab
4. Select "Company Owner" as image type
5. Choose your owner photo
6. Click "Upload Image"

### 5️⃣ View on Home Page
- Navigate to Home page
- Scroll to "About Owner Section"
- Your uploaded image will display automatically!

## API Endpoints Summary

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | /api/images/upload | ✓ Admin | Upload image |
| GET | /api/images/:id | ✗ Public | Get image by ID |
| GET | /api/images/type/:type | ✗ Public | Get latest image by type |
| GET | /api/images/admin/all | ✓ Admin | List all images |
| DELETE | /api/images/:id | ✓ Admin | Delete image |

## Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- Maximum size: 10MB

## File Locations

**New Files Created:**
- `Backend/routes/imageRoutes.js` - Image API routes
- `Backend/database/images_table.sql` - Database schema
- `SETUP_IMAGE_SYSTEM.md` - Detailed documentation

**Updated Files:**
- `Backend/server.js` - Added image routes
- `Backend/package.json` - Added multer dependency
- `Frontend/src/admin/Dashboard.jsx` - Image management UI
- `Frontend/src/pages/Home.jsx` - Display owner image
- `Frontend/src/pages/Services.jsx` - Already professional

## Features

✨ **Image Upload**
- Drag & drop or file picker
- Live preview before upload
- File validation (format + size)

📊 **Image Management**
- View all uploaded images
- See image metadata (type, name, date)
- Delete images easily

🎯 **Dynamic Display**
- Home page auto-loads owner image
- Fallback to placeholder if unavailable
- Professional presentation

🔒 **Security**
- Admin authentication required for upload/delete
- File type validation
- Size limits

## Troubleshooting

**Problem: Image not showing on home page**
- Check if image table exists (run SQL)
- Upload an image with type "owner"
- Check browser console for errors
- Check network tab for 404 errors

**Problem: Upload fails**
- Check file format (JPEG, PNG, GIF, WebP)
- Check file size (< 10MB)
- Check if logged in as admin
- Check backend server is running

**Problem: Database connection error**
- Verify MySQL is running
- Check .env file credentials
- Check database name is correct
- Ensure images table exists

## Next Steps

1. Create the images table (SQL above)
2. Upload a company owner image via admin dashboard
3. Visit home page to see it displayed
4. Upload more images for different image types
5. Customize Services page with service images if needed

---

**All systems are now integrated and ready to use!** 🚀

Need help? Check the detailed setup guide in `SETUP_IMAGE_SYSTEM.md`
