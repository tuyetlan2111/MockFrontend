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
	constructor(public rest:RestService){
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

// 	getProductById(key: string) {
// 		this.product = this.db.object('products/' + key);
// 		return this.product;
// 	}

// 	updateProduct(data: Product) {
// 		this.products.update(data.$key, data);
// 	}

// 	deleteProduct(key: string) {
// 		this.products.remove(key);
// 	}

// 	/*
//    ----------  Favourite Product Function  ----------
//   */

// 	// Get Favourite Product based on userId
// 	getUsersFavouriteProduct() {
// 		const user = this.authService.getLoggedInUser();
// 		this.favouriteProducts = this.db.list('favouriteProducts', (ref) =>
// 			ref.orderByChild('userId').equalTo(user.$key)
// 		);
// 		return this.favouriteProducts;
// 	}

// 	// Adding New product to favourite if logged else to localStorage
// 	addFavouriteProduct(data: Product): void {
// 		let a: Product[];
// 		a = JSON.parse(localStorage.getItem('avf_item')) || [];
// 		a.push(data);
// 		this.toastrService.wait('Adding Product', 'Adding Product as Favourite');
// 		setTimeout(() => {
// 			localStorage.setItem('avf_item', JSON.stringify(a));
// 			this.calculateLocalFavProdCounts();
// 		}, 1500);
// 	}

// 	// Fetching unsigned users favourite proucts
// 	getLocalFavouriteProducts(): Product[] {
// 		const products: Product[] = JSON.parse(localStorage.getItem('avf_item')) || [];

// 		return products;
// 	}

// 	// Removing Favourite Product from Database
// 	removeFavourite(key: string) {
// 		this.favouriteProducts.remove(key);
// 	}

// 	// Removing Favourite Product from localStorage
// 	removeLocalFavourite(product: Product) {
// 		const products: Product[] = JSON.parse(localStorage.getItem('avf_item'));

// 		for (let i = 0; i < products.length; i++) {
// 			if (products[i].productId === product.productId) {
// 				products.splice(i, 1);
// 				break;
// 			}
// 		}
// 		// ReAdding the products after remove
// 		localStorage.setItem('avf_item', JSON.stringify(products));

// 		this.calculateLocalFavProdCounts();
// 	}

// 	// Returning Local Products Count
// 	calculateLocalFavProdCounts() {
// 		this.navbarFavProdCount = this.getLocalFavouriteProducts().length;
// 	}

// 	/*
//    ----------  Cart Product Function  ----------
//   */

// 	// Adding new Product to cart db if logged in else localStorage
// 	addToCart(data: Product): void {
// 		let a: Product[];

// 		a = JSON.parse(localStorage.getItem('avct_item')) || [];

// 		a.push(data);
// 		this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
// 		setTimeout(() => {
// 			localStorage.setItem('avct_item', JSON.stringify(a));
// 			this.calculateLocalCartProdCounts();
// 		}, 500);
// 	}

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

// 	// Fetching Locat CartsProducts
// 	getLocalCartProducts(): Product[] {
// 		const products: Product[] = JSON.parse(localStorage.getItem('avct_item')) || [];

// 		return products;
// 	}

// 	// returning LocalCarts Product Count
// 	calculateLocalCartProdCounts() {
// 		this.navbarCartCount = this.getLocalCartProducts().length;
// 	}
}

