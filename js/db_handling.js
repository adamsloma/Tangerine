// Person class is a tree that stores all user data
class Person {
    // each person represents someone who has various things going on
    // users are authenticated by checking the 'uname' attribute against a list of
    // usernames
    // the password is then verified
    // super insecure by today's standards but that's fine

    // the schedule is represented by a nested dictionary that's explained in functions addDay(), addEmptyWeek(), and addEmptyMonth()
    // there are points where it would make more sense to use a list. We're not doing this because the way that JSON stores and
    // returns lists is clunky and strange
    // It's easier to make everything a dictionary than try to manage the incomplete support for lists
    // https://firebase.googleblog.com/2014/04/best-practices-arrays-in-firebase.html

    get schedule() {
        return this._schedule;
    }

    set schedule(value) {
        this._schedule = value;
    }

    constructor(firstName, lastName, email, uname, password, level) {
        this.firstName = firstName; //str
        this.lastName = lastName; //str
        this.email = email; //str
        this.uname = uname;         // str
        this.password = password;   // str
        this.level = level;         // int //what is this Adam?
        this._schedule = {};
        this.count = -1; //this should start at 0. When the user creates a workoutList it shouldn't start at 0 lists it should be 1 list
    }

    // a day is represented by a "dictionary" of Workout instances
    addDay(workoutList) {
        this._schedule[this.count+1] = workoutList;
        this.count += 1;
    }

    addDay2(workoutList){
      var currentDate = new Date();
      this._schedule[currentDate] = workoutList;
      }

}

class Workout {
    constructor(title, type, difficulty, details) {
        this.title = title;             // str, a title for the workout
        this.type = type;               // str, the type of workout (options are "weightlifting", "cardio", "HIIT")
        this.difficulty = difficulty;   // int, the 101 stuff
        this.details = details;         // the instructions required to actually do the workout
    }
}

// Initialize Firebase
//Make sure that the firebase is a live database and not a standard database and also edit the permissions to display True
var config = {
    apiKey: "AIzaSyBaHVox7skGzll8OrkVvoTknlnLk5ba7y8",
    authDomain: "tangerine-ba3ad.firebaseapp.com",
    databaseURL: "https://tangerine-ba3ad.firebaseio.com",
    projectId: "tangerine-ba3ad",
    storageBucket: "tangerine-ba3ad.appspot.com",
    messagingSenderId: "439864139122"
};

firebase.initializeApp(config);
var database = firebase.database();

// TODO: implement Person, Schedule and Workout classes to push and pull from Firebase
// TODO: implement exception handling for new classes
// TODO: implement writing to Database ---- done?
// TODO: implement reading from Database---- Done
// TODO: fix schedule component so that it's written to the database

function writePerson(person) {
    database.ref('users/' + person.uname).set({
        email: person.email,
        userName:person.uname,
        firstName: person.firstName,
        lastName: person.lastName,
        password: person.password,
        //level: person.level,
        schedule: person._schedule
    });
}
var juan = new Person("juan","juan","juan@gmail.com","juan","noWayYesWay");
juan.addDay2(new Workout("test","cardio","101","yes"));
writePerson(juan);

/*
function getPeople(){
        var peopleList = [];
        //var leadsRef = database.ref('users');
        var leadsRef = database.ref('users');
        console.log(leadsRef);
        console.log("testing");
        //print(leadsRef);
        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childData = childSnapshot.val(); //childData is just the child of the information that is going in
              peopleList.push(childData);
              //console.log(childData);
              //console.log("hm");
            });
        });
        console.log(leadsRef);
        return peopleList;
        //------------------------------------------
} */

/*
function findUserName(name) //enter a name and returns either true or false depending if the info is within the database
{
        var databaseInfo = database.ref('users');
        databaseInfo.on('value', function(snapshot) {
          databaseInfoDict = snapshot.val(); //WILL HAVE TO TRIM THE STRING AND MAKE SURE THAT IT IS A STRING THAT IS BEING PASSED INTO HERE
          for(var key in databaseInfoDict){
            if(key.trim() === name)
              return true;
          }
        });
        return false; //false if nothing is found
} */

function returnDictOfEmailPass()
{
  var emailList = {};
  var databaseInfo = database.ref("users");
  databaseInfo.on("value", function(snapshot) {
    var databaseInfo = snapshot.val()
    for(var key in databaseInfo)
    {
      emailList[databaseInfo[key].email] = [databaseInfo[key].password,key]; //where 0 is the password and 1 is the key
    }
  });
  return emailList;
}

function returnUserNameList()
{
  var userNameList = [];
  var databaseInfo = database.ref("users");
  databaseInfo.on("value", function(snapshot) {
    var databaseInfo = snapshot.val()
    for(var key in databaseInfo)
    {
      userNameList.push(databaseInfo[key].userName); //where 0 is the password and 1 is the key
    }
  });
  return userNameList;
}

//console.log(returnUserNameList());
//console.log(returnDictOfEmailPass());

function findUserPassword(name) //this will find the password and return it
{
  var location = database.ref('users/'+name);
  location.on('value', function(snapshot) {
    databaseInfoDict = snapshot.val();
    return databaseInfoDict.password;
  });
}

function registerUser(username,password)
{
  if(findUserName==true) //this means that the username is taken
    return false;
  else {
    //.........
  }
}


// ------------------------------------------------------------
// this will start how JS will interact with the HTML packages

var check=false;

(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
        check = true; //this will be used in order to make sure that the forms are all completed
      }, false);
    });
  }, false);
})();


/*

$("#logINButton").bind("click", function () {
  //$(".test").show();
    //console.log( document.getElementsByClassName("logInEmailInput")[0].value );
    document.location.href="youtube.com";
    //if(findUserName($("#exampleInputEmail1").value) && (typeof $("#exampleInputEmail1").value !== "undefined")); //if the username works then do this gonna have to change this for EMAILS
    if(!(typeof document.getElementsByClassName("logInEmailInput")[0].value === "undefined"))
    {
      console.log("testing123");
      //sessionStorage.setItem("UserEmail",$("#exampleInputEmail1").value);
      //console.log(sessionStorage.getItem("mySharedData"));
      //document.location.href = "home_tangerine.html";
    }
},false);



window.onload=function(){
    //$(".valid-feedback")[0].style.display="none";
    //$(".text-danger").style.display="inline";
    //$(".test").style.display="none";

      $("#signUpButton").bind("click", function() {
        console.log("SEND HELP PLEASE");
      });

}
 */
 /*
 window.onload=function(){
     (function (global) {
         document.getElementById("logINButton").addEventListener("click", function () {
             if(findUserName(document.getElementById("exampleInputEmail1").value)); //if the username works then do this
             {
               //sessionStorage.setItem("UserEmail",document.getElementById("exampleInputEmail1"));
               console.log(sessionStorage.getItem("mySharedData"));
               document.location.href = "home_tangerine.html";
             }
         }, false);
     }(window));

     if(sessionStorage.getItem(""))
 } */

 window.onload=function(){
     //$(".valid-feedback")[0].style.display="none";
     //$(".text-danger").style.display="inline";
     //$(".test").style.display="none";
     var emailList = returnDictOfEmailPass();
     var userNameList = returnUserNameList();

     $("#logINButton").bind("click", function () {

       document.getElementById("failemail").style.display = "none";
       document.getElementById("failpass").style.display = "none";

       var emailInput = document.getElementById("exampleInputEmail1.1").value;
       //console.log(emailInput);
       var re = new RegExp("[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*")
       if(!(emailInput === "undefined") && re.test(emailInput))
       {
        if(emailInput in emailList)
        {
          if(document.getElementById("exampleInputPassword1.1").value === emailList[emailInput][0])
          {
            sessionStorage.setItem("username",emailList[emailInput][1]); //this will send the information into the server which can be retrieve with later
          }
          else
          {
                document.getElementById("failpass").style.display = "inline";
          }
        }
        else
        {
          document.getElementById("failemail").style.display = "inline";
        }

      }
     });

     var registeredEmail = false;
     var registeredUsername = false;

     //this is for the registering for the username input to check that it is notbeing used
     $("#validationCustomUsername").bind("keyup", function(event) {
      console.log(document.getElementById("validationCustomUsername").value);
      var userInputInUserName = document.getElementById("validationCustomUsername").value;
      //if(userInputInUserName)
     });

     //this is for the registering for the email input to check that it is not being used
     $("#exampleInputEmail2.1").bind("keyup", function(event) {
      console.log(document.getElementById("exampleInputEmail2.1").value);
      var userInputEmailForReg = document.getElementById("exampleInputEmail2.1").value;

     });

     console.log(emailList);
     console.log(userNameList);
     $("#signUpButton").bind("click", function() {
        //console.log("SEND HELP PLEASE");
        //bind to the username input textbox to check if the username is available as well as the email to check if that is available

        var userInput
     });
}
