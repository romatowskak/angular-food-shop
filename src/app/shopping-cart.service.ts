import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { Product } from "./models/product";
import { take, map } from "rxjs/operators";
import { ShoppingCart } from "./models/shopping-cart";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    let cart = this.db
      .object("/shopping-carts/" + cartId)
      .snapshotChanges()
      .pipe(
        map((action: any) => {
          const items = action.payload.val().items;
          return new ShoppingCart(items);
        })
      );
    return cart;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    const result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        let quantity = ((item && item.quantity) || 0) + change;
        if (quantity === 0) item$.remove();
        else
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          });
      });
  }
}
