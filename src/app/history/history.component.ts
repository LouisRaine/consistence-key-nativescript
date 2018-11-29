import { Component } from "@angular/core";
import {LocalData} from "~/app/services/local-data";
import { Subscription } from 'rxjs';

@Component({
    selector: "History",
    moduleId: module.id,
    templateUrl: "./history.component.html",
    styleUrls: ["./history.css"]
})
export class HistoryComponent {

    workouts: any[];

    workoutAdded: Subscription;

    currentStreak: number = 0;

    constructor(
        private localData: LocalData
    ) {
    }

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

    getColor(workoutType) {
        switch (workoutType) {
            case 'weightTraining':
                return '#fdd68b';
            case 'cardio':
                return '#6f8c9e';
        }
    }

    setCurrentStreak(workouts) {
        if (workouts) {
            this.currentStreak = workouts.length;
        }
    }

    clearWorkouts() {
        this.localData.clear()
    }
}
