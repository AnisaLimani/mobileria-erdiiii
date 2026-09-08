<?php

header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$secure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => 'localhost',
    'secure' => $secure,
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();


// ===============================
// CHECK OWNER LOGIN
// ===============================

if (empty($_SESSION['isOwner'])) {

    http_response_code(401);

    echo json_encode([
        'success' => false,
        'error' => 'Unauthorized'
    ]);

    exit;
}


// ===============================
// ADD PROJECT
// ===============================

try {

    $data = json_decode(
        file_get_contents('php://input'),
        true
    );


    $title = $data['title'] ?? '';
    $description = $data['description'] ?? '';
    $image = $data['image'] ?? '';
    $tags = json_encode(
        $data['tags'] ?? [],
        JSON_UNESCAPED_UNICODE
    );


    // Check title
    if (empty($title)) {

        http_response_code(400);

        echo json_encode([
            'success' => false,
            'error' => 'Project title is required'
        ]);

        exit;
    }


    // Insert project
    $stmt = $pdo->prepare("
        INSERT INTO projects
        (title, description, image, tags)
        VALUES (?, ?, ?, ?)
    ");


    $stmt->execute([
        $title,
        $description,
        $image,
        $tags
    ]);


    $id = $pdo->lastInsertId();


    echo json_encode([
        'success' => true,
        'id' => $id,
        'message' => 'Project added successfully'
    ]);


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

?>