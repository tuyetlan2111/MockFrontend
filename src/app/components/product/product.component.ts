import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from "../../services/product.service";
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products : Product[];
  constructor(
    private http: HttpClient,
    public productService: ProductService
  )
   {   }
    ngOnInit() {
       this.productService.getProducts().then(() => {

        this.products = this.productService.products;

       })
  }
    
  changeicon(x) {
    x.classList.toggle("fas fa-star");
  }
  
}
