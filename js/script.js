var images = ["charger.png", "money.png", "open_book.png", "plate.png", "wallet.png"];

var input;
var leftArray = [];
var rightArray = [];
var score = 0;
var no_error = 0;

$("#btn").click(function () {
    $("#header").hide();
    $("#tbl").find('tbody').empty();  //to clear DOM
    leftArray.length = 0;
    rightArray.length = 0;
    
    input = $(document).find('#n').val();
    $("#msg").text("Now match cell from the left column with the one on the right column.");

    for (var i=0; i<input; i++) {
        leftArray.push(i);
        rightArray.push(i);
    }
    
    shuffle(leftArray);
    shuffle(rightArray);

    while(checkToReshuffle(leftArray,rightArray,input)){
        shuffle(leftArray);
    }
    
    if (input < 2 || input > 12) {
        $("#msg").text("Please enter value between 2 and 12");
    } else {
        //append column
        for (var i=0; i<input; i++) {
            
            $("tbody").append('<tr>').each(function(){
                $(this).append($('<td class="left_img" id="right_move">').append($('<img class="target">').attr('src', 'img/' + images[leftArray[i]]).text(leftArray[i])));
                
                if(i==0){
                     $(this).append('<td id="canvasCol"><canvas id="cvs" width="100%"></canvas></td>');
                     $(document).find('#canvasCol').attr('rowspan', input*2);
                     $(document).find('#cvs').attr('height', input*100);
                }
                
                $(this).append($('<td class="right_img" id="left_move">').append($('<img class="target">').attr('src', 'img/' + images[rightArray[i]]).text(rightArray[i])));
            });
        }
    }
    
    $(document).ready(function(){
        var score = 0;
        var res = createMatchArray(leftArray, rightArray, input);
        var target =".target";
        appendClick(target, images, leftArray, rightArray,res, input);
    }); 
    

});

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
            
            if(isMatched){
                first_choice = checkIndex(images, leftArray, result.left.getAttribute("src").substring(4));
                second_choice = checkIndex(images, rightArray, result.right.getAttribute("src").substring(4));
                score++;
                if(Math.abs(first_choice- res[second_choice])<=1){
                    drawCurvyLine(first_choice, second_choice);
                }else{
                    drawStraightLine(first_choice, second_choice);
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
    
    var initial = 50;
    var canvas = document.getElementById('cvs');
    var context = canvas.getContext('2d');
    
    context.beginPath();
    context.moveTo(0,(l*100) + initial);
    context.lineTo(400, (r*100) + initial);
    context.stroke();
}

function drawCurvyLine(l,r){
    
    var initial = 50;
    var canvas = document.getElementById('cvs');
    var context = canvas.getContext('2d');

    context.beginPath();
    context.moveTo(0,(l*100) + initial);
    context.bezierCurveTo(140, 250, 208, 200, 388,(r*100) + initial);
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

