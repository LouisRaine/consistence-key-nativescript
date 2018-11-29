import { Component } from "@angular/core";
import {LocalData} from "~/app/services/local-data";
// import * as moment from 'moment';

@Component({
    selector: "LogWorkout",
    moduleId: module.id,
    templateUrl: "./log-workout.component.html",
    styleUrls: ["./log-workout.css"]
})
export class LogWorkoutComponent {

    workoutVisible: boolean = true;
    choicesVisible: boolean = false;

    constructor(
        private localDataService: LocalData,
    ) {
        this.localDataService.setup();
    }

    ngOnInit() {
        this.localDataService.loadData();
    }

    onWorkout() {
        this.workoutVisible = false;
        this.choicesVisible = true;
    }

    onLift() {
        console.log("on lift");
        let workout = {
            workoutType: 'weightTraining',
            datetime: "2018-11-28"//moment().toISOString()
        };
        this.localDataService.save(workout);
        this.workoutVisible = true;
        this.choicesVisible = false;
    }

    onCardio() {
        let workout = {
            workoutType: 'cardio',
            datetime: "2018-11-28"//moment().toISOString()
        };
        this.localDataService.save(workout);
        this.workoutVisible = true;
        this.choicesVisible = false;
    }
}
