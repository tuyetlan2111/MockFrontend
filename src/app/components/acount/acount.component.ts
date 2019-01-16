import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user"
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import {Md5} from "md5-typescript";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IToastrService } from "../../services/toastr.service";

@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.scss']
})
export class AcountComponent implements OnInit {
  accoutForm: FormGroup;
  submitted = false;
  user: User;
    // convenience getter for easy access to form fields
    get f() { return this.accoutForm.controls; }
  constructor( public authService: AuthService,
               private formBuilder: FormBuilder,
               public toastrService : IToastrService,
               private router: Router,) { 
    }
  public show:boolean = false;

  ngOnInit() {
    console.log(Md5.init('12345'));
    this.accoutForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
  }
  onSubmitUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.accoutForm.invalid) {
        return;
    }
  this.updateUser(this.user);
  }

  updateUser(user:User){
    user.password = (Md5.init(user.password))
    this.authService.updateUser(user).then(() => {
      this.user = this.authService.user;
      this.toastrService.showSuccessWithTimeout("Change done !!", "Well come "+ this.user.firstName + " " + this.user.lastName, 3000)
     })
    this.user = this.authService.user;
  }
}
