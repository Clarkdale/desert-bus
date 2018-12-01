<?php
  include "model.php";

  function loadDatabase($num) {
    $theDBA = new DatabaseAdaptor();
    $output = array();
    $allScores = $theDBA->getScores();
    $curr;
    $user = $theDBA->getUserName($allScores[0]["ID"])[0];

    for ($i = 0; $i < $num && $i < count($allScores); $i++) {
      $curr = array();
      array_push($curr, $theDBA->getUserName($allScores[0]["ID"])[0]["Username"]);
      array_push($curr, $allScores[$i]["Score"]);
      array_push($output, $curr);
    }
    echo json_encode($output);
  }

  function login($user, $pass) {
    $theDBA = new DatabaseAdaptor();
    $check = $theDBA->loginValid($user, $pass);
    echo json_encode($check);
    return $check;
  }

  $n = $_GET["n"];
  session_start();
  if ($n === "leaderboard") {
    $count = $_GET["count"];
    loadDatabase($count);
  } else if ($n === "login") {
    $user = $_GET["user"];
    $pass = $_GET["pass"];
    $result = login($user, $pass);
    if (!isset($_SESSION['user']) && count($result) == 1) {
      $_SESSION['user'] = $result[0]['Username'];
      $_SESSION['id'] = $result[0]['ID'];
    } 
  } else if ($n === 'getUser') {
    if (isset($_SESSION['user'])) {
      $output = array();
      array_push($output, $_SESSION['user']);
      array_push($output, $_SESSION['id']);
      echo json_encode($output);
    } else {
      echo "UNKNOWN";
    }
  }
?>
