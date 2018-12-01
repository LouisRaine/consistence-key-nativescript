import {Injectable} from "@angular/core";
import * as ApplicationSettings from "application-settings";
import { Subject } from 'rxjs';
import { Workout } from "~/app/models/workout";

@Injectable()
export class LocalData {

  private storage: Workout[];

  private localDataUpdatedSource = new Subject<string>();
  localDataUpdated$ = this.localDataUpdatedSource.asObservable();

  setup() {
      this.storage = JSON.parse(ApplicationSettings.getString("data", "[]"));
  }

  loadData(): Workout[] {
      return this.storage = JSON.parse(ApplicationSettings.getString("data", "[]"));
  }

  save(workout: Workout): void {
      this.storage = this.loadData();
      this.storage.push(workout);
      ApplicationSettings.setString("data", JSON.stringify(this.storage));
      this.localDataUpdatedSource.next("workoutSaved");
  }

  clear(): void {
      let empty = [];
      ApplicationSettings.setString("data", JSON.stringify(empty));
      this.localDataUpdatedSource.next("workoutsCleared");
  }

}
