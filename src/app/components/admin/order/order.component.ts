import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  OrderData:any = [];
  OrderDetail:any = [];
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  @ViewChild('dataTable') table;
  dataTable: any;

  ngOnInit(){
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