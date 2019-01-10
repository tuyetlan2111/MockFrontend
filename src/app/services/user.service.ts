import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { RestService } from '../rest.service';

@Injectable()
export class UserService {

  constructor(public rest:RestService) {

  }
  user : User;
  getUser(id) {
    this.rest.getUser(id).subscribe((data: {}) => {
      this.user = <User>data;
    });
    return this.user;
  }
}
