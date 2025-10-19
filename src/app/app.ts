import { Component, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { userService } from '../services/user.service';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pki-ispitni-projekat');
  protected currentUser = signal<string | null>(null)

  constructor(protected router: Router) {
    this.currentUser.set(localStorage.getItem('active'))
  }

  hasAuth(){
    if(localStorage.getItem('active'))
      return true
    return false
  }

  logout() {
    userService.logout()
    this.router.navigateByUrl('/login')
  }
}
