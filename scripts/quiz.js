/*  
   Author: Zichen Wu + 102849551 
   Target: quiz.html
   Purpose: To validate the form and display some infomation in result.html page.
   Created: 21/9/20
   Last updated: 28/9/20
   Credits: 
*/
"use strict";

function saveResult (fname,lname,score,stuno,attempt){
	if(typeof(Storage)!=="undefined"){
		localStorage.setItem("first_name", fname);
        localStorage.setItem("last_name", lname);	
        localStorage.setItem("stuno", stuno);	
        localStorage.setItem("score", score);
        localStorage.setItem("attempt", attempt);
	}
}

function getResult(){
	if(typeof(Storage)!=="undefined"){
		if (localStorage.getItem("stuno") !== null) {
            var fname = document.getElementById("firstname");
            fname.textContent = localStorage.getItem("first_name");
            
            var lname = document.getElementById("lastname");
            lname.textContent = localStorage.getItem("last_name");

			var stuno = document.getElementById("stuno");
			stuno.textContent = localStorage.getItem("stuno"); 
			
			var score = document.getElementById("score");
            score.value = localStorage.getItem("score"); 

            var attempt = document.getElementById("attempt");
            attempt.value = localStorage.getItem("attempt");  
            
            if  (attempt.value<3){
                setInnerHTML();

            }          
		}	
	}
}


function validate() {
    var errMsg="";
	var result=true;
    var score=0;
    
    var fname = document.getElementById("first_name").value;
    var lname = document.getElementById("last_name").value;
    var stuno = document.getElementById("stuno").value;
    var father = document.getElementById("father").value;
    var JSON = document.getElementById("JSON").checked;
    var XML = document.getElementById("XML").checked;
    var storing = document.getElementById("storing").checked;
    var generating = document.getElementById("generating").checked;
    var transferring = document.getElementById("transferring").checked;
    var verifying = document.getElementById("verifying").checked;
    var q4 = document.getElementById("q4").value.trim();
    var q1 = document.getElementById("q1").value;

    
    //Check first name
    if (fname == "") {
        errMsg = errMsg + "Your first name cannot be empty.\n"
        result = false;
    }
    else if (!fname.match(/^[a-zA-Z\s-]{1,25}$/)){
        errMsg = errMsg + "Your first name must only contain alpha characters, hyphen in the length from 1 to 25.\n"
        result = false;
    }
    
    //Check first name
    if (lname == "") {
        errMsg = errMsg + "Your last name cannot be empty.\n"
        result = false;
    }
    else if (!lname.match(/^[a-zA-Z\s-]{1,25}$/)){
        errMsg = errMsg + "Your first name must only contain alpha characters, hyphen in the length from 1 to 25.\n"
        result = false;
    }

    //check Q1 - Text area
    if (q1 == "") {
        errMsg = errMsg + "Please enter your answer to Q1.\n"
        result = false;
    }
    else if (q1.match(/JavaScript Object Notation/i)) {
        score += 2;
    }

    //check Q2 - Radio
    if(!(JSON || XML)) {
        errMsg = errMsg + "Please enter your answer to Q2.\n";
        result = false;
    }
    else if (JSON) {
        score += 2;
    }

    //check Q3 - Checkbox
    if (!(storing || generating || transferring || verifying)) {
        errMsg = errMsg + "Please enter your answer to Q3.\n";
        result = false;
    } 
    else if (storing && generating && transferring && verifying) {
        score += 2;
    }

    //check Q4 - Text
    if (q4 == "") {
        errMsg = errMsg + "Please enter your answer to Q4.\n"
        result = false;
    }
    else if (q4.match(/Comma/i)) {
        score += 2;
    }

    //check Q5 - Drop list
    if( father== "none") {
        errMsg = errMsg + "Please enter your answer to Q5.\n";
        result = false;
    }
    else if (father == "Douglas Crockford") {
        score += 2;
    }

    //check student_no
    if (stuno == "") {
        errMsg = errMsg + "Your student number cannot be empty.\n"
        result = false;
    }
    else if (!stuno.match(/^([0-9]{7})$|(^[0-9]{10})$/)){
        errMsg = errMsg + "Your student number must only contain 7 or 10 digits.\n"
        result = false;
    }
    else {
        if (score > 0) {
            var attempt = check_id(stuno);
        }
    }

    if (errMsg != "") {
        alert(errMsg);
    }
    else if (score == 0) {
        if ((localStorage.getItem("attempt") == 3) && (localStorage.getItem("stuno") == stuno)){
            alert(errMsg = "You have had tried three times!!!");
            result=false;
        }
        else {
            alert(errMsg = "You cannot submit due to the score is zero.\nThis quiz will be reloaded...");
            location.reload();
            result=false;}
    }
    else if ((localStorage.getItem("attempt") == 3) && (localStorage.getItem("stuno") == stuno)){
        alert(errMsg = "You have had tried three times!!!");
        result=false;
    }
    else if ((errMsg != "") && (localStorage.getItem("time")==0)){
        location.reload();
    }
    else {  
        saveResult(fname,lname,score,stuno,attempt);
    }
    
    
    return result;
}

function check_id(stuno){ 
    var exid = get_exid();
    if ( (exid == null) || ((localStorage.getItem("attempt") != 0 ) && (stuno != exid))){
        var attempt = 1;
    }
    if (stuno == exid){
        var attempt = get_attempt();
        if (attempt == 1){
            attempt = 2;
        }
        else if (attempt == 2){
            attempt = 3;
        }  
    }
    return attempt;
}

function setInnerHTML(){
    var insert = document.getElementById("tryagain");
    if ((localStorage.getItem("attempt")) != 3){
        insert.innerHTML = "<a href=quiz.html>Try again now!!!!!</a>"
    }
}

function get_attempt(){
    var attempt = localStorage.getItem("attempt");
    return attempt;
}

function get_exid(){
	var exid = localStorage.getItem("stuno");
    return exid;
}

function init() {
	if (document.getElementById("quiz")) {  
		document.getElementById("form").onsubmit = validate;
    }
    else if (document.getElementById("result")) { 
        getResult();		
    }
}

window.onload = init;