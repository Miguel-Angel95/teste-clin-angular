import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatseUserComponent } from './creatse-user.component';

describe('CreatseUserComponent', () => {
  let component: CreatseUserComponent;
  let fixture: ComponentFixture<CreatseUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatseUserComponent]
    });
    fixture = TestBed.createComponent(CreatseUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
