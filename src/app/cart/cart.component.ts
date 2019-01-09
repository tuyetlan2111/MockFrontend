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
product:any;
count:number = 0;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.showConfig();
  }
  configUrl = 'https://www.jasonbase.com/things/2RQn.json';
  getConfig() {
    return this.http.get(this.configUrl);
  }

  showConfig() {
    this.getConfig()
      .subscribe(data => {
        this.product = data;
        console.log(this.product);
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
