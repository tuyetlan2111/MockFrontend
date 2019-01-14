import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";

import { ProductService } from "../../services/product.service";
import { Product } from '../../models/product';
import { IToastrService } from '../../services/toastr.service';
@Component({
  selector: 'app-detail',
  templateUrl: './product_detail.component.html',
  styleUrls: ['./product_detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() fatherName: string;
  constructor(private http: HttpClient, 
    private router: Router ,
    private route: ActivatedRoute,
    private productService: ProductService,
    private toastrService : IToastrService,
  ) { 
    
  }
  id ; product; number = 0;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
    this.getDetailProduct(this.id);
  }
  getDetailProduct(id){
    this.productService.getProduct(id).then(() => {
      this.product = this.productService.productCurrent;
     })
  }
  addProductToCart(product){
    this.productService.addToCart(product);
    console.log(product)
   }
   addNumber(){
     if(this.number <10)
      this.number++;
   }

   mineNumber(){
    if(this.number > 1)
    this.number--;
   }
}
