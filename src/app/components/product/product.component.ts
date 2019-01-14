import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from "../../services/product.service";
import { Product } from '../../models/product';
import { IToastrService } from '../../services/toastr.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products : Product[];
  product : any;
  constructor(
    private http: HttpClient,
    public productService: ProductService,
    private toastrService : IToastrService,
  )
   {   }
    ngOnInit() {
       this.productService.getProducts().then(() => {
        this.products = this.productService.products;
       })
       this.showConfig();
  }

  configUrl = 'http://localhost:8080/product/show';
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
    
  changeicon(x) {
    x.classList.toggle("fas fa-star");
  }
  addProductToCart(product){
   this.productService.navbarCartCount++;
   //console.log(product)
   this.toastrService.showSuccessWithTimeout("Add to Cart done !!", product.title , 50000)

  }
}
