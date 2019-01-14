import { Component, OnInit,Input, } from '@angular/core';
import { ActivatedRoute, Router,} from '@angular/router';
import { RestService } from '../../../rest.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  selectedFile:File = null;
  user:User;
  artist:any = [];
  public show:boolean = false;
  @Input() ProductData = {title:'', price: '',description:'',image:'image.jpg', artist:'', quantitySold:0,avgStars:0,createdOn:'2018-12-31',createdBy:1,changedOn:'2018-12-31',changedBy:1};
  constructor(private http : HttpClient, public rest:RestService, private route: ActivatedRoute, private router: Router,private authService : AuthService,) { }

  ngOnInit() {
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
    this.getArtist();

  }
  
  addProduct() {
    this.rest.addProduct(this.ProductData).subscribe((result) => {
      this.router.navigate(['/add_product/']);
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
  onFileChanged(event){
    this.selectedFile = <File>event.target.file[0];
  }
  
  onUpload(){
    const fd = new FormData;
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post('./assets/image', fd).subscribe(res=>{
      console.log(res);
    });
  }
  // OpenArtist(){
  //   this.show = !this.show;
  // }

  
}
