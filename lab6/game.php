<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/paper/bootstrap.min.css" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" />
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" href="css/style.css" />   

     </head>
     <body>
         <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">Matching Exercise</a>
            </div>
          </div>
        </nav>
        <div class="aligner">
            <a href="#start" class="btn btn-primary btn-lg">Start</a>
        </div>
        <div class="modal" id="myModal" accept-charset="utf-8">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" aria-hidden="true" id="close">&times;</button>
                <h4 class="modal-title">Generate new worksheet with</h4>
              </div>
              <div class="modal-body" action="matching.php" method="get">
                <div class="alert alert-dismissible alert-danger" id="alert">
                  <button type="button" class="close" id="close-alert" data-dismiss="alert">&times;</button>
                  <strong>Oh snap!</strong> <a href="#" class="alert-link">Change your input value</a> and try submitting again.
                </div>
                <p>N = <input type="number" min="2" max="10" value="" id="N" name="left-column"> rows on the left column and </p>
                <div class="well well-sm">
                  N must be larger than equivalent to 2
                </div>
                <p>M = <input type="number" min="2" max="10" value="" id="M" name="right-column"> rows on the right column!</p>
                <div class="well well-sm">
                  N must be less than equivalent to 10
                </div>
              </div>
              <div class="modal-footer">
                <input type="submit" class="btn btn-primary" id="generate" name="generate" value="Generate">
              </div>
            </div>
          </div>
        </div>
        <table id="tbl">
            <tbody>
            </tbody>
        </table>
        <p>Suggestions: <span id="txtHint"></span></p>
         
        <script src="http://code.jquery.com/jquery-2.2.0.min.js"></script>
        <script src="script.js"></script>
	</body>
</html>