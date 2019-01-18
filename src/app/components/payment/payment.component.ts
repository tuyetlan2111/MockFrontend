import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/models/cart_item';
import { Cart } from 'src/app/models/cart';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { IToastrService } from "../../services/toastr.service";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  total: number = 0;
  cartItems: any;
  count: number = 0;
  paymentForm: FormGroup;
  submitted = false;
  user : User ={};
  get f() { return this.paymentForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private cartService: CartService,
    private iToastrService : IToastrService,
    private router: Router,
    private productService : ProductService) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
    this.cartService.getCartItems().then((data)=>{
        this.cartItems = data;
        this.getTotalPrice();
        console.log(this.cartItems);
    });
    console.log(this.cartItems);

    if(this.authService.isLoggedIn){
      this.user = this.authService.getLoggedInUser()
    }else{
      this.router.navigate(["/"]);
    }
  }
  onSubmitPayment() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.paymentForm.invalid) { 
        return;
    }
    this.payment();
  }
  payment(){
    var payment : Payment = {};
    payment.address = this.f.address.value;
    payment.phone = this.f.phone.value;
    payment.name = this.f.name.value;
    payment.user = this.user;

    
  }
  getTotalPrice() {
    this.total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.total += this.cartItems[i].price * this.cartItems[i].quantity;
    }
  }
}
