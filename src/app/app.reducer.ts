import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './pages/auth/auth.reducer';
import * as incomeExpense from './pages/income-expense/income-expense.reducer';

export interface AppState {
  ui: ui.State,
  user: auth.State,
  incomesExpenses: incomeExpense.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  incomesExpenses: incomeExpense.incomeExpenseReducer
}
