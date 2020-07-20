import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../_services/user.service';
import {ThemeService} from '../../_services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private authService: AuthService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private themeService: ThemeService
              ) { }

  ngOnInit(): void {

  }

  isLoggedIn(): boolean {
    return this.authService.userIsLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }


  search(searchString: string): void {
    if (searchString)
    {
      this.router.navigate(['/themes/search/1'], { queryParams: { search: searchString } });
    }
  }

  isAdmin(): boolean {
    return this.authService.getCurrentUser()?.roles.includes('Administrator');
  }

  isModer(): boolean {
    return this.authService.getCurrentUser()?.roles.includes('Moderator');
  }

}
