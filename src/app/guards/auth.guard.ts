import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){

  }

  canLoad(){
    return this.authService.isAuth().pipe(
      tap( state => {
        if(!state){
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }

  canActivate(){
    return this.authService.isAuth().pipe(
      tap( state => {
        if(!state){
          this.router.navigate(['/login']);
        }
      })
    );
  }

}
