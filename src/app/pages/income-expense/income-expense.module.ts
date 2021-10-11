import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { IncomeExpenseComponent } from './income-expense.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './income-expense.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpenseComponent,
    StatisticsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomesExpenses', incomeExpenseReducer),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ChartsModule,
    DashboardRoutingModule
  ]
})
export class IncomeExpenseModule { }
