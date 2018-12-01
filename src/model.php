<?php
class DatabaseAdaptor {
  private $DB;

  public function __construct() {
    $dataBase = 'mysql:dbname=desert_bus; charset=utf8; host=127.0.0.1';
    $user = 'root';
    $password = '';
    try {
      $this->DB = new PDO ( $dataBase, $user, $password );
      $this->DB->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
    } catch ( PDOException $e ) {
      echo ('Error establishing Connection');
      exit ();
    }
  }

  public function getScores() {
    $stmt = $this->DB->prepare("SELECT * FROM scores");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getUserName($in) {
    $stmt = $this->DB->prepare("SELECT * FROM logins WHERE ID =" . $in);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function loginValid($username, $password) {
    $stmt = $this->DB->prepare("SELECT * FROM logins WHERE Email ='" . $username . "' AND Password='" . $password . "'");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
}
?>
