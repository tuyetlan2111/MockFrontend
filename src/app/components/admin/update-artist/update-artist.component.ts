import { Component, OnInit, Input } from '@angular/core';
import {User} from "../../../models/user"
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-artist',
  templateUrl: './update-artist.component.html',
  styleUrls: ['./update-artist.component.scss']
})
export class UpdateArtistComponent implements OnInit {
    user: User;
  @Input() artist = { firstName:'', lastName: '', lifeSpan: '', country:'',description:'', totalProducts:0, createdOn:'2018-12-31', createdBy: 1, changedOn:'2018-12-31', changedBy: 1};
  constructor(private authService : AuthService,private router: Router) { }

  ngOnInit() {
    this.user= this.authService.user;
    if(this.user==null){
      this.router.navigate(["/"]);
    }
  }

}
