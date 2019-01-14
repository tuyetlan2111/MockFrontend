import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @ViewChild('dataTable') table;
  dataTable: any;
  user:User;

  OrderDetail:any[] = [];
  constructor(private authService : AuthService,public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
    this.rest.getOrderDetail(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.OrderDetail.push(data);
      console.log(this.OrderDetail);
    });

    
  }

  // getOrder(){
  //   this.rest.getOrder(this.route.snapshot.params['id']).subscribe((data: {}) => {
  //     console.log(data);
  //     this.OrderDetail = data;
  //   });
  // }
  

}
