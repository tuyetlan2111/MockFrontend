import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  user;
  constructor(
    
    private router: Router,
    private userService: UserService
  ) {
    this.user = userService.getUser(1);
  }

  isLoggedIn(): boolean {
   if (this.user !== null) {
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
    this.router.navigate(["/"]);
  }

  // createUserWithEmailAndPassword(emailID: string, password: string) {
  //   return this.firebaseAuth.auth.createUserWithEmailAndPassword(
  //     emailID,
  //     password
  //   );
  // }

  getLoggedInUser(): User {
    return this.user;
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    if (user != null) {
      if (user.is_admin === "true") {
        return true;
      }
    }
  }

  // signInRegular(email, password) {
  //   const credential = firebase.auth.EmailAuthProvider.credential(
  //     email,
  //     password
  //   );
  //   return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  // }
}
