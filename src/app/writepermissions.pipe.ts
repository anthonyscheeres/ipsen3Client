import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'writepermissions'
})
export class WritepermissionsPipe implements PipeTransform {

  transform(value: any) {
    return value ? 'schrijfrechten': '';
  }

}
