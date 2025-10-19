import { Component, signal } from '@angular/core';
import { toyModel } from '../models/toy.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toyService } from '../../services/toy.service';
import { cartService } from '../../services/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  protected toy = signal<toyModel | null>(null)

  constructor(private route: ActivatedRoute){
    this.route.params.subscribe((params: any)=>{
      toyService.getToysById(params.id)
      .then(rsp=>{
        this.toy.set(rsp.data)
      })
    })
  }
  protected getImage(id: number) {
    return `https://toy.pequla.com/img/${id}.png`
  }

   protected addToCart(toy: toyModel) {
      cartService.addToy(toy)
      alert(`${toy.name} added to cart sucessfully`)
    }
}
