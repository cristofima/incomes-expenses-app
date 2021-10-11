import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {

  name!: string;
  private userSubscription!: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user').subscribe(({user}) => {
      if(user){
        this.name = user.name;
      }
    });
  }

  ngOnDestroy(): void {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }

}
