<?php
  include "model.php";

  $n = $_GET["n"];
  $theDBA = new DatabaseAdaptor();
  $output = array();
  $allScores = $theDBA->getScores();
  $curr;
  $user = $theDBA->getUserName($allScores[0]["ID"])[0];

  for ($i = 0; $i < $n && $i < count($allScores); $i++) {
    $curr = array();
    array_push($curr, $theDBA->getUserName($allScores[0]["ID"])[0]["Username"]);
    array_push($curr, $allScores[$i]["Score"]);
    array_push($output, $curr);
  }

  echo json_encode($output);
?>
