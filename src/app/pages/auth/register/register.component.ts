import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  createUser(){
    const {name, email, password} = this.formGroup.value;

    Swal.fire({
      title: 'Creating user ...',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.authService.createUser(name, email, password).then(credentials => {
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
