import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'keepHtml',
  pure: false
})
@Injectable()
export class KeepHtml {

  constructor(private sanitizer: DomSanitizer) {}
  // transform(value, args) {
  //   // value = value + '?autoplay=1&controls=0&showinfo=0&rel=0'; // make sure it's a string
  //   // return value.toLowerCase();
  //   let web = this.getId(value);
  //   let url = "https://www.youtube.com/embed/" + web + "?autoplay=1&controls=0&showinfo=0&rel=0";
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }

  transform(v:string) {
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }

  getId(url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = url.match(regExp);

      if (match && match[2].length == 11) {
          return match[2];
      } else {
          return 'error';
      }
  }
}
