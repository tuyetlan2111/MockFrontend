import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from "./services/translate.service";

@Pipe({
  name: 'artist'
})
export class ArtistPipe implements PipeTransform {

constructor(private translate: TranslateService){}
  transform(items: any, artist: any): any {
   console.log("ahihi");
  }

}
