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
/* code that didn't work
var test = document.getElementById("test");
var dbRef = firebase.database().ref().child('text');
dbRef.on('value', snap => bigOne.innerText = snap.val());
console.log("Test");*/

// TODO: implement Person, Schedule and Workout classes to push and pull from Firebase
// TODO: implement exception handling for new classes
// TODO: implement reading from Database as well as writing

//example code that pushes up info to the cloud
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

writeUserData("244","adam","joseandrade","test.png"); //calling this function to test

class Person {
    // each person represents someone who has various things going on
    // users are authenticated by checking the 'uname' attribute against a list of
    // usernames
    // the password is then verified
    // super insecure by today's standards but that's fine

    constructor(uname, password, level) {
        this.uname = uname;         // str
        this.password = password;   // str
        this.fitnessLevel = level;  // int
        this.schedule = new Schedule();
    }
}

class Schedule {
    // schedule is represented by a list of so-called "units" that represent a day or set of days
    // each day contains a list of workouts
    // it's loosely built so that a 1 time workout, a week's worth of workouts, or a month's worth of workouts can all be represented
    // at the same depth level, instead of a super ugly nested dictionary

    constructor() {
        this.weeks = 0;
        this.days = 0;
        this.months = 0;
        this.schedule = [];
    }

    addDay(workoutList) {
        this.schedule.push(workoutList)
    }

    addEmptyWeek() {
        var week = {
            "mon": [],
            "tue": [],
            "wed": [],
            "thu": [],
            "fri": [],
            "sat": [],
            "sun": []
        }
        this.schedule.push(week)
    }

    addEmptyMonth() {
        for (var i = 0; i < 4; i++) {
            this.addEmptyWeek()
        }
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
