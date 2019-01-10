import { Injectable } from "@angular/core";
import { user } from "../models/user";
import { RestService } from '../rest.service';

@Injectable()
export class UserService {

  constructor(public rest:RestService) {
    this.getUsers();
  }
  users = [];
  getUsers() {
    this.rest.getProducts().subscribe((data: {}) => {
      console.log(data);
      //users = data;
    });
    return this.users;
  }

  // createUser(data: any) {
  //   data.location = this.location;
  //   data.createdOn = moment(new Date()).format("X");
  //   data.isAdmin = false;
  //   this.users.push(data);
  // }

  // isAdmin(emailId: string) {
  //   return this.db.list("clients", ref =>
  //     ref.orderByChild("email").equalTo(emailId)
  //   );
  // }

  // updateUser(user: User) {
  //   this.users.update(user.$key, user);
  // }

  // setLocation(lat, lon) {
  //   this.location.lat = lat;
  //   this.location.lon = lon;
  // }
}
