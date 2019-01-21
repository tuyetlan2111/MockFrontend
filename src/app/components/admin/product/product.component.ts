import { Component, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";


declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ManagerProductComponent implements OnInit {
  user:User;
  product:any = [];
  constructor(private authService : AuthService,public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  @ViewChild('dataTable') table;
  dataTable: any;
  ngOnInit() {
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
    this.getProducts();
   
  }

  getProducts() {
    this.product = [];
    this.rest.getProducts().subscribe((data: {}) => {
       console.log(data);
      this.product = data;
    });
  }
  add() {
    this.router.navigate(['/product-add']);
  }

  delete(id) {
    this.rest.deleteProduct(id)
      .subscribe(res => {
          this.getProducts();
        }, (err) => {
          console.log(err);
        }
      );
  }

}
