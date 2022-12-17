import { Component, OnInit } from '@angular/core';
import { faAtom } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logo = faAtom;
  constructor() {}

  ngOnInit(): void {}
}
