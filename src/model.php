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

  public function addScore($user, $score) {
    $stmt = $this->DB->prepare("INSERT INTO scores VALUES
    ('" . $user . "', '" . $score . "')");
    $stmt->execute();
  }

  public function getUserName($in) {
    $stmt = $this->DB->prepare("SELECT * FROM logins WHERE ID =" . $in);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getUserEntry($user) {
    $stmt = $this->DB->prepare("SELECT * FROM logins WHERE Username ='" . $user . "'");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function loginValid($username, $password) {
    $stmt = $this->DB->prepare("SELECT * FROM logins WHERE Email ='" . $username . "' AND Password='" . $password . "'");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function createUser($username, $email, $password) {
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $all = $this->DB->prepare("SELECT * FROM logins");
    $all->execute();
    $array = $all->fetchAll(PDO::FETCH_ASSOC);
    $index = count($array) + 1;
    $array = array();
    array_push($array, $index);
    array_push($array, $username);
    array_push($array, $email);
    array_push($array, $password);
    $stmt = $this->DB->prepare("INSERT INTO logins
      VALUES (" . $index . ", '" . $username . "', '" . $email . "', '" . $hashed . "')"
    );
    $stmt->execute();
    return $index;
  }
}
?>
