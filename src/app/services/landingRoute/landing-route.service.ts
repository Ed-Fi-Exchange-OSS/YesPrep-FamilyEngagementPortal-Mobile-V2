import { MeService } from './../me/me.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LandingRouteService {

  constructor(private route: Router, private meService: MeService) { }

  public getRouteForCurentUser() {
    return this.meService.getRole().then((role) => {
      switch (role) {
        case 'Parent':
          return 'layout/landing';
        case 'Staff':
          return 'layout/teacher';
        case 'Admin':
          return 'layout/teacher';
        case 'CampusLeader':
          return 'layout/campusleader';
        default:
          return '';
      }
    });
  }

  getRoute() {
    return this.getRouteForCurentUser().then((route) => {
      return route;
    });
  }
  redirectToLanding() {
    this.getRouteForCurentUser().then((route) => {
      this.route.navigate([`/${route}`])
    });
  }
}
