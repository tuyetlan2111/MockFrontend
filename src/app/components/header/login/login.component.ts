import { Component, OnInit,  EventEmitter, Output,ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import { IToastrService } from "../../../services/toastr.service";
import { User } from "../../../models/user";
import {Md5} from "md5-typescript";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  submitted = false;
  user: User;
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    @ViewChild('btCloseLogin') btCloseLogin: ElementRef;
  constructor( private formBuilder: FormBuilder,
               public authService: AuthService,
               public toastrService : IToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmitLogin() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    this.login(this.loginForm.value.email,this.loginForm.value.password);
  }

  login(email,password){
    password = (Md5.init(password))
    this.authService.login(email,password).then(() => {
      console.log(this.authService.user)
      if(this.authService.user != undefined){
        this.user = this.authService.user;
        this.toastrService.showSuccessWithTimeout("Login done !!", "Well come back "+ this.user.firstName + " " + this.user.lastName, 3000)
        this.closeModal();
      }else{
        this.toastrService.showFail('Error login', 'Email or password not match!');
      }
     })
  }
    //call this wherever you want to close modal
    private closeModal(): void {
      this.btCloseLogin.nativeElement.click();
    }
  
}
