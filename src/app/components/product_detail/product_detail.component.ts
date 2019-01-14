import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-detail',
  templateUrl: './product_detail.component.html',
  styleUrls: ['./product_detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() fatherName: string;
  constructor(private http: HttpClient, private router: Router ,private route: ActivatedRoute) { 
    
  }
  id ;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.id);
  }

}
