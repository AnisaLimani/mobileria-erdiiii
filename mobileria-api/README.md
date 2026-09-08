# Mobileria Backend API

API për menaxhimin e produkteve të biznesit "Mobileria ERDI".

## Setup Instructions

### 1. Import Database SQL File

1. Hap **PHPMyAdmin** në http://localhost/phpmyadmin
2. Krijo database të ri ose përzgjedh ekzistuesin (mobileria_db)
3. Klik "Import" tab
4. Upload file: `database.sql`
5. Klik "Go"

### 2. Folder Structure

```
C:\xampp\htdocs\mobileria-api\
├── api/
│   ├── add_product.php
│   ├── delete_product.php
│   ├── get_products.php
│   ├── update_product.php
│   └── upload_image.php
├── config/
│   └── db.php
├── uploads/
│   └── (të ngarkuara fotot këtu)
├── .htaccess
└── database.sql
```

### 3. Test API

Test endpoints me Postman ose browser:

- **GET** http://localhost/mobileria-api/api/get_products.php
- **GET** http://localhost/mobileria-api/api/get_products.php?category=Kuzhina

### 4. React Frontend Integration

Frontend-i në React gjendet në `c:\Users\DIGITRON\Desktop\mobileria-erdiiii`

Endpoints përdoren në:
- `src/pages/Admin.jsx` - Admin Panel
- `src/pages/Kuzhina.jsx`, `Tavolina.jsx`, `Komoda.jsx`, `Divane.jsx` - Product Pages

### 5. Admin Panel Access

URL: http://localhost:3000/admin

Funksionalitetet:
- ✅ Shto produkt të ri
- ✅ Ndrysho produktin ekzistues
- ✅ Fshij produktin
- ✅ Ngarko foto

## Database Schema

**products table:**
- `id` (INT, Primary Key, Auto Increment)
- `name` (VARCHAR 255)
- `description` (TEXT)
- `image` (VARCHAR 255)
- `category` (VARCHAR 100)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## API Endpoints

### Get Products
```
GET /api/get_products.php
GET /api/get_products.php?category=Kuzhina
```

### Add Product
```
POST /api/add_product.php
{
  "name": "Produkt emri",
  "description": "Përshkrimi",
  "category": "Kategoria",
  "image": "filename.jpg"
}
```

### Update Product
```
PUT /api/update_product.php
{
  "id": 1,
  "name": "Emri i ri",
  "description": "Përshkrimi i ri",
  "category": "Kategoria e re",
  "image": "filename_ri.jpg"
}
```

### Delete Product
```
POST /api/delete_product.php
{
  "id": 1
}
```

### Upload Image
```
POST /api/upload_image.php
Form-Data:
  - image: <file>

Response:
{
  "success": true,
  "filename": "1692123456_produkti.jpg"
}
```

## Notes

- Fotot ngarkuhen në folder `uploads/`
- Maksimum madhësia e fotos: 5MB
- Llojet e lejuara: JPEG, PNG, GIF, WEBP
