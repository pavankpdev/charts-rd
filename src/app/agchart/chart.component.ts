import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    const svg = document.querySelector('svg');
    if (svg) {
      const defs = svg.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "defs"));
      const pattern = defs.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "pattern"));
      pattern.setAttribute("id", "diagonalHatch");
      pattern.setAttribute("patternUnits", "userSpaceOnUse");
      pattern.setAttribute("width", "10");
      pattern.setAttribute("height", "10");
      const path = pattern.appendChild(document.createElementNS("http://www.w3.org/2000/svg", "path"));
      path.setAttribute("d", "M0,0 l10,10 M10,0 l-10,10");
      path.setAttribute("stroke", "#B22222");
      path.setAttribute("stroke-width", "2");
    }
  }

  ngOnInit(): void {
  }
}
