import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Credentials':'true',
    'Access-Control-Allow-Origin':'true',
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();

    formData.append('file', image);
    return this.http.post(endpoint + 'file/uploadFile', formData).pipe(
      map(this.extractData));
  }
  ////////// USER API//////////
  getUserLogin(username, password): Observable<any> {
    return this.http.get(endpoint + 'user/login/'+ username +"/"+ password).pipe(
      map(this.extractData));
  }
  getUser(id): Observable<any> {
    return this.http.get(endpoint + 'user/show/'+ id).pipe(
      map(this.extractData));
  }
  getUsers(): Observable<any> {
    return this.http.get(endpoint + 'user/show/').pipe(
      map(this.extractData));
  }
  updateUser (user): Observable<any> {
    console.log(user);
    return this.http.put<any>(endpoint + 'user/update/' + user.id, JSON.stringify(user), httpOptions).pipe(
      map(this.extractData));
  }
  updatePassword (email,old_password, password): Observable<any> {
    return this.http.get<any>(endpoint + 'user/password/'+email+ "/" + old_password + "/"+password, httpOptions).pipe(
      map(this.extractData));
  }
  register (user): Observable<any> {
    console.log(user);
    return this.http.post<any>(endpoint + 'user/create', JSON.stringify(user), httpOptions).pipe(
      map(this.extractData));
  }
  ////////// RATING API//////////
  getRatingProduct(id): Observable<any> {
    return this.http.get(endpoint + 'rating/show/' + id).pipe(
      map(this.extractData));
  }

  addRatingProduct (rating): Observable<any> {
    console.log(rating);
    return this.http.post<any>(endpoint + 'rating/create', JSON.stringify(rating), httpOptions).pipe(
      map(this.extractData));
  }
////////// CART API//////////
getCartItems(cookie_cart): Observable<any> {
  return this.http.get(endpoint + 'cartItem/show/'+cookie_cart).pipe(
    map(this.extractData));
}
checkAndSetCart (cart): Observable<any> {
  console.log(cart);
  return this.http.post<any>(endpoint + 'cart/check-set-cart', JSON.stringify(cart), httpOptions).pipe(
    map(this.extractData));
}
checkAndSetCartItem(cartItem): Observable<any> {
  console.log(cartItem);
  return this.http.post<any>(endpoint + 'cartItem/check-set-cart-item', JSON.stringify(cartItem), httpOptions).pipe(
    map(this.extractData));
}

deleteCartItem(cartItem): Observable<any> {
  console.log(cartItem);
  return this.http.delete<any>(endpoint + 'cartItem/delete/' + cartItem.id, httpOptions).pipe(
    map(this.extractData));
}

updateCartItem(cartItem): Observable<any> {
  console.log(cartItem);
  return this.http.put<any>(endpoint + 'cartItem/update/' + cartItem.id, JSON.stringify(cartItem), httpOptions).pipe(
    map(this.extractData));
}

  ///////// ADMIN //////////////


////////// PRODUCT API//////////
  getProducts(): Observable<any> {
    return this.http.get(endpoint + 'product/show').pipe(
      map(this.extractData));
  }
  
  getProduct(id): Observable<any> {
    return this.http.get(endpoint + 'product/show/' + id).pipe(
      map(this.extractData));
  }
  
  addProduct (product): Observable<any> {
    console.log(product);
    return this.http.post<any>(endpoint + 'product/create/', JSON.stringify(product), httpOptions).pipe(
      map(this.extractData)
    );
  }
  updateProduct (id, product): Observable<any> {
    return this.http.put(endpoint + 'product/update/' + id, JSON.stringify(product), httpOptions).pipe(
      map(this.extractData)
    );
  }
  
  deleteProduct (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'product/delete/' + id, httpOptions).pipe(
      tap(_ => console.log(`delete product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

////////// USer API//////////

  getOrders(): Observable<any>{
    return this.http.get(endpoint + 'order/show').pipe(
      map(this.extractData));
  }
  getOrderDetail(id): Observable<any> {
    return this.http.get(endpoint + 'orderDetail/show/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  getArtist(): Observable<any>{
    return this.http.get(endpoint + 'artist/show').pipe(
      map(this.extractData));
  }
  getArtists(id): Observable<any> {
    return this.http.get(endpoint + 'artist/show/' + id).pipe(
      map(this.extractData));
  }
  deleteArtist (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'artist/delete/' + id, httpOptions).pipe(
      tap(_ => console.log(`delete aritist id=${id}`)),
      catchError(this.handleError<any>('deleteArtist'))
    );
  }
  addArtist (artist): Observable<any> {
    console.log(artist);
    return this.http.post<any>(endpoint + 'artist/create/', JSON.stringify(artist), httpOptions).pipe(
      tap((product) => console.log(`addArtist w/ id=${product.id}`)),
      catchError(this.handleError<any>('addArtist'))
    );
  }
  
  UpdateArtist (id, artist): Observable<any> {
    return this.http.put(endpoint + 'artist/update/' + id, JSON.stringify(artist), httpOptions).pipe(
      map(this.extractData)
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
