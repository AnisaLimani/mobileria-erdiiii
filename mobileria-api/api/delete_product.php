<?php
// api/delete_product.php - Delete product

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

$stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Product deleted successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete product']);
}

$stmt->close();
$conn->close();
?>
