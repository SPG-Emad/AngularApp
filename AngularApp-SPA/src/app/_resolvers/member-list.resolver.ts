import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// this resolver was created to fetch component data before it is navigated

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers()
    // using .pipe is optional because resolver automatically subscribe
    .pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/home']);

        // this below line will return null observable
        return of(null);
      })
    );
  }
}

