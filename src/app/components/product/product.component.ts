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
  product;
  constructor(
    private http: HttpClient,
    public productService: ProductService
  )
   { 
    this.products = this.productService.getProducts();
    //console.log(this.products);
  }
    ngOnInit() {
      // this.productService.getProducts().subscribe((data: {}) => {
			//   this.products = <Product[]>data;
			//   console.log(this.products);
			// });
  }
    
  changeicon(x) {
    x.classList.toggle("fas fa-star");
  }
  
}
