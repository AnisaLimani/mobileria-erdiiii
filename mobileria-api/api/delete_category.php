<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/../config/db.php';

session_start();

if (empty($_SESSION['isOwner'])) {
    http_response_code(401);

    echo json_encode([
        'success' => false,
        'error' => 'Unauthorized'
    ]);

    exit();
}

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$id = intval($data['id'] ?? 0);

if ($id <= 0) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'error' => 'Invalid category ID'
    ]);

    exit();
}

// Merr kategorinë
$stmt = $conn->prepare(
    "SELECT name FROM categories WHERE id = ?"
);

$stmt->bind_param("i", $id);
$stmt->execute();

$result = $stmt->get_result();
$category = $result->fetch_assoc();

$stmt->close();

if (!$category) {
    http_response_code(404);

    echo json_encode([
        'success' => false,
        'error' => 'Category not found'
    ]);

    exit();
}

$categoryName = $category['name'];

// Kontrollo a ka produkte në këtë kategori
$stmt = $conn->prepare(
    "SELECT COUNT(*) AS total FROM products WHERE category = ?"
);

$stmt->bind_param("s", $categoryName);
$stmt->execute();

$result = $stmt->get_result();
$row = $result->fetch_assoc();

$stmt->close();

if ((int)$row['total'] > 0) {

    http_response_code(409);

    echo json_encode([
        'success' => false,
        'error' => 'Kjo kategori nuk mund të fshihet sepse ka produkte të lidhura me të.'
    ]);

    exit();
}

// Fshi vetëm kategorinë
$stmt = $conn->prepare(
    "DELETE FROM categories WHERE id = ?"
);

$stmt->bind_param("i", $id);

if ($stmt->execute()) {

    echo json_encode([
        'success' => true,
        'message' => 'Category deleted successfully',
        'category' => $categoryName
    ]);

} else {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'error' => 'Failed to delete category'
    ]);
}

$stmt->close();
$conn->close();