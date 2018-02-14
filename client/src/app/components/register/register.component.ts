import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message: String;
  messageClass: String;
  processing: Boolean;
  emailValid: Boolean;
  emailMessage: String;
  emailMessageClass: String;
  usernameValid: Boolean;
  usernameMessage: String;
  usernameMessageClass: String;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15)
      ]],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirmPassword: ['', Validators.required]
    }, {validator: this.matchingPasswords('password', 'confirmPassword')});
  }

disableForm() {
  this.form.controls['username'].disable();
  this.form.controls['email'].disable();
  this.form.controls['password'].disable();
  this.form.controls['confirmPassword'].disable();
}

enableForm() {
  this.form.controls['username'].enable();
  this.form.controls['email'].enable();
  this.form.controls['password'].enable();
  this.form.controls['confirmPassword'].enable();
}

  validatePassword(controls){
      const regEx = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    if(regEx.test(controls.value)) {
      return null;
    } else {
      return {'validatePassword': true};
    }
  }

  matchingPasswords(password, confirmPassword) {
    return (group: FormGroup) => {
      if(group.controls[password].value === group.controls[confirmPassword].value) {
        return null
      } else {
        return {'matchingPasswords': true};
      };
    }
  }

  onSubmit() {
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value
    }

    this.authService.registerUser(user).subscribe(data => {

      if(!data.success) {
        this.messageClass = 'alert alert-danger';
        this.processing = false;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      }
       this.message = data.message
    });
  }

  checkEmail() {
    this.authService.checkEmail(this.form.get('email').value).subscribe(data => {

      if(!data.success) {
        this.emailValid = false;
        this.emailMessageClass ="text text-danger";
      } else {
        this.emailValid = true;
        this.emailMessageClass ="text text-success";
      }
      this.emailMessage = data.message;
    });
  }

  checkUsername() {
    this.authService.checkUsername(this.form.get('username').value).subscribe(data => {

      if(!data.success) {
        this.usernameValid = false;
        this.usernameMessageClass ="text text-danger";

      } else {
        this.usernameValid = true;
        this.usernameMessageClass ="text text-success";
      }
      this.usernameMessage = data.message;
    });
  }

  ngOnInit() {
  }

}
