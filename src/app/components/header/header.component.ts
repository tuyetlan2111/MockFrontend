import { Component, OnInit,  EventEmitter, Output,ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { IToastrService } from "../../services/toastr.service";
import { User } from "../../models/user";
import { Artist } from "../../models/artist";
import { RestService } from '../../rest.service';

import { TranslateService } from "../../services/translate.service";
import { Promise } from 'q';
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user : User;
  artists  : any;
  artist : any;

  constructor(
    public authService: AuthService,
    private router: Router,
    public productService: ProductService,
    public translate: TranslateService,
    private cartService : CartService,
    private rest  : RestService
  ) {
    // console.log(translate.data);
  }

  ngOnInit() {
    this.getArtist();
  }
  getArtist(){
    this.artists = [];
    this.rest.getArtist().subscribe((data: {}) => {
      this.artists = data;
      console.log(data);
    });
  }
  selectCategory(artist){
    this.artist = artist;
    this.router.navigate(["/"]);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
  
  setLang(lang: string) {
    console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }
}
