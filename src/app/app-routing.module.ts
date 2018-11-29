import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LogWorkoutComponent } from "./log-workout/log-workout.component";
import { HistoryComponent } from "./history/history.component";

export const COMPONENTS = [LogWorkoutComponent, HistoryComponent];

const routes: Routes = [
    { path: "", redirectTo: "/(logWorkoutTab:log-workout//historyTab:history)", pathMatch: "full" },
    { path: "log-workout", component: LogWorkoutComponent, outlet: "logWorkoutTab" },
    { path: "history", component: HistoryComponent, outlet: "historyTab" },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
