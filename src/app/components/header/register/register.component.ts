import { Component, OnInit,  EventEmitter, Output,ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../../services/auth.service";
import { ToastrService } from "../../../services/message.service";
import { User } from "../../../models/user";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  user : User;
  toastrService : ToastrService;
  @ViewChild('btCloseRegiter') btCloseRegiter: ElementRef;
     // convenience getter for easy access to form fields
     get fr() { return this.registerForm.controls; }

  constructor(
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

    this.authService.login(email,password).then(() => {
      this.user = this.authService.user;
      if(this.user !== null){
        this.closeModal();
      }else{
        this.toastrService.error('Error login', 'Email or password not match!');
      }
      
     })
    this.user = this.authService.user;
  }

    //call this wherever you want to close modal
    private closeModal(): void {
      this.btCloseRegiter.nativeElement.click();
    }
  
}
