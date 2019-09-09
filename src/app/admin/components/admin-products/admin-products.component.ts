import { Component, OnInit, OnDestroy } from "@angular/core";
import { ProductService } from "src/app/product.service";
import { Subscription } from "rxjs";
import { Product } from "src/app/models/product";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = productService
      .getAll<Product>()
      .subscribe(p => (this.filteredProducts = this.products = p));
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
