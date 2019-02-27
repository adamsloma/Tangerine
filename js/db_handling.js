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

    constructor(uname, password, level) {
        this.uname = uname;         // str
        this.password = password;   // str
        this.level = level;         // int
        this._schedule = {};
        this.count = -1;
    }

    // a day is represented by a "dictionary" of Workout instances
    addDay(workoutList) {
        this._schedule[this.count+1] = workoutList
    }

    // week is a so-called "dictionary"
    // each value in the key-value pair represents a day, which is a "dictionary of workout instances"
    addEmptyWeek() {
        this._schedule[this.count+1] = {
            "mon": {},
            "tue": {},
            "wed": {},
            "thu": {},
            "fri": {},
            "sat": {},
            "sun": {}
        };
    }

    // month isn't even anything. it's just four weeks
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
// TODO: implement writing to Database
// TODO: implement reading from Database
// TODO: fix schedule component so that it's written to the database

function writePerson(person) {
    firebase.database().ref('users').push({
        username: person.uname,
        password: person.password,
        level: person.level,
        schedule: person._schedule
    });
}

var stephan = new Person("barryharrisfan420", "marx123", "5");
writePerson(stephan);

