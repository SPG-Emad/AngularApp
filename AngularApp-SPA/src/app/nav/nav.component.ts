import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  unreadMessages;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(phototUrl => {
      this.photoUrl = phototUrl;
    });

    if (this.authService.loggedIn) {
      this.getTotalUnreadMessagesCount(this.authService.currentUser.id);
    }

    this.userService.refreshUnreadMessageCount.subscribe((data) => {
      this.unreadMessages = data;

    });
  }

  getTotalUnreadMessagesCount(userId: number) {
    return this.userService
      .countUnreadMessages(userId)
      .subscribe(total => (this.unreadMessages = total.toString()));
  }

  login() {
    this.authService.login(this.model).subscribe(
      () => {
        this.alertify.success('Loggin In Successfully');
        this.getTotalUnreadMessagesCount(this.authService.currentUser.id);
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged Out Successfully');
    this.router.navigate(['/home']);
  }
}
