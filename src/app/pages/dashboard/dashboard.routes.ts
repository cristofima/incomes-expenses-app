import { Routes } from "@angular/router";
import { DetailsComponent } from "../income-expense/details/details.component";
import { IncomeExpenseComponent } from "../income-expense/income-expense.component";
import { StatisticsComponent } from "../income-expense/statistics/statistics.component";

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: StatisticsComponent
  },
  {
    path: 'incomes-expenses',
    component: IncomeExpenseComponent
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
