<?php

// Return graph in sample with graph_id = $X if valid
function getGraph($X) {
        // Validate parameters
        if($X < 1 || $X > 9) {
                http_response_code(400);
                echo "invalid values \n";
                exit();
        }

        $sample = getSample();

        // Results
        return $sample[$X-1];
}

// Data of available worksheets
function getSample() {
        return array(
                array(
                        "N" => 2,
                        "M" => 3,
                        "E" => array(
                                array(0, 0, 30),
                                array(0, 1, 90),
                                array(1, 2, 95)
                        )
                ),
                array(
                        "N" => 3,
                        "M" => 3,
                        "E" => array(
                                array(0, 1, 90),
                                array(1, 2, 95),
                                array(2, 0, 87),
                        )
                ),
                array(
                        "N" => 3,
                        "M" => 2,
                        "E" => array(
                                array(0, 0, 30),
                                array(0, 1, 90),
                                array(2, 0, 87)
                        )
                          ),
                array(
                        "N" => 3,
                        "M" => 4,
                        "E" => array(
                                array(0, 0, 30),
                                array(0, 1, 90),
                                array(1, 2, 95),
                                array(2, 3, 15),
                                array(2, 0, 87)
                        )
                ),
                array(
                        "N" => 4,
                        "M" => 3,
                        "E" => array(
                                array(0, 1, 90),
                                array(1, 2, 95),
                                array(2, 0, 87),
                                array(2, 2, 10),
                                array(3, 2, 11)
                        )
                ),
                array(
                        "N" => 4,
                        "M" => 4,
                        "E" => array(
                                array(0, 1, 90),
                                array(1, 2, 95),
                                array(2, 0, 87),
                                array(3, 2, 11),
                                array(3, 3, 93)
                        )
                ),
                array(
                        "N" => 5,
                        "M" => 4,
                        "E" => array(
                                array(0, 0, 30),
                                array(0, 1, 90),
                                array(1, 2, 95),
                                array(2, 0, 87),
                                array(3, 3, 93),
                                array(4, 2, 54),
                                array(4, 3, 3)
                        )
                         ),
                array(
                        "N" => 4,
                        "M" => 5,
                        "E" => array(
                                array(0, 0, 30),
                                array(0, 1, 90),
                                array(1, 2, 95),
                                array(2, 0, 87),
                                array(3, 2, 11),
                                array(3, 3, 93),
                                array(3, 4, 13)
                        )
                ),
                array(
                        "N" => 5,
                        "M" => 6,
                        "E" => array(
                                array(0, 1, 90),
                                array(1, 2, 95),
                                array(2, 0, 87),
                                array(2, 3, 9),
                                array(3, 3, 93),
                                array(4, 3, 3),
                                array(4, 4, 2),
                                array(4, 5, 99)
                        )
                )
        );
}

?>


