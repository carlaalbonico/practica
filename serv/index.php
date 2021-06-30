<?php
	 
    function conectar(){
    $conexion= mysqli_connect("remotemysql.com","2PCWh7y5Lf","09enEZGbMN","2PCWh7y5Lf");
        if (!$conexion) {
    	echo "Error al conectar base";
        }
				
    return $conexion;
    }

    
    if(isset($_POST['email']) && isset($_POST['pass'])){
        $email = $_POST['email'];
        $password = $_POST['pass'];
        $emailGuardado = "";
        $passwordGuardada = "";
        $resultado;
                     
        $db = conectar();
        $consultar = "SELECT email, contrasena FROM Usuario WHERE email = '$email'";

        $resultado = mysqli_query($db, $consultar);

        if (mysqli_num_rows($resultado) != 0){
            while ($obj = mysqli_fetch_object($resultado)) {
              $emailGuardado = $obj->email;
              $passwordGuardada = $obj->contrasena;
            }
            mysqli_free_result($resultado);

            if (password_verify($password, $passwordGuardada)) {
                echo "Acceso correcto";
            } 
            else {
                echo "Contraseña incorrecta";
            } 
        }
        else{
            echo "Correo no registrado";
        }
    }

    if(isset($_POST['newEmail']) && isset($_POST['newPass'])){
        $newEmail = $_POST['newEmail'];
        $newPassword = $_POST['newPass'];
             
        $hashedPass = password_hash($newPassword, PASSWORD_DEFAULT);
        
        $db = conectar();
        $insertar = "INSERT INTO Usuario (`email`, `contrasena`) VALUES ('$newEmail', '$hashedPass')";
    
        $agregar=mysqli_query($db,$insertar);

        if($agregar){
            echo "Usuario generado correctamente";
        }
        else{
            echo "Usuario no generado";
        }
    }

 ?>