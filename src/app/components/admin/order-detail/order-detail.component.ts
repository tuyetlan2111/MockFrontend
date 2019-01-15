import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit,OnDestroy  {

  user:User;

  data$: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();



  OrderDetail:any[] = [];
  constructor(private authService : AuthService,public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.rest.getOrderDetail(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.OrderDetail.push(data);
      this.data$ = Object.values(data);
      this.dtTrigger.next();
      console.log(data);
    });

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
