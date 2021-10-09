import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

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
