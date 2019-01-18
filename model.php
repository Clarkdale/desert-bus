<?php
class DatabaseAdaptor {
  private $DB;

  public function __construct() {
    $dataBase = 'mysql:dbname=scores; charset=utf8; host=127.0.0.1';
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
    $stmt = $this->DB->prepare("SELECT * FROM highScores ORDER BY highScores.Score DESC");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function addScore($user, $score) {
    $stmt = $this->DB->prepare("INSERT INTO highScores VALUES(:user, :score)");
    $stmt->bindParam(':user', $user, PDO::PARAM_INT);
    $stmt->bindParam(':score', $score, PDO::PARAM_INT);
    $stmt->execute();
  }
}
?>
