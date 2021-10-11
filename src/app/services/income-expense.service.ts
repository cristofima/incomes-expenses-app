import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { IncomeExpense } from '../models/income-expense.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  initIncomeExpenses(uid: string){
    return this.firestore.collection(`${uid}/income-expenses/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc => ({
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data() as any
          }))
        )
      );
  }

  createIncomeExpense(data: IncomeExpense){
    delete data.uid;
    return this.firestore.doc(`${this.authService.user?.uid}/income-expenses`)
      .collection('items').add({...data});
  }

  deleteIncomeExpense(uidItem: string){
    return this.firestore.doc(`${this.authService.user?.uid}/income-expenses/items/${uidItem}`).delete();
  }
}
