<?php

    class Usuario{

        private $idUsuario;
        private $email;
        private $contrasena;

        function __construct(){
            
        }

        function setIdUsuario($idUsuario){
            
            $this->idUsuario = $idUsuario;
        }

        function setEmail($email){
            
            $this->email = $email;
        }

        function setContrasena($contrasena){
            
            $this->contrasena = $contrasena;
        }

        function getIdUsuario(){
            
            return $this->idUsuario;
        }

        function getEmail(){
            
            return $this->email;
        }

        function getContrasena(){
            
            return $this->contrasena;
        }

    }

?>