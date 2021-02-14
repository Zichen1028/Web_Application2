/*  
   Author: Zichen Wu + 102849551 
   Target: quiz.html
   Purpose: To set a clock and a timer when the window is onload.
   Created: 21/9/20
   Last updated: 28/9/20
   Credits: 
*/


/*********************For enhancement1: Timer*/
"use strict";//Avoid global variables

function myclock() {
    time = time-1;//drement time by one second
    var insert = document.getElementById("time");
    insert.innerHTML = "<text>" + time + "</text>";//insert the time into the clock by id 'time' in the quiz.html page
    var d = new Date();
    var t = d.toLocaleTimeString();//get the local time
    document.getElementById("time").innerHTML = t;//write down the current time into the clock by id 'time'
}

function timer(){
    setInterval(myclock,1000);//set a clock here: Invoke 'myclock' every 1000ms
    var c = 60;//init c = 60, whcih means there is a 60s timer.
    setInterval(function mytimer(){//set a timer here. the function code is written inside
        if (c>=1){
            c=c-1;//when timing is more than one, decrement by one
        }
        else{
            document.getElementById("submit").click();//when the timing is 0, submit the form
        }
        document.getElementById("timing").innerHTML = c;//update the number of the timer
        localStorage.setItem("time",c); //Save var c as 'time' into locaStorage so that the time can be available in quiz.js
    },1000);//invoke timer every 1000ms
    
}



window.addEventListener('load',timer);//Invoke the timer and the clock after the window is loaded. 




/**************************For enhancement2: Re-implement the quiz.js by jQuery*/
//Initialize
/*function init(){//init both of quiz page and result page
    localStorage.setItem("q1_answer","JavaScript Object Notation");
    localStorage.setItem("q4_answer","Comma");
}

$(document).ready(function(){
    //submit the form and get the values so that they can be used later
    $("#submit").click(function(){
        var total_score;//init total score
        //init scores of all the questions
        var s1=0;
        var s2=0;
        var s3=0;
        var s4=0;
        var s5=0;
        
        var $fname = $("#first_name");//get the first name and set it into the localStorage
        var fname = $fname.val();
        localStorage.fname=fname;

        var $lname = $("#last_name");//get the last name and set it into the localStorage
        var lname = $lname.val();
        localStorage.lname=lname;

        var $stuID = $("#stuno");//get the Student ID and set it into the localStorage
        var stuID = $stuID.val();
        localStorage.stuID=stuID;

        var $q1 = $("#q1");
        var q1 = $q1.val();//get the answer of q1
        var $q4 = $("#q4");
        var q4 = $q4.val();//get the answer of q4

        if(q1=="JavaScript Object Notation"){
            s1=2;//validate the textarea
        }
        if ($("input[name='q2']:checked").val() == "JSON"){
            s2=2;//validate the radio
        }
        if (($('#storing').is(":checked")) && ($('#generating').is(":checked")) && ($('#transferring').is(":checked")) && ($('#verifying').is(":checked"))){
            s3=2;//validate if all the checkboxes are checked
        }
        if ((q4=="Comma") || (q4=="comma")){
            s4=2;//validate the text
        }
        if ($("#father").val() == "Douglas Crockford"){
            s5=2;
        }

        total_score = s1+s2+s3+s4+s5;
        if(total_score==0){
            alert("You cannot submit due to the score is zero.\nThis quiz will be reloaded...");
        }
        localStorage.setItem("total_score",total_score);

        //identify ID and then check attempt
        //var exid=localStorage.getElementById("stuID");
        //if (localStorage.getElementById("stuID").val() == null) {
            localStorage.setItem("attempt",1);
        //}

    })

    //Get values from the localStorage and write into the Result.html page;
    $("#firstname").text(localStorage.getItem("fname"));
    $("#lastname").text(localStorage.getItem("lname"));
    $("#stuno").text(localStorage.getItem("stuID"));
    $("#score").val(localStorage.getItem("total_score"));
    $("#attempt").val(localStorage.getItem("attempt"));




    //From here, the plugin 'jQuery Form Validator' has been used to validate the form
    var $quizForm = $("#form");
    //This method is to avoid any space entered 
    $.validator.addMethod("noSpace", function(value, element){
        return value == '' || value.trim().length != 0;
    },"Spaces are not allowed");
    //This method is to check if the name matches the Rex
    $.validator.addMethod("checkname", function(value, element) { 
        return this.optional( element ) || /^[a-zA-Z\s-]{1,25}$/.test( value ); 
    }, "Your first name or last name must only contain alpha characters, hyphen in the length from 1 to 25.");
    //This method is to check if the studentID matches the Rex
    $.validator.addMethod("checkID", function(value, element) { 
        return this.optional( element ) || /^([0-9]{7})$|(^[0-9]{10})$/.test( value ); 
    }, "Your student number must only contain 7 or 10 digits.");

    
    if($quizForm.length){
        $quizForm.validate({
            rules:{
                first_name:{
                    noSpace: true,
                    required: true,
                    checkname: true
                },
                last_name:{
                    required: true,
                    noSpace: true,
                    checkname: true
                },
                student_number:{
                    required: true,
                    checkID: true
                },
                q1:{
                    noSpace: true,
                    required:true
                },
                q2:{
                    required:true
                },
                q3:{
                    required:true
                },
                q4:{
                    required:true,
                    noSpace: true
                },
                father:{
                    required:true
                }
            },
            messages:{
                first_name:{
                    required:'Your first name cannot be empty.'
                },
                last_name:{
                    required:'Your last name cannot be empty.'
                },
                student_number:{
                    required:'Your student number cannot be empty.'
                },
                q1:{
                    required:'Please enter your answer to Q1.'
                },
                q2:{
                    required:'Please enter your answer to Q2.'
                },
                q3:{
                    required:'Please enter your answer to Q3.'
                },
                q4:{
                    required:'Please enter your answer to Q4.'
                },
                father:{
                    required:'Please enter your answer to Q5.'
                }
            }
        })
    }
})

window.addEventListener("load",init);*/