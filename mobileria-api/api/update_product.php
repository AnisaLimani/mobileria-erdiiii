<?php
// api/update_product.php - Update product

require_once '../config/db.php';session_start();

if (empty($_SESSION['isOwner'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Product ID is required']);
    exit;
}

$id = $data['id'];
$name = $data['name'] ?? null;
$description = $data['description'] ?? null;
$image = $data['image'] ?? null;
$category = $data['category'] ?? null;

$updates = [];
$params = [];
$types = '';

if ($name !== null) {
    $updates[] = "name = ?";
    $params[] = $name;
    $types .= 's';
}
if ($description !== null) {
    $updates[] = "description = ?";
    $params[] = $description;
    $types .= 's';
}
if ($image !== null) {
    $updates[] = "image = ?";
    $params[] = $image;
    $types .= 's';
}
if ($category !== null) {
    $updates[] = "category = ?";
    $params[] = $category;
    $types .= 's';
}

if (empty($updates)) {
    http_response_code(400);
    echo json_encode(['error' => 'No fields to update']);
    exit;
}

$params[] = $id;
$types .= 'i';

$query = "UPDATE products SET " . implode(", ", $updates) . " WHERE id = ?";
$stmt = $conn->prepare($query);

if ($stmt === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error']);
    exit;
}

$stmt->bind_param($types, ...$params);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Product updated successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to update product']);
}

$stmt->close();
$conn->close();
?>
