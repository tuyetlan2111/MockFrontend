import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { RestService } from '../rest.service';

@Injectable()
export class UserService {

  constructor(public rest:RestService) {

  }
  getUserLogin(email,password) : Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
            this.rest.getUserLogin(email, password).subscribe((data: {}) => {
              console.log(JSON.stringify(data));
              if(JSON.stringify(data) == "{}"){
                console.log("data");
                resolve(null);
              }else{
                resolve(data);
                localStorage.setItem('currentUser', JSON.stringify(data));
              }
              reject();
            });
      });
  }
  
  updateUser(user:User) : Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
            this.rest.updateUser(user).subscribe((data: {}) => {
              console.log(data);
              resolve(data);
            });
      });
  }
  register(user:User) : Promise<{}> {
    return new Promise<{}>((resolve, reject) => {
            this.rest.register(user).subscribe((data: {}) => {
              localStorage.setItem('currentUser', JSON.stringify(data));
              console.log(data);
              resolve(data);
            });
      });
  }
  getUserCurent() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if( localStorage.getItem('currentUser')){
      return currentUser;

    }
    return null;
  }
}
