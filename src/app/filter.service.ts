import {FormControl} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable()
export class FilterService {
  private _data: any;
  private _isDataAvailable: BehaviorSubject<any> = new BehaviorSubject(this._data);

  observable$: Observable<any[]>;
  filter = new FormControl('');

  constructor() {
    this._isDataAvailable.subscribe(
      data => {
        if (typeof data !== "undefined") {
          this._data = this._isDataAvailable.value;
          this.observable$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(text => this.search(text)),
          );
        }
      }
    )
  }

  search(text: string): any[] {
    return this._data.filter(data => {
      const term = text.toLowerCase();

      for (let value of Object.values(data)) {
        if (value.toString().toLowerCase().includes(term)) {
          return value;
        }
      }
    });
  }


  get isDataAvailable(): BehaviorSubject<any> {
    return this._isDataAvailable;
  }

  set isDataAvailable(value: BehaviorSubject<any>) {
    this._isDataAvailable = value;
  }
}
