import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit, OnDestroy {

  name!: string;
  private userSubscription!: Subscription;

  constructor(private authService: AuthService,
      private router: Router,
      private store: Store<AppState>) { }

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

  logOut(){
    this.authService.logOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

}
