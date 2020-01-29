import { Pipe, PipeTransform } from '@angular/core';
import {UserRole} from "./models/UserRole";

/**
 * @author Valerie Timmerman
 * This pipe translates UserRoles into Dutch.
 */

@Pipe({
  name: 'rolepipe'
})
export class RolepipePipe implements PipeTransform {

  transform(value: UserRole, ...args: any[]): any {
    switch (value) {
      case UserRole.SUPERUSER:
        return "beheerder";
      case UserRole.EMPLOYEE:
        return "medewerker";
      case UserRole.USER:
        return "gebruiker";
    }
  }

}
