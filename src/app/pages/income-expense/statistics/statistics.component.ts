import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIncome } from '../income-expense.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit, OnDestroy {

  incomes: number = 0;
  expenses: number = 0;
  totalIncomes: number = 0;
  totalExpenses: number = 0;

  doughnutChartLabels: Label[] = ['Expenses', 'Incomes'];
  doughnutChartData: MultiDataSet = [];

  private incomesExpensesSubscription!: Subscription;

  constructor(private store: Store<AppStateWithIncome>) { }

  ngOnInit(): void {
    this.incomesExpensesSubscription = this.store.select('incomesExpenses').subscribe(({items}) => {
      this.generateStatistics(items);
    });
  }

  ngOnDestroy(): void {
    if(this.incomesExpensesSubscription){
      this.incomesExpensesSubscription.unsubscribe();
    }
  }

  private generateStatistics(items: IncomeExpense[]){
    this.totalExpenses = 0;
    this.totalIncomes = 0;
    this.incomes = 0;
    this.expenses = 0;

    items.forEach(item => {
      if(item.type == 'income'){
        this.totalIncomes += item.amount;
        this.incomes++;
      } else if(item.type == 'expense'){
        this.totalExpenses += item.amount;
        this.expenses++;
      }
    });

    this.doughnutChartData = [[this.totalExpenses, this.totalIncomes]];
  }

}
