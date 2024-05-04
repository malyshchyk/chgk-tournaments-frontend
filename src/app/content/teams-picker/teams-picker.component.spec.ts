import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsPickerComponent } from './teams-picker.component';

describe('TeamsPickerComponent', () => {
  let component: TeamsPickerComponent;
  let fixture: ComponentFixture<TeamsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
