import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  show: boolean = false;

  spinner = false;

  constructor(private auth: UserAuthService, private router: Router) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  err: boolean | string = false;


  login() {
    this.spinner = true;
    this.show = true;
    if (this.email.valid && this.password.valid) {
      this.auth.login({ email: this.email.value, password: this.password.value }).subscribe((user: any) => {
        this.spinner = false;

        console.log('login:', user);
        if (user.success) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successed",
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem('user', JSON.stringify(user));
          this.auth.isAuthenticated();

          this.router.navigate(['']);
        } else {
          this.err = user.message;
        }
      }, error => {
        this.spinner = false;

        console.log(error);
      });
    }
  }


  logout() {
    // Clear user session
    localStorage.removeItem('user');
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
