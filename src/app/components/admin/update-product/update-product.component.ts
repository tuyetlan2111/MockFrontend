import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  artist:any = [];
  ProductData:any = [];
  // @Input() ProductData = {title:'', price: '',description:'',image:'image.jpg', artist:'', quantitySold:0,avgStars:0,createdOn:'2018-12-31',createdBy:1,changedOn:'2018-12-31',changedBy:1};
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getProduct(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.ProductData = data;
    });
    this.getArtist();
  }


  updateProduct() {
    this.rest.updateProduct(this.route.snapshot.params['id'], this.ProductData).subscribe((result) => {
      //this.router.navigate(['update/'+result.id]);
      this.router.navigate(['update/']);
    }, (err) => {
      console.log(err);
    });
  }
  getArtist(){
    this.artist = [];
    this.rest.getArtist().subscribe((data: {}) => {
      this.artist = data;
      // console.log(data);
    });
  }
}
