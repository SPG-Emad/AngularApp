import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  search: String = '';
  @ViewChild('search') el: ElementRef;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  searchUsers() {
    if (this.el.nativeElement.value.length > 0) {
      this.users =  this.users.filter( x => x.knownAs.toLowerCase().includes(this.el.nativeElement.value.toLowerCase()));
    } else {
      this.route.data.subscribe(data => {
        this.users = data['users'];
      });
    }
  }
}
