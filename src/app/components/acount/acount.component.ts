import { Component, OnInit ,ViewChild} from '@angular/core';
import {User} from "../../models/user"
import { AuthService } from "../../services/auth.service";
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from "@angular/router";
import {Md5} from "md5-typescript";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IToastrService } from "../../services/toastr.service";
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-acount',
  templateUrl: './acount.component.html',
  styleUrls: ['./acount.component.scss']
})
export class AcountComponent implements OnInit {
  accoutForm: FormGroup;  passForm: FormGroup;

  submitted = false;
  submitted_pass = false;
  is_not_match = false;
  user: User;
  OrderData:any = [];
  OrderDetail:any = [];
  
    // convenience getter for easy access to form fields
    get f() { return this.accoutForm.controls; }
    get fp() { return this.passForm.controls; }

  constructor( public authService: AuthService,
               private formBuilder: FormBuilder,
               public toastrService : IToastrService,
               public rest:RestService, 
               private route: ActivatedRoute,
               private router: Router) { }
  @ViewChild('dataTable') table;
  dataTable: any;
  public show:boolean = false;

  ngOnInit() {
    console.log(Md5.init('123456'));
    this.accoutForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required]
    });
    this.passForm = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
    this.getOrder();
  }
  onSubmitUpdate() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.accoutForm.invalid) {
        return;
    }
  this.updateUser();
  }
  onSubmitPassUpdate() {
    this.submitted_pass = true;

    // stop here if form is invalid
    if (this.passForm.invalid) {
        return;
    }
    if(this.fp.password.value != this.fp.rePassword.value){
      this.is_not_match = true
      return;
    }else{
      this.is_not_match = false
    }
  this.updatePassword();
  }

  updateUser(){

    this.user = this.authService.user;
    this.user.firstName = this.f.firstName.value 
    this.user.lastName = this.f.lastName.value 
    this.user.city = this.f.city.value 
    this.user.country = this.f.country.value 

    // this.authService.updateUser(this.user).then(() => {
    //   this.user = this.authService.user;
    //   this.toastrService.showSuccessWithTimeout("Change done !!", "Well come "+ this.user.firstName + " " + this.user.lastName, 3000)
    //  })

     this.rest.updateUser( this.user).subscribe((result) => {
           this.toastrService.showSuccessWithTimeout("Change done !!", "Well come "+ this.user.firstName + " " + this.user.lastName, 3000)

    }, (err) => {
      console.log(err);
    });
  }
  updatePassword(){

    var old_password = (Md5.init(this.fp.old_password.value))
    var password = (Md5.init(this.fp.password.value))

    this.authService.updatePassword(this.user.email,old_password, password).then((data) => {
      if(JSON.stringify(data)!=="{}"){
        this.toastrService.showSuccessWithTimeout("Change done !!", "Password is chang susscess full!", 3000)
      }else{
        this.toastrService.showFail("Change fail !!", "Password is not change!");
      }
     })
  }
  getOrder(){
      this.OrderData = [];
      this.rest.getOrders().subscribe((data: {}) => {
        this.OrderData = data;
        // console.log(data);
      });
      this.dataTable = $(this.table.nativeElement);
      this.dataTable.DataTable();
      this.rest.getOrderDetail(this.route.snapshot.params['id']).subscribe((data: {}) => {
        console.log(data);
        this.OrderDetail = data;
      });
  }
}
