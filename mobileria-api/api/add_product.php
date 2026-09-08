<?php
// api/add_product.php - Add new product

require_once '../config/db.php';
session_start();

if (empty($_SESSION['isOwner'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['name']) || !isset($data['description']) || !isset($data['category'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

$name = $data['name'];
$description = $data['description'];
$category = $data['category'];
$image = isset($data['image']) ? $data['image'] : 'placeholder.jpg';

$stmt = $conn->prepare("INSERT INTO products (name, description, image, category) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $description, $image, $category);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'id' => $conn->insert_id,
        'message' => 'Product added successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to add product']);
}

$stmt->close();
$conn->close();
?>
