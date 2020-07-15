import { Component, OnInit } from '@angular/core';
import {Theme} from '../../_models/Theme';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ThemeService} from '../../_services/theme.service';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.css']
})
export class ThemeListComponent implements OnInit {
  themes: Theme[];
  loadingThemes: boolean = false;


  constructor(
    private themeService: ThemeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    console.log("CONST")
    this.router.events.subscribe((val) => {

      if (val instanceof NavigationEnd)
      {
        console.log("BEFORE")
        this.loadThemes();
        console.log("AFTER")

      }
    })
  }


  ngOnInit(): void {

  }

  isChosenFilter(filter: string): boolean {
    return this.activatedRoute.snapshot.params.filter === filter;
  }

  loadThemes(): void {
    this.loadingThemes = true;

    let filter: string = this.activatedRoute.snapshot.params.filter;
    let page: string = this.activatedRoute.snapshot.params.page;
    this.themeService.getThemes(filter, page, this.search).subscribe( themes =>
        {
          this.themes = themes;
          this.loadingThemes = false;
        });

  }

  searchByHashtag(hashtag: string): void {
    this.router.navigate(
      ['/themes/search/1'],
      {
        queryParams: { search: `[${hashtag}]` },
      });
  }


  get search() {
    return this.activatedRoute.snapshot.queryParams.search;
  }

}
