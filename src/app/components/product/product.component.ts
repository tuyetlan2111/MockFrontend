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
  }
    
  changeicon(x) {
    x.classList.toggle("fas fa-star");
  }
  addProductToCart(product){
    this.productService.navbarCartCount++;
  // this.toastrService.success('Add to Cart done', product.title);
   this.toastrService.showSuccessWithTimeout("Data shown successfully !!", "Notification", 100000)

  }
}
