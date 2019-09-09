import { Component } from "@angular/core";
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "food-store";

  constructor(
    private auth: AuthService,
    router: Router,
    private userService: UserService
  ) {
    this.auth.user$.subscribe(user => {
      if (!user) return;
      this.userService.save(user);

      let returnUrl = localStorage.getItem("returnUrl");
      if (!returnUrl) return;
      localStorage.removeItem("returnUrl");
      router.navigateByUrl(returnUrl);
    });
  }
}
