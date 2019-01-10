import { Component, OnInit, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './product_detail.component.html',
  styleUrls: ['./product_detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() fatherName: string;
  constructor(private http: HttpClient) { 
    
  }

  ngOnInit() {
  }

}
