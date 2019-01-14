import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { RestService } from '../rest.service';

@Injectable()
export class UserService {

  constructor(public rest:RestService) {

  }
  user : User = null;
  getUserLogin(email,password) : Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
            this.rest.getUser(1).subscribe((data: {}) => {
              this.user = <User>data;
              localStorage.setItem('currentUser', JSON.stringify(this.user));
              console.log(data);
              resolve(this.user);
            });
      });
  }
  getUserCurent() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if( localStorage.getItem('currentUser')){
      this.user = currentUser;
      return this.user;

    }
    return null;
  }
}
