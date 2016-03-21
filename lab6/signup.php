<!DOCTYPE HTML>

<html lang="en"> 
	<head> 
   	    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/paper/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
   		<link rel="stylesheet" href="css/style.css" />   
		<title>Matching Exercise - Sign Up</title>   
	</head>

 	<body id="body-color">
 		<nav class="navbar navbar-default">
	        <div class="container-fluid">
	            <div class="navbar-header">
	              <a class="navbar-brand" href="#">Matching Exercise</a>
	            </div>
	            <ul class="nav navbar-nav navbar-right">
		        	<li><a href = "login.php">Login</a></li>
		      	</ul>
	        </div>
	    </nav> 
	 	<div id="Sign-Up" class="aligner" style="background-color:#F0F8FF;"> 
		 	<fieldset style="width:30%; margin-left:10px;">
			 	<legend>Registration Form</legend> 
			 	<table border="0"> 
			 	<form method="POST" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">  
			 	<tr> 
			 		<td>UserID</td>
			 		<td> <input type="text" name="user"></td> 
			 	</tr>
			 	<tr> 
			 		<td>Password</td>
			 		<td> <input type="password" name="pass" placeholder="Password" id="pass"></td> 
			 	</tr> 
			 	<tr> 
			 		<td>Confirm Password </td>
			 		<td><input type="password" name="cpass" placeholder="Confirm password" id="cpass"></td> 
			 	</tr> 
			 	<tr> Role : <br>
			 		<input type="radio" name="role" value="0" id="role"> 0(Admin)<br>
		  			<input type="radio" name="role" value="1" id="role"> 1(Student)
			 	</tr>
			 	<tr> 
			 		<td><input class="btn btn-primary btn-md" id="button" type="submit" name="submit" value="Sign-Up"></td> 
			 	</tr> 
			 	</form> 
			 	</table> 
		 	</fieldset> 
	 	</div> 
 	</body> 
</html>

<script>
	var password = document.getElementById("pass");
	var confirm_password = document.getElementById("cpass");

	function validatePassword(){
	  if(password.value != confirm_password.value) {
	    confirm_password.setCustomValidity("Passwords Don't Match");
	  } else {
	    confirm_password.setCustomValidity('');
	  }
	}

	password.onchange = validatePassword;
	confirm_password.onkeyup = validatePassword;
</script>


<?php require_once 'connect.php';

function newUser(){
	global $db;
	$userID = $_POST['user'];
	$userPass = $_POST['pass'];
	$userRole = $_POST['role'];
	$query = "INSERT INTO USER (user_id, hashed_password, role) VALUES ('$userID', '$userPass', '$userRole')";
	$res = $db->query($query);

	echo $userRole;

	if($res){
		echo "YOUR REGISTRATION IS COMPLETED..";
		header("location:login.php");
	}
}

	
function signUp(){
	global $db; // refer to the global variable 'db'
	$userID = $_POST['user'];
	$userpass = $_POST['pass'];

	if(!empty($userID)){
		$query = "SELECT * FROM USER WHERE user_id='".$userID."' AND hashed_password ='".$userpass."' LIMIT 1";
  		$res = $db->query($query);
  		if (!$res) exit("There is a MySQL error, exiting this script");

  		if(!$row = mysqli_fetch_row($res)){
  			newUser();
  		}else{
  			echo "SORRY...YOU ARE ALREADY REGISTERED USER";
  		}
	}
}

if(isset($_POST['submit'])){
	signUp();
}

?>