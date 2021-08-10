<?php

    require 'accesoADatos/AccesoDatos.php';
    
    if(isset($_POST['email']) && isset($_POST['pass'])){
        $email = $_POST['email'];
        $password = $_POST['pass'];

        $objAccesoDatos = AccesoDatos::obtenerInstancia();
        $consulta = $objAccesoDatos->prepararConsulta("SELECT email, contrasena FROM Usuario WHERE email=?");
        $consulta->execute(array($email));
        $arregloUsuario = $consulta->fetch();

        if(!$arregloUsuario){
            echo 'No existe usuario';
            die();
        }

        //var_dump($arregloUsuario);

        if(password_verify($password, $arregloUsuario['contrasena'])){
            echo "Acceso correcto";
        }
        else{
            echo "Contraseña incorrecta";
        }
        
    }

    if(isset($_POST['newEmail']) && isset($_POST['newPass'])){
        $newEmail = $_POST['newEmail'];
        $newPassword = $_POST['newPass'];
             
        $hashedPass = password_hash($newPassword, PASSWORD_DEFAULT);
        
        $objAccesoDatos = AccesoDatos::obtenerInstancia();
        $consulta = $objAccesoDatos->prepararConsulta("INSERT INTO Usuario (`email`, `contrasena`) VALUES (?,?)");

        if($consulta->execute(array($newEmail, $hashedPass))){
            echo "Usuario generado correctamente";
        }
        else{
            echo "Usuario no generado";
        }
    }

 ?>