import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeExpense } from 'src/app/models/income-expense.model';
import { setItems, unsetItems } from './income-expense.actions';

export interface State {
  items: IncomeExpense[];
}

export interface AppStateWithIncome extends AppState{
  incomesExpenses: State
}

export const initialState: State = {
  items: []
}

const _incomeExpenseReducer = createReducer(initialState,
  on(setItems, (state, {items}) => ({ ...state, items: [...items]})),
  on(unsetItems, state => ({ ...state, items: []}))
);

export function incomeExpenseReducer(state: any, action: Action) {
  return _incomeExpenseReducer(state, action);
}
