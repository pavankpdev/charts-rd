import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgchartRevisedComponent } from './agchart-revised.component';

describe('AgchartRevisedComponent', () => {
  let component: AgchartRevisedComponent;
  let fixture: ComponentFixture<AgchartRevisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgchartRevisedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgchartRevisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
