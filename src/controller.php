<?php
  include "model.php";
  session_start();

  function loadDatabase() {
    $theDBA = new DatabaseAdaptor();
    $allScores = $theDBA->getScores();
    echo json_encode($allScores);
  }

  function insertScore($ident, $score) {
    $ident = htmlspecialchars($ident);
    $score = htmlspecialchars($score);
    $theDBA = new DatabaseAdaptor();
    $theDBA->addScore($ident, $score);
  }

  $n = $_GET["n"];
  if ($n === "leaderboard") {
    loadDatabase();
  } else if ($n === "login") {
    $_SESSION['user'] = $_GET["user"];
  } else if ($n === 'getUser') {
    if (isset($_SESSION['user'])) {
      echo $_SESSION['user'];
    } else {
      echo "UNKNOWN";
    }
  }  else if ($n === 'newScore') {
    $score = $_GET['score'];
    insertScore($_SESSION['user'], $score);
  } 
?>
