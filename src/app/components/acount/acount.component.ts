import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user"
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.scss']
})
export class AcountComponent implements OnInit {
  user: User;
  constructor( public authService: AuthService,
    private router: Router,) { }
  public show:boolean = false;

  ChangePass() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    // if(this.show)  
    //   this.buttonName = "Hide";
    // else
    //   this.buttonName = "Show";
  }
  ngOnInit() {
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
  }

}
