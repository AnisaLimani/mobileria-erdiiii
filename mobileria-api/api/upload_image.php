<?php
// api/upload_image.php - Upload product image

require_once '../config/db.php';
session_start();

if (empty($_SESSION['isOwner'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No image file provided']);
    exit;
}

$file = $_FILES['image'];
$upload_dir = '../uploads/';

// Create upload directory if it doesn't exist
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0755, true);
}

// Validate file
$allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
if (!in_array($file['type'], $allowed_types)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed']);
    exit;
}

if ($file['size'] > 5 * 1024 * 1024) { // 5MB max
    http_response_code(400);
    echo json_encode(['error' => 'File is too large. Maximum size is 5MB']);
    exit;
}

// Generate unique filename
$filename = time() . '_' . preg_replace('/[^a-zA-Z0-9._-]/', '', basename($file['name']));
$filepath = $upload_dir . $filename;

if (move_uploaded_file($file['tmp_name'], $filepath)) {
    echo json_encode([
        'success' => true,
        'filename' => $filename,
        'message' => 'Image uploaded successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to upload image']);
}
?>
