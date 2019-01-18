function login() {
    var ajax = new XMLHttpRequest();
    var user = document.getElementById("username").value;
    var url = "controller.php?n=login&user=" + user;
    ajax.open("GET", url, true);
    ajax.send();
    window.location.href = "leaderboard.html";
  }

  function begin() {
    window.location.href = "canvas.html";
  }

  function retrieveInfo() {
    var ajax = new XMLHttpRequest();
    var elem = document.getElementById("scores");
    var rec;
    ajax.open("GET", "controller.php?n=leaderboard", true);
    ajax.send();
    ajax.onreadystatechange = function() {
      if (ajax.readyState == 4 && ajax.status == 200) {
        document.getElementById("scores").innerHTML = "";
        rec = JSON.parse(ajax.responseText);
        for (let i = 0; i < 20 && i < rec.length; i++) {
          document.getElementById("scores").innerHTML += rec[i]['User'] + ": " + rec[i]['Score'];
          document.getElementById("scores").innerHTML += "<br>";
        }
      }
    }
  }

  function home() {
    window.location.href = "index.html";
  }