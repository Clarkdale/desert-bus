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

  public function getScores($num) {
    $stmt = $this->DB->prepare("SELECT scores.ID, scores.score FROM scores INNER
      JOIN scores ON scores.ID=logins.ID ORDER BY score DESC
      LIMIT :num");
    $stmt->bindParam(':num', $num);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function addScore($user, $score) {
    $stmt = $this->DB->prepare("INSERT INTO scores (Username, Score) VALUES(:user, :score)");
    $stmt->bindParam(':user', $user);
    $stmt->bindParam(':score', $score);
    $stmt->execute();
  }

  public function getUserName($username) {
    $stmt = $this->DB->prepare("SELECT * FROM logins WHERE ID = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function getUserEntry($user) {
    $stmt = $this->DB->prepare("SELECT * FROM logins WHERE Username = :user");
    $stmt->bindParam(':user', $user);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function loginValid($username, $password) {
    $stmt = $this->DB->prepare("SELECT Password FROM logins WHERE Username = :username");
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    return password_verify($password, $stmt->fetchAll(PDO::FETCH_ASSOC)[0]['Password']);
  }

  public function createUser($username, $email, $password) {
    $hashed = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $this->DB->prepare("SELECT Username FROM logins WHERE Username = :user");
    $stmt->bindParam(':user', $username);
    $stmt->execute();
    if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) == 1) {
      return 'Username taken';
    }
    $stmt = $this->DB->prepare("SELECT Email FROM logins WHERE Email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    if (count($stmt->fetchAll(PDO::FETCH_ASSOC)) == 1) {
      return 'Email already in use';
    }
    $all = $this->DB->prepare("SELECT * FROM logins");
    $all->execute();
    $array = $all->fetchAll(PDO::FETCH_ASSOC);
    $index = count($array) + 1;
    $stmt = $this->DB->prepare("INSERT INTO logins (ID, Username, Email,
      Password) VALUES (:index, :username, :email, :password)"
    );
    $stmt->bindParam(':index', $index);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $hashed);

    $stmt->execute();
    return $index;
  }
}
?>
