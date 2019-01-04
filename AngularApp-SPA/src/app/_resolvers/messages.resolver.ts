import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

// this resolver was created to fetch component data before it is navigated

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {

  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  // tslint:disable-next-line:max-line-length
  constructor(private userService: UserService, private router: Router, private alertify: AlertifyService, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer)

    // using .pipe is optional because resolver automatically subscribe
    .pipe(
      catchError(() => {
        this.alertify.error('Problem retrieving messages');
        this.router.navigate(['/home']);

        // this below line will return null observable
        return of(null);
      })
    );
  }
}

