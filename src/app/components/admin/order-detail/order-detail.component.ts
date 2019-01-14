import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
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


  OrderDetail:any[] = [];
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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
