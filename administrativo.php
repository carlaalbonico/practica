<?php
  //session_start();
  
  //var_dump($_SESSION['email']);
  //die();
  /*
  if( isset($_SESSION['email'])){
    echo 'Bienvenido '. $_SESSION['email'];
    echo '<br><a href="serv/index.php?sesion=cerrar">Cerrar Sesión</a>';
  }
  else{
    header('Location:login.html');
  }
  */
  if(isset($_COOKIE['email'])) {
    echo 'Bienvenido '. $_COOKIE['email'];
  }
  else{
    header('Location:login.html');
  }
?>

<!doctype html>
<html lang="es">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Acceso correcto!</h1>
    <button type="button" id="btnCerrar">Cerrar Sesión</button>
    <!-- Optional JavaScript; choose one of the two! -->

    <script>
      document.getElementById("btnCerrar").addEventListener("click",click);
      
      function click(){
        document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/practica;";
        window.location.assign("http://localhost/practica/login.html");
      }
    </script>
    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
  </body>
</html>