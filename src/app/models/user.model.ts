interface FirebaseUser {
  uid: string;
  name: string;
  email: string;
}

export class User {
  constructor(public uid: string, public name: string, public email: string){}

  static fromFirebase(firebaseUser: FirebaseUser){
    return new User(firebaseUser.uid, firebaseUser.name, firebaseUser.email);
  }
}
