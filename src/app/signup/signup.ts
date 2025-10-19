import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import axios from 'axios';
import { userService } from '../../services/user.service';
import { typeModel } from '../models/type.model';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  protected form: FormGroup
  protected favorite = signal<typeModel[]>([])

  constructor(protected formBuilder: FormBuilder, protected router: Router) {
    axios.get<typeModel[]>('https://toy.pequla.com/api/type').then(rsp =>
      this.favorite.set(rsp.data)
    )
    console.log(this.favorite)

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactPhone: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      favoriteToyType: ['', Validators.required],
    })
  }

  submit(){
    if(!this.form.valid){
      alert('INVALID FORM DATA')
      return
    }
    if(this.form.value.password !== this.form.value.repeatPassword){
      alert('PASSWORDS DONT MATCH')
      return
    }

    try {
      const formValue: any = this.form.value
      delete formValue.repeatPassword
      userService.signup(formValue)
      this.router.navigateByUrl('/login')
    } catch (e) {
      alert('PLEASE FILL UP THE FORM COMPLETELY')
    }
  }
}
