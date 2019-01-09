import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private http: HttpClient)
   { }

  ngOnInit() {
    this.showConfig();
  }
  configUrl = 'https://www.jasonbase.com/things/2RQn.json';
  getConfig() {
    return this.http.get(this.configUrl);
  }
  product:any;
  showConfig() {
    this.getConfig()
      .subscribe(data => {
        this.product = data;
        console.log(this.product);
      });
  }

  changeicon(x) {
    x.classList.toggle("fas fa-star");
  }
  
}
