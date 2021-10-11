import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import Swal from 'sweetalert2';
import * as actions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html'
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  type = 'income';
  loading: boolean = false;
  private uiSubscription!: Subscription;

  constructor(private fb: FormBuilder,
    private incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      description: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(0.01)]),
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    if(this.uiSubscription){
      this.uiSubscription.unsubscribe();
    }
  }

  save(){
    this.store.dispatch(actions.isLoading());
    const {description, amount} = this.formGroup.value;
    const model = new IncomeExpense(description, amount, this.type);

    this.incomeExpenseService.createIncomeExpense(model).then(() => {
      this.store.dispatch(actions.stopLoading());
      this.formGroup.reset();
      Swal.fire('Record created', description, 'success');
    }).catch((error) => {
      this.store.dispatch(actions.stopLoading());
      Swal.fire('Error', error.message, 'error');
    });
  }

}
