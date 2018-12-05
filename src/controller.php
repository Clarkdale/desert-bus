<?php
  include "model.php";

  function loadDatabase($num) {
    $num = htmlspecialchars($num);
    $theDBA = new DatabaseAdaptor();
    $output = array();
    $allScores = $theDBA->getScores($num);
    echo json_encode($allScores);
  }

  function login($user, $pass) {
    $user = htmlspecialchars($user);
    $pass = htmlspecialchars($pass);
    $theDBA = new DatabaseAdaptor();
    $check = $theDBA->loginValid($user, $pass);
    echo $check;
    return $check;
  }

  function insertUser($user, $email, $pass) {
    $user = htmlspecialchars($user);
    $pass = htmlspecialchars($pass);
    $email = htmlspecialchars($email);
    $theDBA = new DatabaseAdaptor();
    $val = $theDBA->createUser($user, $email, $pass);
    echo $val;
    return $val;
  }

  function insertScore($ident, $score) {
    $ident = htmlspecialchars($ident);
    $score = htmlspecialchars($score);
    $theDBA = new DatabaseAdaptor();
    $theDBA->addScore($ident, $score);
  }

  function userInfo($user) {
    $user = htmlspecialchars($user);
    $theDBA = new DatabaseAdaptor();
    return $theDBA->getUserEntry($user);
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
  } else if ($n === 'makeUser') {
    $user = $_GET['user'];
    $email = $_GET['email'];
    $pass = $_GET['pass'];
    $id = insertUser($user, $email, $pass);
    if (!isset($_SESSION['user'])) {
      $_SESSION['user'] = $user;
      $_SESSION['id'] = $id;
    }
  } else if ($n === 'newScore') {
    $user = $_GET['id'];
    $score = $_GET['score'];
    insertScore($user, $score);
    echo "success";
  } else if ($n === 'getUserInfo') {
    $user = $_GET['user'];
    $output = userInfo($user);
    echo json_encode($output);
  }
?>
