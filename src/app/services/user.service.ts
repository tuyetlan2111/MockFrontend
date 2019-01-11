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
              console.log(data);
              resolve(this.user);
            });
      });
  }
  getUserCurent() {
    return this.user;
  }
}
