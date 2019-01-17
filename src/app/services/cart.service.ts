
import { Injectable } from "@angular/core";
import { Cart } from '../models/cart';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class BillingService {

  cartItems: any;
  length: any;
  rootURL = "http://localhost:8080/cartItem";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) { }

  getConfig(): Observable<any> {
    return this.http.get(this.rootURL + '/show');
  }

  showConfig() {
    this.getConfig().subscribe(data => {
      this.cartItems = data;
      console.log(this.cartItems);
      length = this.cartItems.length;
    });
  }

  createCartItem(cartItemData: Cart) {
    this.http.post(this.rootURL + '/create', cartItemData)
  }

  addProduct(cartItem): Observable<any> {
    return this.http.post<any>(this.rootURL + '/create', cartItem, this.httpOptions).pipe(
      catchError(this.handleError<any>('addProduct', cartItem))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  deleteProduct(id: number): Observable<{}> {
    const url = `${this.rootURL}/delete/${id}`; // DELETE api/heroes/42
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteHero'))
      );
  }

  updateProduct(cartItem): Observable<any> {
    return this.http.put<any>(`${this.rootURL}/update/${cartItem.id}`, cartItem, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('updateProduct', cartItem))
      );
  }

  cartItem: any;
  plusProductToCart(p) {
    if (p.quantity < 100) {
      this.cartItem = {
        id: p.id,
        price: p.price,
        quantity: p.quantity + 1,
        createdOn: p.createdOn,
        createdBy: p.createdBy,
        changedOn: p.changedOn,
        changedBy: p.changedBy,
        product: {
          id: p.product.id,
        },
        cart: {
          id: p.cart.id,
        }
      }
      this.updateProduct(this.cartItem)
        .subscribe(item => {
          this.showConfig();
        });
    }
  }
}
