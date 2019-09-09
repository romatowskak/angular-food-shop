import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth.service";
import { ShoppingCartService } from "src/app/shopping-cart.service";
import { Observable } from "rxjs";
import { ShoppingCart } from "src/app/models/shopping-cart";

@Component({
  selector: "bootstrap-navbar",
  templateUrl: "./bootstrap-navbar.component.html",
  styleUrls: ["./bootstrap-navbar.component.css"]
})
export class BootstrapNavbarComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    public auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }
}
