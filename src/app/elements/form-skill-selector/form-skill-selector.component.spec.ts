import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSkillSelectorComponent } from './form-skill-selector.component';

describe('FormSkillSelectorComponent', () => {
  let component: FormSkillSelectorComponent;
  let fixture: ComponentFixture<FormSkillSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSkillSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSkillSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
