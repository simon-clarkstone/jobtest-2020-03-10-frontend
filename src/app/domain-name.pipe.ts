import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domainName'
})
export class DomainNamePipe implements PipeTransform {

  transform(value: string): string {
    try {
      let hostname = new URL(value).hostname;
      if (hostname.startsWith("www.")) {
        return hostname.substring(4);
      }
      if (!hostname) {
        return "???";
      }
      return hostname;
    }
    catch (e) {
      return "???";
    }
  }

}
