import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  user = null;
  constructor(
    
    private router: Router,
    private userService: UserService
  ) {
      // logged in so return true
      this.user = userService.getUserCurent();

  }

  isLoggedIn(): boolean {
   if (this.user !== null) {
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(["/"]);
  }

  getLoggedInUser(): User {
    return this.user;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    if (user != null) {
      if (user.isAdmin === "true") {
        return true;
      }
    }
  }
  login(email,password) : Promise<{}>{{
      return new Promise<{}>((resolve, reject) => {
        this.userService.getUserLogin(email,password).then(() => {
          this.user = this.userService.user;
          resolve(this.user);
         })
        });
    }
  }
}
