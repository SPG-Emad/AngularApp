import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  search: String = '';
  @ViewChild('search') el: ElementRef;
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));

  genderList =
  [{
    value: 'male', display: 'Males'
  },
  {
    value: 'female', display: 'Females'
  }];

  userParams: any = {};

  constructor(private route: ActivatedRoute, private userService: UserService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  searchUsers() {
    if (this.el.nativeElement.value.length > 0) {
      this.users = this.users.filter(x =>
        x.knownAs.toLowerCase().includes(this.el.nativeElement.value.toLowerCase()));
    } else {
      this.route.data.subscribe(data => {
        this.users = data['users'];
      });
    }
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    },
    error => {
      this.alertify.error(error);
    });
  }
}
