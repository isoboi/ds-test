import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {User} from '../../interfaces/user';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  userData: User;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
  }

  initForm(): void{
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(): void {
     this.authService.login(this.form.get('email').value, this.form.get('password').value)
       .subscribe(data => this.router.navigate(['/dashboard']));
  }

}
