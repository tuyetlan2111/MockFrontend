import { Component, OnInit,Input, } from '@angular/core';
import { ActivatedRoute, Router,} from '@angular/router';
import { RestService } from '../../../rest.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  user:User;
  artist:any = [];
  public show:boolean = false;
  @Input() artis = { id : 1,firstName:'', lastName: '', lifeSpan: '', country:'', description:'', totalProducts:0, createdOn: new Date(), createdBy:1, changedOn:new Date(),changedBy: 1};
  @Input() ProductData = {title:'', price: '',description:'',image:'image.jpg', artist:this.artis, quantitySold:0,avgStars:0,createdOn:'2018-12-31',createdBy:1,changedOn:'2018-12-31',changedBy:1};
  get fr() { return this.productForm.controls; }

  constructor(private http : HttpClient, 
    public rest:RestService,
    private route: ActivatedRoute, 
    private router: Router,
    private authService : AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
    this.getArtist();
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', [Validators.required]]
  });
  }
  onSubmitProduct() {
    this.submitted = true;
    if (this.productForm.invalid) {
        return;
    }
    this.addProduct();
  }
  
  addProduct() {

    this.rest.addProduct(this.ProductData).subscribe((result) => {
      this.router.navigate(['/admin/']);
    });
  }
  getArtist(){
    this.artist = [];
    this.rest.getArtist().subscribe((data: {}) => {
      this.artist = data;
      this.artis.id = this.artist[0].id
      // console.log(data);
    });
  }
  selectArtist(id){
      this.artis.id = id
  }

  processFile(imageInput: any) {
    var file: File = imageInput.files[0];
    var reader = new FileReader();
    this.ProductData.image = file.name
    reader.addEventListener('load', (event: any) => {
      this.rest.uploadImage(file).subscribe((data: {}) => {
        console.log(data);
     });
      
    });

    reader.readAsDataURL(file);
  }
}
