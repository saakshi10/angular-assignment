import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSidebarExpanded: boolean = true;

  sidebarStateChanged(isExpanded: boolean): void {
    this.isSidebarExpanded = isExpanded;
  }
}
