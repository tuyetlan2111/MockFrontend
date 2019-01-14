import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AuthService } from './auth.service';
import { IToastrService } from './toastr.service';
import { RestService } from '../rest.service';


@Injectable()
export class ProductService {

	// NavbarCounts
	navbarCartCount = 0;
	products : Product[];
	productCurrent: Product;
	constructor(public rest:RestService, private iToastrService: IToastrService){
		this.getProducts();
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

// 	createProduct(data: Product) {
// 		this.products.push(data);
// 	}

	getProduct(id): Promise<{}>  {
		return new Promise<{}>((resolve, reject) => {
			this.rest.getProduct(id).subscribe((data: {}) => {
			  this.productCurrent = <Product>data;
			  console.log(this.productCurrent);
			  resolve(this.productCurrent);
			});

		});
	}

// 	updateProduct(data: Product) {
// 		this.products.update(data.$key, data);
// 	}

// 	deleteProduct(key: string) {
// 		this.products.remove(key);
// 	}


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
	getLocalCartProducts(): Product[] {
		return this.products;
	}

	// returning LocalCarts Product Count
	calculateLocalCartProdCounts() {
		this.navbarCartCount = this.getLocalCartProducts().length;
	}
}

