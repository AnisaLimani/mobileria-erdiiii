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

$name = trim($data['name'] ?? '');

if ($name === '') {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'error' => 'Category name is required'
    ]);

    exit();
}

// Kontrollo nëse ekziston
$stmt = $conn->prepare(
    "SELECT id FROM categories WHERE name = ?"
);

$stmt->bind_param("s", $name);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    http_response_code(409);

    echo json_encode([
        'success' => false,
        'error' => 'Kjo kategori ekziston.'
    ]);

    exit();
}

$stmt->close();

// Shto kategorinë
$stmt = $conn->prepare(
    "INSERT INTO categories (name) VALUES (?)"
);

$stmt->bind_param("s", $name);

if ($stmt->execute()) {

    echo json_encode([
        'success' => true,
        'id' => $conn->insert_id,
        'name' => $name,
        'message' => 'Category added successfully'
    ]);

} else {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'error' => 'Kategoria nuk mund të shtohet.'
    ]);
}

$stmt->close();
$conn->close();