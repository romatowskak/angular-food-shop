import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "src/environments/environment";
import { BootstrapNavbarComponent } from "./core/components/bootstrap-navbar/bootstrap-navbar.component";
import { LoginComponent } from "./core/components/login/login.component";
import { CheckOutComponent } from "./shopping/components/check-out/check-out.component";
import { MyOrdersComponent } from "./shopping/components/my-orders/my-orders.component";
import { OrderSuccessComponent } from "./shopping/components/order-success/order-success.component";
import { ProductsComponent } from "./shopping/components/products/products.component";
import { ShoppingCartComponent } from "./shopping/components/shopping-cart/shopping-cart.component";
import { AdminOrdersComponent } from "./admin/components/admin-orders/admin-orders.component";
import { AdminProductsComponent } from "./admin/components/admin-products/admin-products.component";

import { AuthService } from "./auth.service";
import { AuthGuardService } from "./auth-guard.service";
import { UserService } from "./user.service";
import { ProductFormComponent } from "./admin/product-form/product-form.component";
import { CategoryService } from "./category.service";
import { FormsModule } from "@angular/forms";
import { ProductService } from "./product.service";
import { CustomFormsModule } from "ng2-validation";
import { DataTableModule } from "ng-angular8-datatable";
import { ProductFilterComponent } from "./products/product-filter/product-filter.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { ShoppingCartService } from "./shopping-cart.service";
import { ProductQuantityComponent } from "./shopping/components/product-quantity/product-quantity.component";
import { OrderService } from "./order.service";
import { ShoppingCartSummaryComponent } from "./shopping/components/shopping-cart-summary/shopping-cart-summary.component";
import { ShippingFormComponent } from "./shopping/components/shipping-form/shipping-form.component";

@NgModule({
  declarations: [
    AppComponent,
    BootstrapNavbarComponent,
    LoginComponent,
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
      {
        path: "login",
        component: LoginComponent
      },

      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "my-orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "order-success/:id",
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },
      { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },
      {
        path: "admin-orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService]
      },

      {
        path: "product-form",
        component: ProductFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "product-form/:id",
        component: ProductFormComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "admin-products",
        component: AdminProductsComponent,
        canActivate: [AuthGuardService]
      }
    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
