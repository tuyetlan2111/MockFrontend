import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '@angular/router/src/events';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

total:number = 0;
cartItem:any;
count:number = 0;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.showConfig();
  }
  configUrl = 'http://localhost:8080/cartItem/show';
  getConfig() {
    return this.http.get(this.configUrl);
  }

  showConfig() {
    this.getConfig()
      .subscribe(data => {
        this.cartItem = data;
        console.log(this.cartItem);
      });
  }
// totalPrice(){
//   this.total = 0;
//   for(let i = 0; i < this.product.length;i++){
//     this.total = this.product[i].id * 
//   }
// }

 add(){

 }
}
