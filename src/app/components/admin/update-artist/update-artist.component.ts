import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-artist',
  templateUrl: './update-artist.component.html',
  styleUrls: ['./update-artist.component.scss']
})
export class UpdateArtistComponent implements OnInit {
  @Input() artist = { firstName:'', lastName: '', lifeSpan: '', country:'',description:'', totalProducts:0, createdOn:'2018-12-31', createdBy: 1, changedOn:'2018-12-31', changedBy: 1};
  constructor() { }

  ngOnInit() {
  }

}
