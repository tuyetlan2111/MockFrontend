import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { RestService } from '../rest.service';

@Injectable()
export class AuthService {
  user = null;
  constructor(
    public rest:RestService,
    private router: Router,
    private userService: UserService
  ) {
      // logged in so return true
      this.user = userService.getUserCurent();
  }

  isLoggedIn(): boolean {
   if (this.user !=  null) {
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
      if (user.role === 1) {
        return true;
      }
    }
  }
  login(email,password) : Promise<{}>{{
      return new Promise<{}>((resolve, reject) => {
    
        this.userService.getUserLogin(email,password).then((user) => {
          this.user = user
          resolve(this.user);
         })
        });
    }
  }
  updateUser(user:User) : Promise<{}>{{
    return new Promise<{}>((resolve, reject) => {
      this.rest.updateUser(user).subscribe((data: {}) => {
        this.user = data;
        resolve(data);
      });
    });
  }
  }
  updatePassword(old_password, password) : Promise<{}>{{
    return new Promise<{}>((resolve, reject) => {
      this.rest.updatePassword(old_password, password).subscribe((data: {}) => {
        console.log(data);
        resolve(data);
      });
      });
    }
  }
  register(user:User) : Promise<{}>{{
    return new Promise<{}>((resolve, reject) => {
      this.userService.register(user).then((user) => {
        this.user = user;
        resolve(this.user);
       })
      });
    }
  }
}
