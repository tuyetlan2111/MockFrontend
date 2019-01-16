import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
import { Rating } from '../../models/rating';
import { ProductService } from "../../services/product.service";
import { Product } from '../../models/product';
import { User } from '../../models/user';
import { IToastrService } from '../../services/toastr.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from 'src/app/services/user.service';
import { BillingService } from "../../services/cart.service";

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
    private userService : UserService,
    private billdingService: BillingService,

  ) { 
    this.getRatingProduct("");
  }
  id ; product; number = 1; ratings;star = 0;
  rating : Rating = {}; user: User;
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
    // this.productService.addToCart(product);
    // console.log(product)

        var cartItem = {
          price: product.price,
          quantity: this.number,
          createdOn: new Date(),
          createdBy: this.user.id,
          changedOn: new Date(),
          changedBy: this.user.id,
          product: {
            id: product.id,
          },
          cart: {
            id: 1,
          }
        }
  
      this.billdingService.addProduct(cartItem)
        .subscribe(item => {});
        this.productService.addToCart(product);


   }
   addNumber(){
     if(this.number <10)
      this.number++;
   }
   mineNumber(){
    if(this.number > 1)
    this.number--;
   }

   getRatingProduct(id){
    this.productService.getRatingProduct(id).then(() => {
      this.ratings = this.productService.ratingsCurrent;
     })
   }
   addRatingProduct(){
     this.user = this.userService.user;
     if(this.user == null){
      this.toastrService.showSuccess("Please login to rating product","Rating fail require login"); 
      return;
     }
     if(this.star == 0){
      this.toastrService.showSuccess("Please check rating product","Rating fail require add star"); 
      return;
     }
     this.rating.user = this.user;
     this.rating.stars = this.star;
     this.rating.product = this.product
     this.rating.createdBy = this.user.id;
     this.rating.changedBy = this.user.id;
     this.rating.createdOn =  new Date();
     this.rating.changedOn =  new Date();

     console.log(this.rating)
      this.productService.addRatingProduct(this.rating).then(() => {
      this.ratings = this.productService.ratingsCurrent;

      this.toastrService.showSuccess("Rating on product susscess full!!","Rating done"); 

     })
  }
  setStar(star){
    //this.rating.stars = star
    this.star = star;
    console.log(star)
  }

}
