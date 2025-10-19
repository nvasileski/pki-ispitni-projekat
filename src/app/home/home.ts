import { Component, signal } from '@angular/core';
import { toyModel } from '../models/toy.model';
import { toyService } from '../../services/toy.service';
import { RouterLink, RouterModule } from '@angular/router';
import { cartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  protected toys = signal<toyModel[]>([])
  protected copyToys = signal<toyModel[]>([])

  protected selectedCategory = this.loadValueFromLocalStorage('category')
  protected selectedTargetGroup = this.loadValueFromLocalStorage('targetGroup')
  protected selectedAgeGroup = this.loadValueFromLocalStorage('ageGroup')

  constructor() {
    toyService.getToys()
      .then(rsp => this.copyToys.set(rsp.data))

  }

  protected getImage(id: number) {
    return `https://toy.pequla.com/img/${id}.png`
  }

  protected addToCart(toy: toyModel) {
    cartService.addToy(toy)
    alert(`${toy.name} added to cart sucessfully`)
  }

  protected getCategories() {
    const arr = this.copyToys().map(c => c.type.name)
    return [...new Set(arr)]
  }

  protected getTargetGroup() {
    const arr = this.copyToys().map(tg => tg.targetGroup)
    return [...new Set(arr)]
  }

  protected getAgeGroup() {
    const arr = this.copyToys().map(ag => ag.ageGroup.name)
    return [...new Set(arr)]
  }
  protected loadValueFromLocalStorage(key: string) {
    if (!localStorage.getItem(key))
      localStorage.setItem(key, 'all')

    return localStorage.getItem(key)!
  }

  protected search() {
    localStorage.setItem('category', this.selectedCategory)
    localStorage.setItem('targetGroup', this.selectedTargetGroup)
    localStorage.setItem('ageGroup', this.selectedAgeGroup)

    this.toys.set(this.copyToys()
      .filter(t => {
        if (this.selectedCategory != 'all')
          return t.type.name == this.selectedCategory
        return true
      })
      .filter(t => {
        if (this.selectedTargetGroup != 'all')
          return t.targetGroup == this.selectedTargetGroup
        return true
      })
      .filter(t => {
        if (this.selectedAgeGroup != 'all')
          return t.ageGroup.name == this.selectedAgeGroup
        return true
      })
    )
  }
}
