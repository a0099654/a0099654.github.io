<html>
	<head>
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/paper/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
   		<link rel="stylesheet" href="css/style.css" />   
		<title>Welcome to Matching Exercise!</title>
	</head>

	<body>
		<nav class="navbar navbar-default">
	        <div class="container-fluid">
	            <div class="navbar-header">
	              <a class="navbar-brand" href="#">Matching Exercise</a>
	            </div>
	            <ul class="nav navbar-nav navbar-right">
		        	<li><a href = "logout.php">Sign Out</a></li>
		      	</ul>
	        </div>
    	</nav>

		<?php // connect.php basically contains these commands
		session_start();
		require_once 'connect.php';

		if(isset($_SESSION['login_user'])){
			$user = $_SESSION['login_user'];
			$role = $_SESSION['role'];
			echo "<h3>Hi ". $user. "!</h3>";
		}

		if(isset($_POST['reset'])){
			echo "reset is click";
		}

		function DisplayTableInHTML($table_name) {  
		  global $db; // refer to the global variable 'db'
		  $query = "SELECT * FROM " . $table_name;
		  $res = $db->query($query); // yes, just like this
		  if (!$res) exit("There is a MySQL error, exiting this script");
		  echo "<p style=\"text-align:center; background-color:#FAEBD7; margin-top: 10px\">Table " . $table_name . "<br></p>"; // dynamic HTML table
		  echo "<table border=\"1px\" class=\"admin_table table table-striped table-hover\" style=\"border-collapse: collapse\">";
		  echo "<thead>";
		  echo "<tr><th>Graph ID</th>";
		  echo "<th>User ID</th>";
		  echo "<th>Best Score</th>";
		  echo "</tr>";
		  echo "</thead>";

		  while ($r = mysqli_fetch_row($res)) { // important command
		    echo "<tr><td>" . $r[0] . "</td>"; // echo first column
		    for ($i = 1; $i < count($r); $i++) echo "<td>" . $r[$i] . "</td>";
		    echo "</tr>";
		  }
		  echo "</table>";
		}

		DisplayTableInHTML("USER");
		DisplayTableInHTML("SCOREBOARD"); 
		$db->close();
		?>

		<a href="#" class="btn btn-primary btn-md" method="post" name="reset">Reset</a>
	</body>
</html>