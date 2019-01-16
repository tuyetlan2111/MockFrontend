import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-update-artist',
  templateUrl: './update-artist.component.html',
  styleUrls: ['./update-artist.component.scss']
})
export class UpdateArtistComponent implements OnInit {

  updateartist: FormGroup;
  submitted = false;
  user:User;
  @Input() artist:any = { firstName:'', lastName: '', lifeSpan: '', country:'',description:'', totalProducts:0, createdOn:'2018-12-31', createdBy: 1, changedOn:'2018-12-31', changedBy: 1};
  constructor(public rest:RestService, private authService : AuthService,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,) { }

  ngOnInit() {
    this.updateartist = this.formBuilder.group({
      firstName: ['', Validators.required], lastName: ['', Validators.required], country: ['', Validators.required],description: ['', Validators.required], totalProducts: ['', Validators.required],lifeSpan: ['', [Validators.required]
      ]
    });
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }

    this.rest.getArtists(this.route.snapshot.params['id']).subscribe((data: {}) => {
      console.log(data);
      this.artist = data;
    });
  }

  onSubmitArtist() {
    this.submitted = true;
    if (this.updateartist.invalid) {
        return;
    }
    this.UpdateArtist();
  }
  UpdateArtist() {
    this.rest.UpdateArtist(this.route.snapshot.params['id'], this.artist).subscribe((result) => {
      this.router.navigate(['/artist/']);
    }, (err) => {
      console.log(err);
    });
  }

}
