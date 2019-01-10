import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { user } from "../models/user";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private userService: UserService
  ) {
   // user = userService .getUsers();
  }

  isLoggedIn(): boolean {
   //if (user !== null) {
      return true;
    //}
  }

  // logout() {
  //   this.loggedUser = null;
  //   this.firebaseAuth.auth.signOut().then(res => this.router.navigate(["/"]));
  // }

  // createUserWithEmailAndPassword(emailID: string, password: string) {
  //   return this.firebaseAuth.auth.createUserWithEmailAndPassword(
  //     emailID,
  //     password
  //   );
  // }

  // getLoggedInUser(): User {
  //   const loggedUser: User = new User();
  //   const user = this.firebaseAuth.auth.currentUser;

  //   if (user) {
  //     this.userDetails = user;
  //     if (user != null) {
  //       loggedUser.$key = user.uid;
  //       loggedUser.userName = user.displayName;
  //       loggedUser.emailId = user.email;
  //       loggedUser.phoneNumber = user.phoneNumber;
  //       loggedUser.avatar = user.photoURL;
  //       loggedUser.isAdmin = this.dbUser["isAdmin"];
  //     }
  //   } else {
  //     this.userDetails = null;
  //   }

  //   return loggedUser;
  // }

  // isAdmin(): boolean {
  //   const user = this.getLoggedInUser();
  //   if (user != null) {
  //     if (user.isAdmin === true) {
  //       return true;
  //     }
  //   }
  // }

  // signInRegular(email, password) {
  //   const credential = firebase.auth.EmailAuthProvider.credential(
  //     email,
  //     password
  //   );
  //   return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  // }

  // signInWithGoogle() {
  //   return this.firebaseAuth.auth.signInWithPopup(
  //     new firebase.auth.GoogleAuthProvider()
  //   );
  // }
}
