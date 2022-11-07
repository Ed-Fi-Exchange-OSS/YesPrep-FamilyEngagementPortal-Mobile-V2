import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(recipients: any, value: any): any {
    
    if(!value) return recipients;
    
    let out = [];

    out = recipients.filter((r) => {
      return r.fullName.toUpperCase().indexOf(value.toUpperCase()) != -1;
    });
    return out;
  }

}
