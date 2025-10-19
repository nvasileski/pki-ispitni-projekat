import { Component, signal } from '@angular/core';
import { userModel } from '../models/user.model';
import { userService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { toyService } from '../../services/toy.service';
import { reservationModel } from '../models/reservation.model';
import { misc } from '../misc';


@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  protected currentUser = signal<userModel | null>(null)
  protected reservations = signal<reservationModel[]>([])

  constructor(protected router: Router, public misc: misc){
    try {
      this.currentUser.set(userService.activeUser())
    } catch (e) {
      this.router.navigateByUrl('/login')
    }

    this.reservations.set(userService.getReservations())
  }

  protected arrived(r:reservationModel){
    userService.changeStatus(r.createdAt, 'arrived')
    this.currentUser.set(userService.activeUser())
  }


  protected canceled(r:reservationModel){
    userService.changeStatus(r.createdAt, 'canceled')
    this.currentUser.set(userService.activeUser())
  }
}
