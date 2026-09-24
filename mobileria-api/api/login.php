<?php

header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$secure = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';

session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => getenv('APP_COOKIE_DOMAIN') ?: '',
    'secure' => $secure,
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();


// ===============================
// CHECK IF OWNER IS LOGGED IN
// ===============================

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (!empty($_SESSION['isOwner'])) {

        echo json_encode([
            'success' => true
        ]);

    } else {

        http_response_code(401);

        echo json_encode([
            'success' => false,
            'message' => 'Unauthorized'
        ]);
    }

    exit;
}


// ===============================
// LOGIN
// ===============================

$data = json_decode(file_get_contents('php://input'), true);

$password = $data['password'] ?? '';


// Password: mobileria
$ownerPasswordHash = '$2y$10$1YR2d1s4Eq/8kxS7NPq/AOp4o8FTXYkKC8ome6KeSDJEVmBGRFt3.';


if (!$password) {

    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Password is required'
    ]);

    exit;
}


// ===============================
// VERIFY PASSWORD
// ===============================

if (password_verify($password, $ownerPasswordHash)) {

    // Create owner session
    $_SESSION['isOwner'] = true;

    // Make sure session is saved
    session_write_close();

    echo json_encode([
        'success' => true
    ]);

} else {

    http_response_code(401);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid password'
    ]);
}
?>