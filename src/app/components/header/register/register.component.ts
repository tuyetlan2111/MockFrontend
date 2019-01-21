import { Component, OnInit,  EventEmitter, Output,ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import { IToastrService } from "../../../services/toastr.service";
import { User } from "../../../models/user";
import {Md5} from "md5-typescript";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user : User;
  @ViewChild('btCloseRegister') btCloseRegister: ElementRef;
     get fr() { return this.registerForm.controls; }

  constructor(
    private toastrService : IToastrService,
    private formBuilder: FormBuilder,
    public authService: AuthService,) { 
    
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

   onSubmitRegister() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.register(this.registerForm.value.email,this.registerForm.value.password);
  }
  register(email,password){
    var user: User = {};
    user.password = Md5.init(password);
    user.email = email
    user.changedBy =1;
    user.createdBy = 1;
    user.changedOn = new Date();
    user.createdOn = new Date();
    user.role = 2;  
    user.orderCount = 0;
    user.signupDate =  new Date();
    user.city = ""
    user.country = ""
    user.lastName = this.fr.lastName.value;
    user.firstName = this.fr.firstName.value;
    this.authService.register(user).then(() => {
      this.user = this.authService.user;
      if(this.user !== null){
        console.log(this.user)
        this.toastrService.showSuccessWithTimeout("Register done !!", "Well come  "+ this.user.firstName + " " + this.user.lastName, 3000)
        this.closeModal();
      }else{
        this.toastrService.showFail('Error register', 'Email is exists!');
      }
      
     })
    this.user = this.authService.user;
  }

    //call this wherever you want to close modal
    private closeModal(): void {
      this.btCloseRegister.nativeElement.click();
    }
  
}
