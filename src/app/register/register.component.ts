import { Component } from '@angular/core';
import { UserAuthService } from '../service/user-auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink, FormsModule, SpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  constructor(private auth: UserAuthService, private router: Router, private formBuilder: FormBuilder) { }

  myForm!: FormGroup;

  spinner = false;

  otp!: number;

  resOtp!: number;

  err: any = false;

  showPassword = false;
  showotp = false;

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: "instant" })

    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    this.spinner = true;
    if (this.myForm.valid) {
      this.auth.reg(this.myForm.value).subscribe(data => {
        this.spinner = false;

        console.log(data);
        localStorage.setItem('user', JSON.stringify(data));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register successfully",
          showConfirmButton: false,
          timer: 1500
        });
        this.auth.isAuthenticated();
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
        this.err = "error"
        this.spinner = false;

      })
    } else if (this.myForm.value.password.length < 6) {
      this.spinner = false;

      this.err = "password must be at least 6 characters or digits or super characters"
    }
    else {
      this.spinner = false;

      this.err = "Please fill all required fields"
    }
  }

  veryProfile() {
    this.spinner = true;

    if (this.myForm.value.email)
      this.auth.veryProfile(this.myForm.value.email).subscribe((data: any) => {
        console.log(data)
        if (data.success) {
          this.showotp = true;
          this.resOtp = data.otp;
        } else {
          this.err = data.message;
        }
        this.spinner = false;

      }, err => {
        this.spinner = false;

        this.err = "Enter valid email address"
      })
    else {

      this.spinner = false;
      this.err = "Please fill all required fields"
    }

  }

  check() {
    this.spinner = true;

    console.log(this.otp, this.resOtp)
    if (+this.otp === +this.resOtp) {
      this.spinner = false;

      this.showotp = false;
      this.showPassword = true;
    } else {
      this.spinner = false;

      this.err = "Invalid otp"
    }
  }

  typiing() {
    this.err = false;
  }

}
