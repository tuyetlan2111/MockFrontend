import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';;
import { Date } from 'core-js/library/web/timers';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  user:User;
  submitted = false;
  updateproduct: FormGroup;
  productdata:any=[];
  artist:any=[];
  //@Input() productdata:any= {title:'', price: '',description:'',image:'', artist:'', quantitySold:0,avgStars:0,createdOn:new Date(),createdBy:1,changedOn:new Date(),changedBy:1};
  // @Input() artist:any = { firstName:'', lastName: '', lifeSpan: '', country:'',description:'', totalProducts:0, createdOn:new Date(), createdBy: 1, changedOn:new Date(), changedBy: 1};
  get fr() { return this.updateproduct.controls; }
  constructor(private authService : AuthService,
    public rest:RestService,
    private route: ActivatedRoute,
     private router: Router,
     private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
    this.rest.getProduct(this.route.snapshot.params['id']).subscribe((data: {}) => {
      // console.log(data);
      this.productdata = data;
    });
    this.getArtist();
    this.updateproduct = this.formBuilder.group({
      title: ['', Validators.required], description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', [Validators.required]]
  });
  }

  onSubmitProduct() {
    this.submitted = true;
    if (this.updateproduct.invalid) {
        return;
    }
    this.updateProduct();
  }

  // UpdateArtist() {
  //   this.rest.UpdateArtist(this.route.snapshot.params['id'], this.artist).subscribe((result) => {
  //     this.router.navigate(['/admin/artist/']);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }



  updateProduct() {
    this.rest.updateProduct(this.route.snapshot.params['id'], this.productdata).subscribe((result) => {
      this.router.navigate(['/admin']);
    }, (err) => {
      console.log(err);
    });
  }

  getArtist(){
    this.artist = [];
    this.rest.getArtist().subscribe((data: {}) => {
      this.artist = data;
     console.log(data);
    });
  }
// selectArtist(id){
//       this.artis.id = id
//   }
  processFile(imageInput: any) {
    var file: File = imageInput.files[0];
    var reader = new FileReader();
    this.productdata.image = file.name
    reader.addEventListener('load', (event: any) => {
      this.rest.uploadImage(file).subscribe((data: {}) => {
        console.log(data);
     });
      
    });
    reader.readAsDataURL(file);
  }
}
