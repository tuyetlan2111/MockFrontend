import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "../services/translate.service";

@Pipe({
  name: 'filter',
  
})
export class TranslatePipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(items: any, term: any): any {
    if (term === undefined) return items;

    return items.filter(function(Product) {
        return Product.title.includes(term);
    })
}
}
