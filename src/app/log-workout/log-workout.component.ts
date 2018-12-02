import { Component } from "@angular/core";
import {LocalData} from "~/app/services/local-data";
import * as moment from 'moment';
import * as toast from 'nativescript-toast';
import { Subscription } from "rxjs";
import { Workout } from "~/app/models/workout";

@Component({
    selector: "LogWorkout",
    moduleId: module.id,
    templateUrl: "./log-workout.component.html",
    styleUrls: ["./log-workout.css"]
})
export class LogWorkoutComponent {

    workoutAdded: Subscription;

    workoutVisible: boolean = true;
    choicesVisible: boolean = false;
    disableCardio: boolean = false;
    disableWeightTraining: boolean = false;

    constructor(
        private localDataService: LocalData,
    ) {
        this.localDataService.setup();
    }

    ngOnInit() {
        this.workoutAdded = this.localDataService.localDataUpdated$
            .subscribe((res) => {
                this.disableCardio = this.checkLogged('cardio');
                this.disableWeightTraining = this.checkLogged('weightTraining');
            });
            
        this.disableCardio = this.checkLogged('cardio');
        this.disableWeightTraining = this.checkLogged('weightTraining');
    }

    checkLogged(workoutType: string): boolean {
        let today = moment().format('YYYY-MM-DD');
        let storage = this.localDataService.loadData();

        if (storage.length == 0) return false;
        let lastWorkoutDate = moment(storage[0].datetime).format('YYYY-MM-DD');
        let lastWorkoutType = storage[0].workoutType;

        let secondedToLastWorkoutDate = '';
        let secondedToLastWorkoutType = '';
        if (storage.length > 1) {
            secondedToLastWorkoutDate = moment(storage[1].datetime).format('YYYY-MM-DD');
            secondedToLastWorkoutType = storage[1].workoutType;
        }
        
        if ((
                lastWorkoutDate == today && 
                lastWorkoutType == workoutType
            ) || (
                secondedToLastWorkoutDate == today && 
                secondedToLastWorkoutType == workoutType
            )
        ) {
            return true;
        } else {
            return false;
        }
    }

    onWorkout(): void {
        if (
            !this.disableCardio || 
            !this.disableWeightTraining
        ) {
            this.workoutVisible = false;
            this.choicesVisible = true;
        } else {
            this.presentCantLogToast();
        }
    }

    onWeightTraining(): void {
        if (!this.disableWeightTraining) {
            let workout: Workout = {
                workoutType: 'weightTraining',
                datetime: moment().toISOString(),
                workoutDesc: 'Weight Training'
            };
            this.localDataService.save(workout);
            this.presentLoggedToast();        
        } else {
            this.presentCantLogToast();
        }
        this.workoutVisible = true;
        this.choicesVisible = false;
    }

    onCardio(): void {
        if (!this.disableCardio) {
            let workout: Workout = {
                workoutType: 'cardio',
                datetime: moment().toISOString(),
                workoutDesc: 'Cardio'
            };
            this.localDataService.save(workout);
            this.presentLoggedToast()
        } else {
            this.presentCantLogToast();
        }
        this.workoutVisible = true;
        this.choicesVisible = false;
    }

    presentLoggedToast() {
        toast.makeText(
            'Logged workout!', 
            '1000'
        ).show();
    }

    presentCantLogToast() {
        toast.makeText(
            "You've Already Logged Your Workout", 
            '1000'
        ).show();
    }

}
