import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "./services/translate.service";

@Pipe({
  name: 'avgStars'
})
export class ArtistPipe implements PipeTransform {

constructor(private translate: TranslateService){}
  transform(value, arsg: string[]): any {
    let sr =[];
    for(let i = 0; i < value; i++){
      sr.push(i);
    }
    return sr;
  }

}
