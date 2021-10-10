import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/shared/ui.actions';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formGroup!: FormGroup;
  loading: boolean = false;
  private uiSubscription!: Subscription;

  constructor(private fb: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private store: Store<AppState>) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    if(this.uiSubscription){
      this.uiSubscription.unsubscribe();
    }
  }

  createUser(){
    this.store.dispatch(actions.isLoading());
    const {name, email, password} = this.formGroup.value;

    this.authService.createUser(name, email, password).then(credentials => {
      this.store.dispatch(actions.stopLoading());
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this.store.dispatch(actions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

}
