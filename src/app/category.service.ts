import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.db
      .list("/categories", ref => ref.orderByChild("name"))
      .snapshotChanges()
      .pipe(
        map(action => {
          return action.map(item => {
            const $key = item.payload.key;
            const data = { $key, ...item.payload.val() };
            return data;
          });
        })
      );
  }
}
