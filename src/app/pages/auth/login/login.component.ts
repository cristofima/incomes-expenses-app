import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  loginUser(){
    const {email, password} = this.formGroup.value;

    Swal.fire({
      title: 'Loading ...',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.authService.loginUser(email, password).then(() => {
      Swal.close();
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message
      });
    });
  }

}
