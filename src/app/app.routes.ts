import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Profile } from './profile/profile';
import { Cart } from './cart/cart';
import { Details } from './details/details';
import { ChangeProfile } from './change-profile/change-profile';

export const routes: Routes = [
    { path: '', title: 'Home', component: Home },
    { path: 'login', title: 'Login', component: Login },
    { path: 'signup', title: 'Signup', component: Signup },
    { path: 'profile', title: 'User Profile', component: Profile },
    { path: 'cart', title: 'Cart', component: Cart },
    { path: 'details', title: 'Details', component: Details },
    { path: 'changeProfile', title: 'Edit Profile', component: ChangeProfile },
    { path: 'details/:id', title: 'Details', component: Details }
];
