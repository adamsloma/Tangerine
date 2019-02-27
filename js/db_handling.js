class Person {

    constructor(uname, password, level) {
        this.uname = uname;         // str
        this.password = password;   // str
        this.fitnessLevel = level;  // int
        // schedule is a nested dictionary of months, weeks, and days
        // at the lowest level, day is represented by a list of workouts, so the smallest, shallowest
        // instance of schedule is as a dict of lists
        this.schedule = new Schedule();
    }
}

class Schedule {
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
        for (i = 0; i < 4; i++) {
            this.addEmptyWeek()
        }
    }
}

