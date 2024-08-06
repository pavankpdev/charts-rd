import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AgchartComponent } from './agchart/agchart.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { HighchartComponent } from './highchart/highchart.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {AgchartRevisedComponent} from "./agchart-revised/agchart-revised.component";

export const routes: Routes = [
  { path: 'agchart', component: AgchartComponent },
  { path: 'agchartrrr', component: AgchartRevisedComponent },
  { path: 'chartjs', component: ChartjsComponent },
  { path: 'highchart', component: HighchartComponent },
  { path: '', redirectTo: '/agchart', pathMatch: 'full' },
  { path: '**', redirectTo: '/agchart' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    NgxSpinnerModule.forRoot({ type: 'ball-spin-clockwise' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
