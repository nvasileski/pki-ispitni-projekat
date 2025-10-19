import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { userModel } from '../models/user.model';
import { Router } from '@angular/router';
import { userService } from '../../services/user.service';
import { typeModel } from '../models/type.model';
import axios from 'axios';

@Component({
  selector: 'app-change-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './change-profile.html',
  styleUrl: './change-profile.css'
})
export class ChangeProfile {
  protected currentUser = signal<userModel | null>(null)
  protected form: FormGroup
  protected passForm: FormGroup
  protected favoriteToy = signal<typeModel[]>([])

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.currentUser.set(userService.activeUser())
    axios.get<typeModel[]>('https://toy.pequla.com/api/type').then(rsp =>
      this.favoriteToy.set(rsp.data))
    this.form = this.formBuilder.group({
      firstName: [this.currentUser()?.firstName, Validators.required],
      lastName: [this.currentUser()?.lastName, Validators.required],
      contactPhone: [this.currentUser()?.contactPhone, Validators.required],
      favoriteToyType: [this.currentUser()?.favoriteToyType, Validators.required],

    })

    this.passForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    })


  }

  protected changeProfile() {
    if (!this.form.valid) {
      alert('Invalid data')
      return
    }
    userService.updateUser(this.form.value)
    alert('User data updated sucessfully')
    this.router.navigateByUrl('/profile')
  }

  protected passwordChange() {
    if (!this.passForm.valid) {
      alert('Invalid password data')
      return
    }
    const old = this.currentUser()?.password
    if (this.passForm.value.currentPassword !== old) {
      alert('Your current password is incorrect')
      return
    }
    if (this.passForm.value.newPassword !== this.passForm.value.repeatPassword) {
      alert('New and repeat passwords dont match')
      return
    }

    userService.newPassword(this.passForm.value.newPassword)
    alert('Password has beeen changed sucessfully. Please login again')
    userService.logout()
    this.router.navigateByUrl('/login')
  }
}
