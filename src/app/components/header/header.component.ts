import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              public activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.authService.userIsLoggedIn();
  }

  logout(): void {
    this.authService.logout();
  }


  search(searchString: string): void {
    if (searchString)
    {
      this.router.navigate(['/themes/search/1'], { queryParams: { search: searchString } });
    }
  }

}
