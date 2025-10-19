import { Component, signal } from '@angular/core';
import { cartModel } from '../models/cart.model';
import { cartService } from '../../services/cart.service';
import { userService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  protected cart = signal<cartModel[]>([])
  protected total = 0
  

  constructor(protected router: Router){
    this.cart.set(cartService.getCart())
    this.total = cartService.getAmmount()

  }

  checkOut(){
    try {
      userService.checkOut(cartService.getCart(), cartService.getAmmount())
      cartService.clearCart()
      this.router.navigateByUrl('/profile')
    } catch (e) {
      alert('Failed to make reservation')
    }
  }

 clearCart(){
  cartService.clearCart()
  alert('Korpa uspesno obrisana, vracamo Vas na Home page')
  this.router.navigateByUrl('/')
 }
}
