$(document).ready(function(){
    var c = document.getElementById("theCanvas");
    var ctx = c.getContext("2d");
    
    var orange = true;
    var red = false;
    var green = false;
    
    var time = 0;
    var greenTime = 0;
    var pressTime = 0;
    
    var scores = [];
    var average = 0;
    var sum = 0;
    
    var timeoutID;
    
    if($.jCookie('userViewMode') == 'night'){
        $('link[href="css/styles.css"]').attr('href','css/night.css');
    }
    
    function goOrange(){
       ctx.beginPath();
       ctx.rect(0, 0, 400, 400);
       ctx.fillStyle = "orange";
       ctx.fill();
       orange = true;
       red = false;
       green = false;
    }
    
    function goGreen(){
       ctx.beginPath();
       ctx.rect(0, 0, 400, 400);
       ctx.fillStyle = "#7CFC00";
       ctx.fill();
       orange = false;
       red = false;
       green = true;
    }
    
    function goRed(){
       ctx.beginPath();
       ctx.rect(0, 0, 400, 400);
       ctx.fillStyle = "#990000";
       ctx.fill();
       orange = false;
       red = true;
       green = false;
    }
    
    function resetTimes(){
      var time = 0;
      var greenTime = 0;
      var pressTime = 0;  
    }
    
    goOrange();
    
    $("#theCanvas").click(function() {
        if(orange == true && green == false && red == false){
            goRed();
            time = Math.floor((Math.random() * 3000) + 3000);
            timeoutID = setTimeout(goGreen, time);
            greenTime = Date.now();
        }
        
        else if(green == true && orange == false && red == false){
            goOrange();
            pressTime = Date.now() - greenTime - time;
            alert("Your time was: " + pressTime + "ms");
            scores.push(pressTime);
            for(var i = 0; i < scores.length; i++){
                sum = sum + scores[i];
            }
            average = sum/scores.length;
            average = Math.round(average * 100) / 100
            sum = 0;
            $('#average').text("Average: " + average + "ms");
            $('#attempts').append('<p>' + scores.length + ') ' + pressTime + 'ms</p>')
            resetTimes();
            
        }
                
        else if(red == true && green == false && orange == false){
            clearTimeout(timeoutID);
            goOrange();
            alert("You pressed too early.");
            resetTimes();
        }
    });
    
    $('#night').click(function (){
        $('link[href="css/styles.css"]').attr('href','css/night.css');
        $.jCookie('userViewMode', 'night');
    });
    
    $('#normal').click(function (){
        $('link[href="css/night.css"]').attr('href','css/styles.css');
        $.jCookie('userViewMode', 'normal');
    });
    
});