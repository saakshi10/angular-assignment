import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {
  faAngleDown,
  faBook,
  faFilePen,
  faNavicon,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Output()
  sidebarStateChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  navIcon = faNavicon;
  contentManagementIcon = faFilePen;

  coursesIcon = faBook;
  angleDownIcon = faAngleDown;

  isExpanded: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.updateSidebarStatus();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateSidebarStatus();
  }

  private updateSidebarStatus(): void {
    if (window.innerWidth < 850) {
      this.isExpanded = false;
    } else {
      this.isExpanded = true;
    }
    this.sidebarStateChanged.emit(this.isExpanded);
  }

  toggleSideMenu(): void {
    this.isExpanded = !this.isExpanded;
    this.sidebarStateChanged.emit(this.isExpanded);
  }
}
