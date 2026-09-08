<?php
// api/get_products.php - Get all products or by category

require_once '../config/db.php';

$category = isset($_GET['category']) ? $_GET['category'] : '';

if ($category) {
    $stmt = $conn->prepare("SELECT id, name, description, image, category FROM products WHERE category = ? ORDER BY created_at DESC");
    $stmt->bind_param("s", $category);
} else {
    $stmt = $conn->prepare("SELECT id, name, description, image, category FROM products ORDER BY created_at DESC");
}

$stmt->execute();
$result = $stmt->get_result();
$products = [];

while ($row = $result->fetch_assoc()) {
    if (!empty($row['image'])) {
        if (!preg_match('/^https?:\/\//i', $row['image'])) {
            $row['image'] = 'http://localhost/mobileria-api/uploads/' . $row['image'];
        }
    } else {
        $row['image'] = '';
    }
    $products[] = $row;
}

echo json_encode($products);
$stmt->close();
$conn->close();
?>
