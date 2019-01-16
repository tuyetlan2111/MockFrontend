import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  artistForm: FormGroup;
  submitted = false;
  user:User;
  @Input() artist = { firstName:'', lastName: '', lifeSpan: '', country:'', description:'', totalProducts:0, createdOn: new Date(), createdBy:1, changedOn:new Date(),changedBy: 1};
  get fr() { return this.artistForm.controls; }
  constructor(
    public rest:RestService, 
    private route: ActivatedRoute,
     private router: Router,
     private authService : AuthService,
     private formBuilder: FormBuilder,) { }
  
 
  ngOnInit() {
    this.user= this.authService.user;

    this.artistForm = this.formBuilder.group({
      firstName: ['', Validators.required], lastName: ['', Validators.required], country: ['', Validators.required],description: ['', Validators.required], totalProducts: ['', Validators.required],lifeSpan: ['', [Validators.required]
      ]
    });


    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
   
  }

  onSubmitArtist() {
    this.submitted = true;
    if (this.artistForm.invalid) {
        return;
    }
    this.addArtist();
  }
  addArtist() {

    this.rest.addArtist(this.artist).subscribe((result) => {
      this.router.navigate(['/artist/']);
    });
  }

}
