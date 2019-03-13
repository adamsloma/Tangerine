// Person class is a tree that stores all user data
export default class Person {
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

    addDay(workoutList){
      var currentDate = new Date();
      this._schedule[currentDate] = workoutList;
      }

}
/*
export default class Workout {
    constructor(title, type, difficulty, details) {
        this.title = title;             // str, a title for the workout
        this.type = type;               // str, the type of workout (options are "weightlifting", "cardio", "HIIT")
        this.difficulty = difficulty;   // int, the 101 stuff
        this.details = details;         // the instructions required to actually do the workout
    }
} */
