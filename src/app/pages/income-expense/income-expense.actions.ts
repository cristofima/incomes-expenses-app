import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from 'src/app/models/income-expense.model';

export const setItems = createAction('[Income Expense] Set items', props<{items: IncomeExpense[]}>());
export const unsetItems = createAction('[Income Expense] Unset items');
