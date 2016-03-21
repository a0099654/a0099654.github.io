<!DOCTYPE html>

<html lang="en">
	<head>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/paper/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
   		<link rel="stylesheet" href="css/style.css" />   
		<title>Matching Exercise</title>
	</head>

	<body>

	<?php 	
	session_start();
		$uid = "";
		$upass = "";
	?>
	<nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">Matching Exercise</a>
            </div>
        </div>
    </nav>
	
	<div style="text-align:center">
		<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
		<p>Your Username = <input type="text" name="uid" value="<?php echo $uid;?>" placeholder="Username"> <br>
		<p>Your Password = <input type="password" name="upass" value="<?php echo $upass;?>" placeholder="User password"><br>

		<input type="submit" value="Login" name="submit" class="btn btn-primary btn-sm" style="margin-top:10px;">
		</p>

		</form>
	<div>


	<?php 
	// session_start();
	require_once 'connect.php';
		
	if (isset($_POST['uid']) and isset($_POST['upass'])) {
		global $db; // refer to the global variable 'db'
		
		$userID = $_POST['uid'];
		$userpass = $_POST['upass'];
		$hashed_password = crypt($userpass);

		$query = "SELECT * FROM USER WHERE user_id='".$userID."' AND hashed_password ='".$hashed_password."' LIMIT 1";
  		$res = $db->query($query); // yes, just like this
  		if(mysqli_num_rows($res) == 1){
  			echo "You have successfully login";

  			$_SESSION['login_user'] = $userID;
  			if($userID == "boss"){
  				header("location:admin.php");
  				$_SESSION['role'] = 0;
  			}else{
  				header("location:game.php");
  				$_SESSION['role'] = 1;
  			}
  		}else{
  			echo "<p style=color:#ff0000;>Invalid login</p>";
  		}

	}
	?>

	<p style="text-align:center;">Don't have an account yet? <a href = "signup.php"><u>Sign Up</u></a></p>
	</body>
</html>