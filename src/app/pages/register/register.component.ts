import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  visible: boolean = true;
  changeType: boolean = true;
  advert: boolean = false;
  form: FormGroup | any
  screenWidth!: number;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router,
    private _ngxUiLoaderService: NgxUiLoaderService) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit(): void {
    // if (localStorage.getItem('token')) {

    // } else {
    //   this.router.navigate(['login'])
    // }

    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required, this.validatePhoneNumber]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
  }

  signIn() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      console.log("Complete los campos como se indica");

    } else {
      this._ngxUiLoaderService.start();
      this.userService.registerUser(this.form.value).subscribe(data => {
        this._ngxUiLoaderService.stop();
        setTimeout(() => {
          Swal.fire({
            title: data.message,
            text: "Se ha registrado correctamente",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        }, 750);
        setTimeout(() => {
          this.router.navigate(['login'])
        }, 2800);
      }, errror => {
        this._ngxUiLoaderService.stop();
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errror.error.message,
          });
        }, 750);
        console.error(errror);

      });
    }
  }

  viewPass() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }

  change() {
    this.advert = !this.advert;
  }

  validatePhoneNumber(control: any) {
    const phoneNumber = control.value;
    const phonePattern = /^[0-9]{10}$/;
    if (phonePattern.test(phoneNumber)) {
      return null;
    } else {
      return { 'invalidPhoneNumber': true };
    }
  }

  toLogin() {
    this.router.navigate(['login'])
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
  }

}
