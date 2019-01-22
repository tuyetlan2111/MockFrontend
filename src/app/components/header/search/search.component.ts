import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from "../../../services/product.service";
import { CartService } from "../../../services/cart.service";
import { Product } from '../../../models/product';
import { Cart } from '../../../models/cart';
import { RestService } from './../../../rest.service';
import { IToastrService } from '../../../services/toastr.service';
import { CartItem } from 'src/app/models/cart_item';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  products: Product[];
  searchItem : string;
  artists:any = [];
  constructor(public rest: RestService, 
    private http: HttpClient,
    public productService: ProductService,
    private toastrService: IToastrService,
    private cartService: CartService,) { }

  ngOnInit() {
    this.getArtist();
  }
  getArtist(){
    this.artists = [];
    this.rest.getArtist().subscribe((data: {}) => {
      this.artists = data;

    });
  }
}
