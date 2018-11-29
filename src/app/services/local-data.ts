import {Injectable} from "@angular/core";
import * as ApplicationSettings from "application-settings";
import { Subject } from 'rxjs';

@Injectable()
export class LocalData {

  storage: any;

  private localDataUpdatedSource = new Subject<string>();
  localDataUpdated$ = this.localDataUpdatedSource.asObservable();

  constructor(
  ) { }

  setup() {
      this.storage = JSON.parse(ApplicationSettings.getString("data", "[]"));
  }

  loadData() {
      return this.storage = JSON.parse(ApplicationSettings.getString("data", "[]"));
  }

  save(workout) {
      this.storage = this.loadData();
      this.storage.push(workout);
      ApplicationSettings.setString("data", JSON.stringify(this.storage));
      this.localDataUpdatedSource.next("workoutSaved");
  }

  clear() {
      let empty = [];
      ApplicationSettings.setString("data", JSON.stringify(empty));
      this.localDataUpdatedSource.next("workoutsCleared");
  }

}
