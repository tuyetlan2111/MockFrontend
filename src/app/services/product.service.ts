import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Rating } from '../models/rating';
import { AuthService } from './auth.service';
import { IToastrService } from './toastr.service';
import { RestService } from '../rest.service';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cart_item';


@Injectable()
export class ProductService {

	products : Product[];
	productCurrent: Product;
	ratingsCurrent: Rating[];
	cartItem : CartItem[];
	constructor(public rest:RestService, private iToastrService: IToastrService){
		this.getProducts();
	}
	

	getProducts(): Promise<{}> {
		return new Promise<{}>((resolve, reject) => {
			this.rest.getProducts().subscribe((data: {}) => {
			  this.products = <Product[]>data;
			  //console.log(this.products);
			  resolve(this.products);
			});

		});
	}

	getProduct(id): Promise<{}>  {
		return new Promise<{}>((resolve, reject) => {
			this.rest.getProduct(id).subscribe((data: {}) => {
			  this.productCurrent = <Product>data;
			 // console.log(this.productCurrent);
			  resolve(this.productCurrent);
			});

		});
	}
	// rating for product
	getRatingProduct(id): Promise<{}>  {
		return new Promise<{}>((resolve, reject) => {
			this.rest.getRatingProduct(id).subscribe((data: {}) => {
			  this.ratingsCurrent = <Rating[]>data;
			  //console.log(this.ratingsCurrent);
			  resolve(this.ratingsCurrent);
			});
		});
	}
	addRatingProduct(rating: Rating): Promise<{}>  {
		return new Promise<{}>((resolve, reject) => {
			this.rest.addRatingProduct(rating).subscribe((data: {}) => {
			  resolve(data);
			});

		});
	}

}

