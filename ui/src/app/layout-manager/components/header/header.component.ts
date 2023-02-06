import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleSideBar() {
    this.toggleSideBarEvent.emit();
  }
}
