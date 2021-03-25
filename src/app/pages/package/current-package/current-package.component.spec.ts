import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPackageComponent } from './current-package.component';

describe('CurrentPackageComponent', () => {
  let component: CurrentPackageComponent;
  let fixture: ComponentFixture<CurrentPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
