import { Component } from "@angular/core";
import { LocalData } from "~/app/services/local-data";
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { Workout } from "~/app/models/workout";

@Component({
    selector: "History",
    moduleId: module.id,
    templateUrl: "./history.component.html",
    styleUrls: ["./history.css"]
})
export class HistoryComponent {

    workouts: Workout[];

    workoutAdded: Subscription;

    currentStreak: number = 0;

    daysText: string = '';

    todaysWorkoutNotYetLogged: boolean = true;

    constructor(
        private localData: LocalData
    ) { }

    ngOnInit(): void {
        this.workoutAdded = this.localData.localDataUpdated$.subscribe((res) => {
            this.workouts = [];
            this.workouts = this.localData.loadData();
            this.setCurrentStreak(this.workouts);
            console.log("workout added");
        });
        this.workouts = [];
        this.workouts = this.localData.loadData();
        this.setCurrentStreak(this.workouts);
    }

    getColor(workoutType: string): string {
        switch (workoutType) {
            case 'weightTraining':
                return 'yellow';
            case 'cardio':
                return 'grey-blue';
        }
    }

    setCurrentStreak(workouts: Workout[]): void {

        if (workouts && workouts.length != 0) {
            let today = moment().format('YYYY-MM-DD');
            let yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
            if (moment(workouts[0].datetime).format('YYYY-MM-DD') == yesterday) {
                this.todaysWorkoutNotYetLogged = false;
                today = yesterday;
            }
            let streak = 0;

            for (let workout of workouts) {
                let day = moment(workout.datetime).format('YYYY-MM-DD');
                if (day == moment(today, 'YYYY-MM-DD').subtract(streak, 'days').format('YYYY-MM-DD')) {
                    streak++
                } else if (
                    day == moment(today, 'YYYY-MM-DD').subtract(streak - 1, 'days').format('YYYY-MM-DD')
                ) {
                    //  streak count already added therefore do nothing
                } else {
                    break;
                }
            }
            this.currentStreak = streak;
        } else {
            this.currentStreak = 0;
        }
        this.daysText = this.days();
    }

    days() {
        switch (this.currentStreak) {
            case 1:
                return 'day';
            default:
                return 'days';
        }
    }

    formatDateDay(date: string): string {
        return moment(date).format('DD');
    }

    formatDateMonth(date: string): string {
        return moment(date).format('MMM');
    }

    clearWorkouts(): void {
        this.localData.clear()
    }
}
