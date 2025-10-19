import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  protected form: FormGroup

  constructor(private formBuilder: FormBuilder, protected router:Router){
    this.form = this.formBuilder.group({
      email: ['user@example.com', [Validators.required, Validators.email]],
      password:['123', Validators.required]
    })
  }


  onSubmit(){
    if(!this.form.valid){
      alert('BAD FORM DATA')
      return
    }

    try {
      userService.login(this.form.value.email, this.form.value.password)
      const url = sessionStorage.getItem('ref') ?? '/profile'
      sessionStorage.removeItem('ref')
      this.router.navigateByUrl(url)
    } catch (e) {
      throw new Error('BAD LOGIN PARAMS')
    }
  }
}
