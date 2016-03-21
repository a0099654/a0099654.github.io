<?php
session_start();
require_once 'connect.php';
require_once 'data.php';

# Available worksheets
$sample = getSample();

# Determine the commands
if(isset($_GET['cmd'])) {

        # Generate a new graph
        if($_GET['cmd'] == 'generate') {

                if(isset($_GET['graph_id'])) {
                        $graph = getGraph($_GET['graph_id']);
                        $_SESSION['visittime'] = time();
                        echo json_encode($graph);
                } else {
                        http_response_code(400);
                        echo "invalid parameter";
                        exit();
                }

        # Find optimal solution from given graph
        } else if($_GET['cmd'] == 'solve') {
                if(isset($_GET['graph'])) {
                        $graph = json_decode($_GET['graph'], true);
                        $n = $graph['N'];
                        $m = $graph['M'];
                        $edges = $graph['E'];
                        $result = findOptimalSolution($n, 0, 0, array(), $edges, 0);
                        echo json_encode($result);
                } else { # Invalid parameter
                        http_response_code(400);
                        echo "invalid parameter";
                        exit();
                }

        # Receive submission of user solution, verify and record best solution
        } else if($_GET['cmd'] == 'submit') {
                if(isset($_SESSION['visittime'])) {
                        $time = time() - $_SESSION['visittime'];
                        session_destroy();
                } else {
                         $time = 2147483647; // MAX_INTEGER
                }

                if(isset($_GET['graph_id']) && isset($_GET['solution'])) {
                        $X = $_GET['graph_id'];
                        $graph = getGraph($X);
                        $selectedEdges = json_decode($_GET['solution'], true);

                        if(isValid($selectedEdges, $graph)) {
                                $user_score = calculateScore($selectedEdges, $graph);

                                global $db;
                                $query = "SELECT num_match, match_score, time FROM record WHERE graph_id = " . $X .";";
                                $res = $db->query($query);
                                if(!$res) exit("There is a MySQL error, exiting this script");
                                $best = mysqli_fetch_row($res);

                                $isNewBest = (count($selectedEdges) >= $best[0] && $user_score >= $best[1]) ? 1:0;
                                $isNewHighScore = ((count($selectedEdges) >= $best[0] && $user_score > $best[1]) || (count($selectedEdges) == $best[0] && $user_score == $best[1] && $time <= $best[2])) ? 1:0;

                                if($isNewHighScore == 1) {
                                        $query = "UPDATE record SET num_match = " . count($selectedEdges) . ", match_score = " . $user_score . ", time = " . $time . " WHERE graph_id = " . $X . ";";
                                        $res = $db->query($query);
                                        if(!$res) exit("There is a MySQL error, exiting this script");
                                }

                                $result = array("graph_id" => $X, "new_best" => $isNewBest, "num_match" => $best[0], "match_score" => $best[1], "new_time" => $isNewHighScore, "time"=>$time);
                                echo json_encode($result);

                        } else { # Invalid edge-list
                                http_response_code(400);
                                echo "invalid edge list";
                                exit();
                        }

                } else { # Invalid parameters
                        http_response_code(400);
                        echo "invalid parameters";
                        exit();
                }
                        # Invalid commands
        } else {
                http_response_code(400);
                echo "invalid commands";
                exit();
        }

# Invalid request
        } else {
        http_response_code(400);
        echo "invalid request";
        exit();
}

?>

