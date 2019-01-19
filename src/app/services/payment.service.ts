
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { IToastrService } from '../services/toastr.service';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'src/app/models/cart_item';
@Injectable({
  providedIn: "root"
})
export class PaymentService {
  constructor(private http: HttpClient, 
    private rest :RestService,
    private iToastrService :IToastrService,
    private cookieService: CookieService) { 

    }
    addPayment(payment,cookie): Promise<{}> {
    
		return new Promise<{}>((resolve, reject) => {
			this.rest.addPayment(payment,cookie).subscribe((data: {}) => {
        resolve(data);
			});
		});
	}
}
