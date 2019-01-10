import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { RestService } from '../rest.service';

@Injectable()
export class UserService {

  constructor(public rest:RestService) {

  }
  user : User = null;
  getUserLogin(email,password) {
    this.rest.getUser(1).subscribe((data: {}) => {
      this.user = <User>data;
    });
    return this.user;
  }
  getUserCurent() {
    return this.user;
  }
}
