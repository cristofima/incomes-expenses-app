import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import Swal from 'sweetalert2';
import { AppStateWithIncome } from '../income-expense.reducer';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent implements OnInit, OnDestroy {

  list!: IncomeExpense[];
  private incomesExpensesSubscription!: Subscription;

  constructor(private store: Store<AppStateWithIncome>, private incomeExpenseService: IncomeExpenseService) { }

  ngOnInit(): void {
    this.incomesExpensesSubscription = this.store.select('incomesExpenses').subscribe(({items}) => {
      this.list = items;
    });
  }

  ngOnDestroy(): void {
    if(this.incomesExpensesSubscription){
      this.incomesExpensesSubscription.unsubscribe();
    }
  }

  remove(uid: string){
    this.incomeExpenseService.deleteIncomeExpense(uid).then(() => {
      Swal.fire('Message', 'Item deleted', 'success');
    }).catch(error => {
      Swal.fire('Error', error.message, 'error');
    });
  }

}
