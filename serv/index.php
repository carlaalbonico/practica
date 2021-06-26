<?php
	 
    function conectar(){
    $conexion= mysqli_connect("127.0.0.1","root","","pushupgym");
        if (!$conexion) {
    	echo "Error al conectar base";
        }
				
    return $conexion;
    }

    
    if(isset($_POST['email']) && isset($_POST['pass'])){
        $email = $_POST['email'];
        $password = $_POST['pass'];
        
        echo "<script> alert('los datos han llegado hasta aca')</script>";
                     
        $db = conectar();
        $consultar = "select password from usuario where email = '$email'";
        $query = mysqli_query($db,$consultar);
        
		    $array = mysqli_fetch_array($query);
            
    
        $passwordGuardada = $array['password']; 
       
        if (password_verify($password , $passwordGuardada)) {
            header("Location:index.html");
        } 
        else {
            echo "Password incorrect.";
        };

        echo "<script> alert('los datos han llegado hasta aca')</script>";



    }

    if(isset($_POST['newEmail']) && isset($_POST['newPass'])){
        $newEmail = $_POST['newEmail'];
        $newPassword = $_POST['newPass'];
       
        
        $hashedPass = password_hash($newPassword, PASSWORD_DEFAULT);
           
        

        $db = conectar();
        $insertar = "INSERT INTO usuario (`email`, `password`) VALUES ('$newEmail', '$hashedPass')";
    
        $agregar=mysqli_query($db,$insertar);
        echo "<script> alert('los datos han sido agregados')</script>";

        if(!$agregar){
        
        echo"<h3> no se ha agregado el producto</h3>";}

    }

 ?>