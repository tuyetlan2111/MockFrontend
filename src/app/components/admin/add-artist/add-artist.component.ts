import { Component, OnInit,ViewChild,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../../../rest.service';


@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  
  @Input() artist = { firstName:'', lastName: '', lifeSpan: '', country:'', description:'', totalProducts:0, createdOn: new Date(), createdBy:1, changedOn:new Date(),changedBy: 1};
  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }
  
 
  ngOnInit() {
  }

 
  // add() {
  //   this.router.navigate(['/add_artist']);
  // }

  addArtist() {
    this.rest.addArtist(this.artist).subscribe((result) => {
      this.router.navigate(['/add_artist/']);
    }, (err) => {
      console.log(err);
    });
  }

}
