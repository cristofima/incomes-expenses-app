import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { User } from '../models/user.model';
import * as actions from '../pages/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  userSubscription!: Subscription;

  constructor(private auth: AngularFireAuth,
      private firestore: AngularFirestore,
      private store: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fUser => {
      if(fUser){
        this.userSubscription = this.firestore.doc(`${fUser.uid}/user`).valueChanges().subscribe((firestoreUser: any) => {
          const user = User.fromFirebase(firestoreUser);
          this.store.dispatch(actions.setUser({user}));
        });
      }else{
        if(this.userSubscription){
          this.userSubscription.unsubscribe();
        }

        this.store.dispatch(actions.unSetUser());
      }
    });
  }

  createUser(name: string, email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password).then( ({user}) => {
      const newUser = new User(user ? user.uid : "", name, email);
      return this.firestore.doc(`${newUser.uid}/user`).set({...newUser});
    });
  }

  loginUser(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map( fUser => fUser != null)
    );
  }
}
