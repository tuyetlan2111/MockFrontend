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

	// NavbarCounts
	navbarCartCount = 0;
	products : Product[];
	productCurrent: Product;
	ratingsCurrent: Rating[];
	cartItem : CartItem[];
	constructor(public rest:RestService, private iToastrService: IToastrService){
		this.getProducts();
		this.calculateLocalCartProdCounts();
	}
	
  
	getCartItem(): Promise<{}> {
		return new Promise<{}>((resolve, reject) => {
			this.rest.getCartItem().subscribe((data: {}) => {
			  this.cartItem = <CartItem[]>data;
			  console.log(this.products);
			  resolve(this.products);
			});

		});
	}

	getProducts(): Promise<{}> {
		return new Promise<{}>((resolve, reject) => {
			this.rest.getProducts().subscribe((data: {}) => {
			  this.products = <Product[]>data;
			  console.log(this.products);
			  resolve(this.products);
			});

		});
	}

	getProduct(id): Promise<{}>  {
		return new Promise<{}>((resolve, reject) => {
			this.rest.getProduct(id).subscribe((data: {}) => {
			  this.productCurrent = <Product>data;
			  console.log(this.productCurrent);
			  resolve(this.productCurrent);
			});

		});
	}
	// rating for product
	getRatingProduct(id): Promise<{}>  {
		return new Promise<{}>((resolve, reject) => {
			this.rest.getRatingProduct(id).subscribe((data: {}) => {
			  this.ratingsCurrent = <Rating[]>data;
			  console.log(this.ratingsCurrent);
			  resolve(this.ratingsCurrent);
			});
		});
	}
	addRatingProduct(rating: Rating): Promise<{}>  {
		return new Promise<{}>((resolve, reject) => {
			this.rest.addRatingProduct(rating).subscribe((data: {}) => {
			  this.ratingsCurrent.push(rating);
			  console.log(this.ratingsCurrent);
			  resolve(this.ratingsCurrent);
			});

		});
	}



	/*
   ----------  Cart Product Function  ----------
  */

	// Adding new Product to cart db if logged in else localStorage
	addToCart(product: Product): void {
		setTimeout(() => {
			this.calculateLocalCartProdCounts();
			this.iToastrService.showSuccessWithTimeout("Add to Cart done !!", product.title , 50000)
		}, 500);
	}

// 	// Removing cart from local
// 	removeLocalCartProduct(product: Product) {
// 		const products: Product[] = JSON.parse(localStorage.getItem('avct_item'));

// 		for (let i = 0; i < products.length; i++) {
// 			if (products[i].productId === product.productId) {
// 				products.splice(i, 1);
// 				break;
// 			}
// 		}
// 		// ReAdding the products after remove
// 		localStorage.setItem('avct_item', JSON.stringify(products));

// 		this.calculateLocalCartProdCounts();
// 	}

	// Fetching Locat CartsProducts
	calculateLocalCartProdCounts(): Promise<{}>{
		return new Promise<{}>((resolve, reject) => { 
			this.getCartItem().then(() => {
			var sum = 0;
			this.cartItem.forEach(element => {
				sum+= parseInt(element.quantity);
			});

			this.navbarCartCount = sum
		})
	})
	}
}

