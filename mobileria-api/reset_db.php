<?php
// reset_db.php - Reset database with fresh data

$host = 'localhost';
$user = 'root';
$pass = '';

try {
    // Connect without database first
    $conn = new mysqli($host, $user, $pass);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    // Drop and recreate database
    $conn->query("DROP DATABASE IF EXISTS mobileria_db");
    $conn->query("CREATE DATABASE mobileria_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $conn->query("USE mobileria_db");
    
    // Create products table
    $sql = "CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    $conn->query($sql);
    
    // Insert sample data
    $products = array(
        array('Kuzhinë Klasike', 'Mobilje funksionale dhe elegante për gatimin tuaj', 'kuzhina1.jpg', 'Kuzhina'),
        array('Kuzhinë Moderna Premium', 'Dizajn modern me materiale cilësore', 'kuzhina2.jpg', 'Kuzhina'),
        array('Kuzhinë Minimaliste', 'Linja të pastra dhe funksionale', 'kuzhina3.jpg', 'Kuzhina'),
        array('Tavolinë Darku Walnut', 'Tavolinë elegante për darka familjare', 'tavolina1.jpg', 'Tavolina'),
        array('Tavolinë Kafeje Modern', 'Dizajn minimalist për ambientet moderne', 'tavolina2.jpg', 'Tavolina'),
        array('Komodë 6 Sirtarëshe', 'Magazinim i gjerë për çdo ambient', 'komoda1.jpg', 'Komoda'),
        array('Komodë TV Minimaliste', 'Komodë moderne për televizor', 'komoda2.jpg', 'Komoda'),
        array('Divan 3-Vendësh Premium', 'Komoditet i përkryer për familjen', 'divani1.jpg', 'Divane'),
        array('Divan Këndi L-Formë', 'Divan këndi për hapësira të mëdha', 'divani2.jpg', 'Divane'),
        array('Fotelje Relaksi', 'Relaks total në çdo moment', 'divani3.jpg', 'Divane')
    );
    
    foreach ($products as $product) {
        $stmt = $conn->prepare("INSERT INTO products (name, description, image, category) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $product[0], $product[1], $product[2], $product[3]);
        $stmt->execute();
        $stmt->close();
    }
    
    // Verify
    $result = $conn->query("SELECT COUNT(*) as count FROM products");
    $row = $result->fetch_assoc();
    
    echo "<h1 style='color:green'>✅ Database Reset Successfully!</h1>";
    echo "<p><strong>Total Products:</strong> " . $row['count'] . "</p>";
    echo "<p><strong>Categories:</strong></p>";
    echo "<ul>";
    
    $cats = $conn->query("SELECT DISTINCT category, COUNT(*) as count FROM products GROUP BY category");
    while ($cat = $cats->fetch_assoc()) {
        echo "<li>" . $cat['category'] . " (" . $cat['count'] . " produkte)</li>";
    }
    echo "</ul>";
    echo "<p><a href='http://localhost:3001/admin' style='padding:10px;background:#ff8c42;color:white;text-decoration:none;border-radius:5px;'>👉 Shko në Admin Panel</a></p>";
    
    $conn->close();
    
} catch (Exception $e) {
    echo "<h1 style='color:red'>❌ Error: " . $e->getMessage() . "</h1>";
}
?>
