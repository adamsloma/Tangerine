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
        this._schedule[this.count+1] = workoutList;
        this.count += 1;
    }

    addDay2(workoutList){
      this._schedule[getDate()] = workoutList;
      }

    turnDictIntoList(dict) //this does what it says, turns a dictionary into a list in order to sort it when needed
    {
      var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
        });
    }
    // Sort the array based on the second element
    sortByKey()
    {
      items.sort(function(first, second) {
        return first[0] - second[0];
      });
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

        this.count += 1;
    }
    }

    // month isn't even anything. it's just four weeks ...... this depends on the month tho
    addEmptyMonth() {
        for (let i = 0; i < 4; i++) {
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
var database = firebase.database();

// TODO: implement Person, Schedule and Workout classes to push and pull from Firebase
// TODO: implement exception handling for new classes
// TODO: implement writing to Database ---- done?
// TODO: implement reading from Database---- Done
// TODO: fix schedule component so that it's written to the database

function writePerson(person) {
    database.ref('users/' + person.uname).set({
        password: person.password,
        level: person.level,
        schedule: ""
    });

    // writePersonSchedule('users/' + person.uname + '/schedule/', person._schedule)
}

// NOT WORKING
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
            writePersonSchedule(path + key + '/', s[key]) // if it's not a string, it's an object and we must recur a level deeper
        }
    }
}


function getPersons(){
        var peopleList = [];
        var leadsRef = database.ref('users');
        leadsRef.on('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var childData = childSnapshot.val(); //childData is just the child of the information that is going in
              peopleList.push(childData);
              console.log(childData);
            });
        });
        return peopleList;
        console.log(leadsRef);
}

var stephan = new Person("jose", "joseisawesome", "2");
stephan.addEmptyMonth();
console.log(stephan._schedule);
writePerson(stephan);
// getPersons();