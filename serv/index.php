<?php

    require 'accesoADatos/AccesoDatos.php';
    require 'sesiones/SesionControlador.php';
    require 'entidades/Usuario.php';
    
    if(isset($_POST['email']) && isset($_POST['pass'])){
        $email = $_POST['email'];
        $password = $_POST['pass'];

        $objAccesoDatos = AccesoDatos::obtenerInstancia();
        $consulta = $objAccesoDatos->prepararConsulta("SELECT idUsuario, email, contrasena FROM usuario WHERE email=?");
        $consulta->execute(array($email));
        $arregloUsuario = $consulta->fetch();

        if(!$arregloUsuario){
            echo false;
            die();
        }

        //var_dump($arregloUsuario);

        if(password_verify($password, $arregloUsuario['contrasena'])){
            
            $UsuarioDB = new Usuario();
            
            $UsuarioDB->setIdUsuario($arregloUsuario['idUsuario']);
            $UsuarioDB->setEmail($arregloUsuario['email']);
            $UsuarioDB->setContrasena($arregloUsuario['contrasena']);
            
            SesionControlador::iniciar($email);
            
            echo true;
        }
        else{
            echo false;
        }
        
    }
    
    if(isset($_GET['sesion'])){
        SesionControlador::cerrar();
        header('Location:../login.html');
    }
    
    if(isset($_POST['newEmail']) && isset($_POST['newPass'])){
        $newEmail = $_POST['newEmail'];
        $newPassword = $_POST['newPass'];
             
        $hashedPass = password_hash($newPassword, PASSWORD_DEFAULT);
        
        $objAccesoDatos = AccesoDatos::obtenerInstancia();
        $consulta = $objAccesoDatos->prepararConsulta("INSERT INTO usuario (`email`, `contrasena`) VALUES (?,?)");

        if($consulta->execute(array($newEmail, $hashedPass))){
            echo "Usuario generado correctamente";
        }
        else{
            echo "Usuario no generado";
        }
    }

 ?>