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
      this._schedule[getDate()] = workoutList;
      }

    /* THESE FUNCTIONS ARE NOT USEFUL
    turnDictIntoList(dict) //this does what it says, turns a dictionary into a list in order to sort it when needed
    {
      var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
        });
    }
    // Sort the array based on the first element
    sortByKey()
    {
      items.sort(function(first, second) {
        return first[0] - second[0];
      });
    } */

    /* NOT NEEDED ANYMORE
    // week is a so-called "dictionary"
    // each value in the key-value pair represents a day, which is a "dictionary of workout instances"
    addEmptyWeek() {
        for (let i = 0; i < 7; i++) {
            this.addDay({})
        }
    }

    // month isn't even anything. it's just four weeks ...... this depends on the month tho
    addEmptyMonth() {
        for (let i = 0; i < 4; i++) {
            this.addEmptyWeek()
        }
    } */
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
        firstName: person.firstName,
        lastName: person.lastName,
        password: person.password,
        //level: person.level,
        schedule: ""
    });
}

writePerson(new Person("jose","andrade","testing@gmail.com","jfandra1","1"));

// NOT WORKING
/* WILL REMOVE
function writePersonSchedule(path, s) { // assuming the path refers to the location in the database that we want to place s
    // assuming s is an object (a dictionary)
    for (let k in s) { // for each key in s
        if (s.hasOwnProperty(k) === false) {
            return
        }
        // if the type of the object at the specific key is a string
        // that means we're at the deepest level of the s object's structure
        if (typeof s[k] === 'string') {
            database.ref(path + key + '/').set(s[k]); // publish the key value pair at the specified path
        } else {
            console.log('recursion reached');
            writePersonSchedule(path + k + '/', s[k]) // if it's not a string, it's an object and we must recur a level deeper
        }
    }
}*/

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
}


function findUserPassword(name) //this will find the password and return it
{
  var location = database.ref('users/'+name);
  location.on('value', function(snapshot) {
    databaseInfoDict = snapshot.val();
    //console.log(databaseInfoDict.password);
    return databaseInfoDict.password;
  });
}

function logInUser(username,password)
{
  if(findUserName==true)
    {
      if(password === findUserPassword(username))
        return 1; //this means that the user is in the system and had the correct password.
      else {
        return 0; // this means that the user is in the system but the user had the wrong password
      }
    }
  else {
    return -1; //this means there is no user with that name
  }
}

function registerUser(username,password)
{
  if(findUserName==true) //this means that the username is taken
    return false;
  else {
    //.........
  }
}

/*
var stephan = new Person("jose", "joseisawesome", "2");
stephan.addEmptyMonth();
console.log(stephan._schedule);
writePerson(stephan);*/
// getPersons();
//findUserPassword("adam");

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


window.onload=function(){
    //$(".valid-feedback")[0].style.display="none";
    //$(".text-danger").style.display="inline";
    //$(".test").style.display="none";
        $("#logINButton").bind("click", function () {
          //$(".test").show();
          console.log( document.getElementsByClassName("logInEmailInput")[0].value );
          //document.location.href="youtube.com";
            //if(findUserName($("#exampleInputEmail1").value) && (typeof $("#exampleInputEmail1").value !== "undefined")); //if the username works then do this gonna have to change this for EMAILS
            if(!(typeof document.getElementsByClassName("logInEmailInput")[0].value === "undefined"))
            {
              console.log("testing123");
              //sessionStorage.setItem("UserEmail",$("#exampleInputEmail1").value);
              //console.log(sessionStorage.getItem("mySharedData"));
              //document.location.href = "home_tangerine.html";
            }
        });

      $("#signUpButton").bind("click", function() {
        console.log("SEND HELP PLEASE");
      });





}
