import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgchartComponent } from './agchart.component';

describe('AgchartComponent', () => {
  let component: AgchartComponent;
  let fixture: ComponentFixture<AgchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
