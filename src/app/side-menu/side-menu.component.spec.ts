import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuComponent } from './side-menu.component';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set sidebar status on initialization', () => {
    spyOn(component.sidebarStateChanged, 'emit');
    component.ngOnInit();
    expect(component.sidebarStateChanged.emit).toHaveBeenCalled();
  });

  it('should call onRezise() when window is resized', () => {
    spyOn(component, 'onResize');
    window.dispatchEvent(new Event('resize'));
    expect(component.onResize).toHaveBeenCalled();
  });

  it('should collapse sidebar when window is less than 850px', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(700);
    const sidebarStateChangedSpy = spyOn(component.sidebarStateChanged, 'emit');
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(sidebarStateChangedSpy).toHaveBeenCalledWith(false);
  });

  it('should  expanded sidebar when window is greater than 850px', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(900);
    const sidebarStateChangedSpy = spyOn(component.sidebarStateChanged, 'emit');
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
    expect(sidebarStateChangedSpy).toHaveBeenCalledWith(true);
  });

  it('should call toggleSideMenu when clicked on menu button', () => {
    spyOn(component, 'toggleSideMenu');
    let toggleBtn = fixture.nativeElement.querySelector('#toggle-btn');
    toggleBtn.click();
    expect(component.toggleSideMenu).toHaveBeenCalled();
  });

  it('should toggle isExpanded when toggleSideMenu is called', () => {
    const sidebarStateChangedSpy = spyOn(component.sidebarStateChanged, 'emit');
    component.isExpanded = true;
    component.toggleSideMenu();
    expect(component.isExpanded).toBeFalse();
    expect(sidebarStateChangedSpy).toHaveBeenCalledWith(false);
  });
});
