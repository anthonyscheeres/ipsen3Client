import {QueryList, ViewChildren} from "@angular/core";
import {NgbdSortableHeader, SortEvent} from "./sortable.directive";
import {Observable} from "rxjs";

export class TableComplete {
  dataSets$: Observable<any[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;


  // experiment service
  constructor(public data: any) {
    this.countries$ = data;
    this.total$ = service.total$;
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
