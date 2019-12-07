import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deletepermissions'
})
export class DeletepermissionsPipe implements PipeTransform {

  transform(value: any) {
    return value ? 'verwijderrechten': '';
  }

}
