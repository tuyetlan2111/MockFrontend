import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  UserData:any = [];
  role:number = 1;


  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }
  @ViewChild('dataTable') table;
  dataTable: any;
  ngOnInit() {
    this.getUser();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.DataTable();
  }
  getUser() {
    this.UserData = [];
    this.rest.getUsers().subscribe((data: {}) => {
      this.UserData = data;
      // console.log(data);
      
    });
  }
}

