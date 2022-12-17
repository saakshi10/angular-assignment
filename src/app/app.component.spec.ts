import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  [true, false].forEach((isExpandedStatus) => {
    it('should update isSidebarExpanded when sidebarStateChanged is raised', () => {
      component.isSidebarExpanded = !isExpandedStatus;
      component.sidebarStateChanged(isExpandedStatus);
      expect(component.isSidebarExpanded).toBe(isExpandedStatus);
    });
  });
});
