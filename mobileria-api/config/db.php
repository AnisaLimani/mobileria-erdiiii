<?php
// config/db.php - Database Connection

function appBaseUrl() {
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || ((int) ($_SERVER['SERVER_PORT'] ?? 80) === 443) ? 'https' : 'http';
    $host = getenv('APP_DOMAIN') ?: ($_SERVER['HTTP_HOST'] ?? 'localhost');
    return rtrim($protocol . '://' . $host, '/');
}

$allowedOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = array_values(array_filter([
    $allowedOrigin,
    getenv('APP_FRONTEND_ORIGIN') ?: '',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002',
    appBaseUrl()
], static fn($origin) => $origin !== ''));

if ($allowedOrigin !== '' && in_array($allowedOrigin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: {$allowedOrigin}");
} else {
    header('Access-Control-Allow-Origin: http://localhost:3000');
}
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = getenv('DB_HOST') ?: 'localhost';
$db = getenv('DB_NAME') ?: 'mobileria_db';
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: '';

try {
    $conn = new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) {
        die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
    }

    $conn->set_charset('utf8');
} catch (Exception $e) {
    die(json_encode(['error' => $e->getMessage()]));
}
?>
