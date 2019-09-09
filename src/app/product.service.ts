import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product) {
    return this.db.list("/products").push(product);
  }
  getAll<T>() {
    return this.db
      .list<T>("/products")
      .snapshotChanges()
      .pipe(
        map(a =>
          a.map(p => {
            const value = <any>Object.assign({}, p.payload.val());
            value.key = p.key;
            return <T>value;
          })
        )
      );
  }

  get(productId) {
    return this.db.object("/products/" + productId).valueChanges();
  }

  update(productId, product) {
    return this.db.object("/products/" + productId).update(product);
  }

  delete(productId) {
    return this.db.object("/products/" + productId).remove();
  }
}
