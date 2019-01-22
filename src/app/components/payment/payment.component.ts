import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { PaymentService } from 'src/app/services/payment.service';
import { CartItem } from 'src/app/models/cart_item';
import { OrderProduct } from 'src/app/models/order_product';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { IToastrService } from "../../services/toastr.service";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { OrderDetailComponent } from '../admin/order-detail/order-detail.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  total: number = 0;
  cartItems: CartItem[] =[];
  count: number = 0;
  paymentForm: FormGroup;
  submitted = false;
  user : User ={};
  get f() { return this.paymentForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private cartService: CartService,
    private cookieService : CookieService,
    private iToastrService : IToastrService,
    private router: Router,
    private paymentService : PaymentService,
    private productService : ProductService) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
    this.cartService.getCartItems().then((data)=>{
        this.cartItems = this.cartService.cartItems;
        this.getTotalPrice();
        console.log(this.cartItems);
        if(this.cartItems.length == 0){
          this.router.navigate(["/"]);
        }
    });
    console.log(this.cartItems);

    if(this.authService.isLoggedIn ){
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
    var order : OrderProduct = {}
    var payment : Payment = {};
    payment.address = this.f.address.value;
    payment.phone = this.f.phone.value;
    payment.name = this.f.name.value;
    payment.user = this.user;
    payment.changedBy = 1;
    payment.order = order;
    payment.changedOn = new Date();
    payment.createdBy = 1;
    payment.createdOn = new Date();
    payment.orderDate = new Date();
    payment.totalPrice = this.total;
    payment.status = 1;
    this.paymentService.addPayment(payment,this.cartService.getCookie()).then((data)=>{
      console.log(data);
      if(data==null){
        this.iToastrService.showFail("Cannot Check Out","Please contact us then check out");
      }else{
        this.iToastrService.showSuccess("Check Out Done","Please keep contact the order will delivery");
        this.cartService.createNewCookie();
        this.cartService.getCartItems().then((data)=>{
          this.router.navigate(["/"]);
        })
      }
  });
  }
  getTotalPrice() {
    this.total = 0;
    for (let i = 0; i < this.cartItems.length; i++) {
      this.total += this.cartItems[i].price * this.cartItems[i].quantity;
    }
  }
}
