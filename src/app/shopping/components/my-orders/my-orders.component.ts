import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/order.service";
import { AuthService } from "src/app/auth.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"]
})
export class MyOrdersComponent implements OnInit {
  orders$;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orders$ = this.authService.user$.pipe(
      switchMap(u => this.orderService.getOrdersByUsers(u.uid))
    );
  }

  ngOnInit() {}
}
