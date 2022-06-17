import { AfterViewInit, Component } from '@angular/core';
import { TableService } from './utils/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'bstar';
  constructor(private table: TableService) {

  }
  ngAfterViewInit(): void {
    this.table.initialize();
  }
}
