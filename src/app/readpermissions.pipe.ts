import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readpermissions'
})
export class ReadpermissionsPipe implements PipeTransform {

  transform(value: any) {
    return value ? 'leesrechten': '';
  }

}
