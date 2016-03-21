$(function() {
    var n,m;
    var graph_id;
    var graph_data;
    var match;
    var animal_who_can_eat;
    var pos;
    
    var input = 10;
    var leftArray = [];
    var rightArray = [];
    
    for (var i=0; i<input; i++) {
        leftArray.push(i);
        rightArray.push(i);
    }
    
    shuffle(leftArray);
    shuffle(rightArray);

    while(checkToReshuffle(leftArray,rightArray,input)){
        shuffle(leftArray);
    }
    
    $(".the-return").hide();
    
    //pop up the modal
    $('a[href="#start"]').click(function(){
      $("#myModal").show(); 
    }); 
    
    //close modal
    $('#close').click(function(){
       $('#myModal').fadeOut(); 
       $('#myModal').hide(); 
    });
    
    //check both inputs
   
    $('#alert').hide();
    $('#generate').click(function(){
        n = $(document).find('#N').val();
        m = $(document).find('#M').val();

       //show alert
       if(n < 2 || m > 10){
           $('#alert').show();
           $('#close-alert').click(function(){
               $('#alert').fadeOut();
               $('#alert').hide();
           })
       }else if(n == null || m == null){
           $('#alert').show();
           $('#close-alert').click(function(){
               $('#alert').fadeOut();
               $('#alert').hide();
           })
       }
        else{
            var animal = ["bear.png", "cat.png", "dog.png", "giraffe.png", "hippo.png", "lion.png", "sheep.png", "tiger.png", "turtle.png", "zebra.png"];
            var food = ["strawberry.png", "sandwich.png", "pizza.png", "burger.png", "chicken.png", "cupcake.png", "eggplant.png", "grape.png", "hotdog.png", "pineapple.png"];
            
            var params = {cmd:"generate", N:n, M:m};
            var str = jQuery.param(params);
            console.log(str);
            
            $('#myModal').fadeOut(); 
            $('#myModal').hide();
            
            //to generate the table
            $("#tbl").find('tbody').empty();  //to clear DOM
            $("#tbl").find('tbody').show();
            var table = document.getElementById("#tbl");
            
            var max;
            var min;
            var index = 0;
            
            if(n > m){ //if n and m are not the same value
                max = n;
                min = m;
            }
            else if (n < m){
                min = n;   //for the leftarray
                max = m;   //for the rightarray
            }

            for (var i=0; i<max; i++) {
                $("tbody").append('<tr>').each(function(){
                    if(n == max){
                        $(this).append($('<td class="left_img">').append($('<img class="target">').attr('src', 'img/animal/' + animal[leftArray[i]])));
                    }else if (n == min){
                        if(index < min){
                            $(this).append($('<td class="left_img">').append($('<img class="target">').attr('src', 'img/animal/' + animal[leftArray[i]])));
                            index++;
                        }else if(index == min){
                            $(this).append($('<td>&nbsp;</td>'));
                        }
                    }

                    if(i==0){
                         $(this).append('<td id="canvasCol"><canvas id="cvs"></canvas></td>');
                         $(document).find('#canvasCol').attr('rowspan', max*2);
                         $('#cvs').attr('height', 100 * max);
                    }
                    
                    if(m == max){
                       $(this).append($('<td class="right_img">').append($('<img class="target">').attr('src', 'img/food/' + food[rightArray[i]]))); 
                    }else if(m == min){
                        console.log("n is min");
                        if(index < min){
                            $(this).append($('<td class="right_img">').append($('<img class="target">').attr('src', 'img/food/' + food[leftArray[i]])));
                            index++;
                        }else if(index == min){
                            $(this).append($('<td>&nbsp;</td>'));
                        }
                    }
                    
                });
            }//end of generating table
            
            $(document).ready(function(){
                var score = 0;
                var res = createMatchArray(leftArray, rightArray, input);
                var target =".target";
                appendClick(target, images, leftArray, rightArray,res, input);
            }); 
            
            responsiveCanvas();

            index=0;
            
            //establish connection to matching.php
            var xmlhttp = new XMLHttpRequest();
            req_submit = $.ajax({
                type: "GET",
                url: "http://cs3226.comp.nus.edu.sg/matching.php?cmd=submit&graph_id=" + graph_id + "&solution=" + JSON.stringify(match),
                datatype: "json",

            });

            req_submit.done(function(response, textStatus, jqXHR) {
                data = JSON.parse(response);
                if(data["new_best"] == 1) {
                        req_optimal = $.ajax({
                                type: "GET",
                                url: "matching.php?cmd=solve&graph=" + JSON.stringify(graph_data),
                                dataType:"json",
                        });

                        req_optimal.done(function(response, textStatus, jqXHR) {
                                // Show to client
                                if(response["num_match"] == animal_get_to_eat && response["match_score"] == score) {
                                        if(data["new_time"] == 1) {
                                                $('#msg').text('Congrats, ' + animal_get_to_eat + ' animals eat food and total score of ' + score + " is already the optimal answer. And you completed it with the fastest time " + data["time"] + "ms, reset and try another weighted bipartite graph");
                                        } else {
                                                $('#msg').text('Congrats, ' + animal_get_to_eat + ' animals eat food and total score of ' + score + " is already the optimal answer. However, someone is faster than you!, reset and try again");
                                        }
                                } else {
                                        if(data["new_time"] == 1) {
                                                $('#msg').text('Congrats, you create a new highest score! And you completed it with the fastest time ' + data["time"] + 'ms, However more optimal answer(s) available! Reset and try again!');
                                        } else {
                                                $('#msg').text('Congrats, you ties with the highest score! However, someone is faster than you in completing it and more optimal answer(s) are available! Reset and try again!');
                                        }
                                }
                                $('td').addClass('gameover');
                        });

                        req_optimal.fail(function(jqXHR, textStatus, errorThrown) {
                                $('#msg').text('Server error.');
                        });

                } else {
                        $('#msg').text('Well, as recorded in database, someone can make ' + data["num_match"] + ' animals eat food with total score of ' + data["match_score"] + ", reset and try again");
                        $('td').addClass('gameover');

                }
                $('#submit').addClass('disabled');

            });
            
            req_submit.fail(function(jqXHR, textStatus, errorThrown) {
                    $('#msg').text('Server error.');
            });

            // xmlhttp.onreadystatechange = function() {
            //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //         document.getElementById("txtHint").innerHTML = xmlhttp.responseText; //to display the value
            //         var foo = jQuery.parseJSON(xmlhttp.responseText);
            //         alert(onbeforeunload);  
            //         console.log(foo);
                        
            //     }
            // };
            
            // xmlhttp.open("GET", "http://cs3226.comp.nus.edu.sg/matching.php?" + str, true);
            // xmlhttp.send();
            
            //draw the line with the value
       }
    });


    function responsiveCanvas(){
        init();
    }

    function init(){
        var canvas, ctx;
        
        canvas = document.getElementById('cvs');
        if (canvas.getContext){
            ctx = canvas.getContext("2d");
            window.addEventListener('resize', resizeCanvas, false);
            window.addEventListener('orientationchange', resizeCanvas, false);
            resizeCanvas(canvas);
        }
    }

    function resizeCanvas(canvas){
        canvas.width = $('#canvasCol').width();
        canvas.height = 100 * input;
    }

    function appendClick(event, images, leftArray, rightArray,res,input){    
        var isMatched = false;
        
        $(event).click(function(event){
            var array = [];
            var no_of_clicked, chosenLeft, chosenRight;
        
            $(event.target).addClass("clicked");
            no_of_clicked = $(".clicked").length;
            
            if(no_of_clicked == 2){
                var result = checkPosition($(".clicked")[0], $(".clicked")[1]);
                isMatched = checkMatching(result.left, result.right);
                console.log(result.left);
                console.log(result.right);
                if(isMatched){
                    first_choice = checkIndex(images, leftArray, result.left.getAttribute("src").substring(4));
                    second_choice = checkIndex(images, rightArray, result.right.getAttribute("src").substring(4));
                    score++;
                    if(Math.abs(first_choice-second_choice)<=1){
                        drawStraightLine(first_choice, second_choice);
                    }else{
                        drawCurvyLine(first_choice, second_choice);
                    }  
                    
                    if(score==input){
                        $("#header").show();
                        $("#tbl").find('tbody').hide();
                        alert("Congratulation");
                    }
                }else{
                    no_error++;
                    
                    if(no_error == 3){
                       $("#header").show();
                       $("#tbl").find('tbody').hide();
                       alert("Please try again");
                    }
                }
            }//end of no_of_clicked
            
        });
       
    }
    
    function checkPosition(element1 , element2){
        var array = []; 
        var isElement1Left = false;
        var isElement2Left = false;
        
        if($(element1).parent().hasClass("left_img")){
            isElement1Left = true;
        }
        if($(element2).parent().hasClass("left_img")){
            isElement2Left = true;
        }
        
        // return as an object
        if(isElement1Left == isElement2Left){ //same column
            alert("Same column, try again");
            $(element1).removeClass("clicked");
            $(element2).removeClass("clicked");
            return {
                'left': null,
                'right': null
            };
        }else if(isElement1Left == true){
            $(element1).removeClass("clicked");
            $(element2).removeClass("clicked");
            return {
                'left': element1,
                'right': element2
            };
        } else {
            $(element1).removeClass("clicked");
            $(element2).removeClass("clicked");
            return {
                'left': element2,
                'right': element1
            };
        }
    }

    function checkMatching(element1, element2){
        var first_chosen = element1.getAttribute("src");
        var second_chosen = element2.getAttribute("src");
        
        if(first_chosen == second_chosen){
            $(element1).addClass("silhoutte");
            $(element1).parent().addClass("avoid-clicks");
            
            $(element2).addClass("silhoutte");
            $(element2).parent().addClass("avoid-clicks");
            return true;
        }else{
            return false;
        }
    }

    function checkIndex(images, array, image_name){
        var chosenImage, selectedIndex;
        
        for( var i =0 ; i<images.length; i++){
            if(image_name == images[i]){
                chosenImage = i;                        
            }
        }
                   
        for( var i=0; i<array.length ; i++){
            if(chosenImage == array[i]){
                selectedIndex = i;
            }
        }
        return selectedIndex;
    }
        
    function shuffle (Array){
        var length = Array.length -1;
        var toSwap;
        var tempNumber;

        for(var i = length; i > 0; i--){
            toSwap = Math.floor(Math.random() * i);
            tempNumber = Array[i];
            Array[i] = Array[toSwap];
            Array[toSwap] = tempNumber;
        }
        return Array;
    }

    function checkToReshuffle (Array_1, Array_2, length){
        for(var i = 0; i<length; i++ ){
            if(Array_1[i] == Array_2[i]){
                return true;
            }
        }
        return false;
    }

    function drawStraightLine(l,r){
        var canvas = document.getElementById('cvs');
        var context = canvas.getContext('2d');
        var windowWidth = window.innerWidth/2;
        var windowHeight = window.innerHeight/2;
        var initial = (windowHeight/400)*50;
        
        context.beginPath();
        context.moveTo(0,(l*100) + initial);
        context.lineTo(windowWidth, (windowHeight/400)*(r*100) + initial);
        context.stroke();
    }

    function drawCurvyLine(l,r){
        var canvas = document.getElementById('cvs');
        var context = canvas.getContext('2d');
        var windowWidth = window.innerWidth/2;
        var windowHeight = window.innerHeight/2;
        var initial = (windowHeight/400)*50;
        
        context.beginPath();
        //context.moveTo(0,(l*100) + initial);
        //context.bezierCurveTo((windowWidth/400)*133,(l*100) + initial, (windowWidth/400)*266,(windowWidth/400)*(r*170) + initial, (windowWidth/400)*388,(windowWidth/400)*(r*170) + initial);
        
        var height = $('#cvs').height() / input;
        var width = $('#cvs').width();
        var start_height = (height/2 + l * height) / $('#tbl').height() * $('#cvs').height();
        var dest_height = (height/2 + r * height) / $('#tbl').height() * $('#cvs').height();
        context.moveTo(0,start_height);
        context.bezierCurveTo(width/3,start_height, width * 2/3,dest_height, width,dest_height);
        
        context.lineWidth = 1;

        context.strokeStyle = 'black';
        context.stroke();
    }

    function createMatchArray(leftArr, rightArr, length){
        
        var index = 0;
        var resArray = [];
        
        while(index < length){
            var value = leftArr[index];
            for(var i = 0; i<length; i++){
                if(rightArr[i] == value){
                    resArray[index] = i;
                }
            }//end of for loop
            index++;
        }
        
        return resArray;  //return the array of the right index
    }

});