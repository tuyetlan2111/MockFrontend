import { Component, OnInit,  EventEmitter, Output} from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { ProductService } from "../../services/product.service";
import { TranslateService } from "../../services/translate.service";
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    public productService: ProductService,
    public translate: TranslateService
  ) {
    // console.log(translate.data);
  }

  ngOnInit() {
  }
  logout() {
    //this.authService.logout();
    this.router.navigate(["/"]);
  }

  setLang(lang: string) {
    console.log("Language", lang);
    this.translate.use(lang).then(() => {});
  }
}
