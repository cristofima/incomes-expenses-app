import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import * as actions from '../income-expense/income-expense.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {

  private userSubscription!: Subscription;
  private incomeExpenseSubscription!: Subscription;

  constructor(private store: Store<AppState>, private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(auth => auth.user != null)
      ).subscribe(({user}) => {
        if(user){
          this.incomeExpenseSubscription = this.incomeExpenseService.initIncomeExpenses(user?.uid).subscribe((incomesExpenses: IncomeExpense[]) => {
            this.store.dispatch(actions.setItems({items: incomesExpenses}));
          });
        }
    });
  }

  ngOnDestroy(): void {
    if(this.incomeExpenseSubscription){
      this.incomeExpenseSubscription.unsubscribe();
    }

    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

}
