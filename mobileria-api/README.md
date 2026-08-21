Setup for mobileria-api (place under your webserver root, e.g., XAMPP `htdocs`)

1. DB
- Create a MySQL database, e.g. `mobileria`.
- Import SQL:

  mysql -u root -p mobileria < db/create_projects.sql

2. Place files
- Copy the `mobileria-api` folder into your webserver folder. The API root should be accessible at:

  http://localhost/mobileria-api/api/

3. Update DB credentials
- Edit `api/db.php` and set `$host`, `$db`, `$user`, `$pass` to match your environment.

4. Ensure `uploads/` is writable by webserver user.

5. Endpoints
- GET  /api/get_projects.php
- POST /api/add_project.php          (JSON body: title, description, image, tags)
- PUT  /api/update_project.php       (JSON body: id, ...)
- POST /api/delete_project.php       (JSON body: id)
- POST /api/upload_image.php         (multipart/form-data file field `image`)

Notes
- CORS is configured to allow `http://localhost:3000` and credentials. If your frontend runs on a different port, update `db.php` headers.
