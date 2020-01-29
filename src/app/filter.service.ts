import {DecimalPipe} from "@angular/common";
import {FormControl} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Injectable, PipeTransform} from "@angular/core";

@Injectable()
export class FilterService {
  data: any;
  dataAvailable: BehaviorSubject<any> = new BehaviorSubject(this.data);

  observable$: Observable<any[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe) {
    this.dataAvailable.subscribe(
      data => {
        this.data = this.dataAvailable.value;
        this.observable$ = this.filter.valueChanges.pipe(
          startWith(''),
          map(text => this.search(text, pipe)),
        );

        // console.log('data ' + data)
        // this.filterService.data = data;
      }
    )

    // console.log(this.observable$)
    // this.filter.valueChanges.pipe(
    //   map(text => this.print())
    // )
  }

  print() {
    console.log('test');
  }

  search(text: string, pipe: PipeTransform): any[] {
    // if (this.data == 'undefined') {
    //   return null;
    // }

    return this.data.filter(data => {

      const term = text.toLowerCase();


      return data.experiment_name.toLowerCase().includes(term)

    });
  }


}
