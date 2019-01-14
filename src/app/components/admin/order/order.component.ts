import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  user:User;
  OrderData:any = [];
  OrderDetail:any = [];
  constructor(private authService : AuthService,public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  @ViewChild('dataTable') table;
  dataTable: any;

  ngOnInit(){
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }

   this.getOrders();
     this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
    this.rest.getOrderDetail(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.OrderDetail = data;
    });

    
  }

  getOrders(){
    this.OrderData = [];
    this.rest.getOrders().subscribe((data: {}) => {
      this.OrderData = data;
      // console.log(data);
  });
  }

}