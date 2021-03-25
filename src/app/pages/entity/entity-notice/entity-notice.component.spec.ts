import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityNoticeComponent } from './entity-notice.component';

describe('EntityNoticeComponent', () => {
  let component: EntityNoticeComponent;
  let fixture: ComponentFixture<EntityNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
