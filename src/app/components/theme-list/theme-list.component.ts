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
  loading: boolean = false;


  pageSize: number = 15;
  currentPage: number = 1;


  constructor(
    private themeService: ThemeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
      this.router.events.subscribe((val) => {

      if (val instanceof NavigationEnd)
      {
        this.loadThemes();

      }
    })
  }


  ngOnInit(): void {

  }

  isChosenFilter(filter: string): boolean {
    return this.activatedRoute.snapshot.params.filter === filter;
  }

  loadThemes(): void {
    this.loading = true;

    let filter: string = this.activatedRoute.snapshot.params.filter;
    let page: string = this.activatedRoute.snapshot.params.page;

    console.log(filter, page);
    this.themeService.getThemes(filter, page, this.search).subscribe( themes =>
        {
          this.themes = themes;
          this.loading = false;
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



  private changePage(): void {
    const filter = this.activatedRoute.snapshot.params.filter;
    this.router.navigate([`/themes/${filter}/${this.currentPage}`],
      { queryParams: this.activatedRoute.snapshot.queryParams } );
  }

  toFirstPage(): void {
    this.currentPage = 1;
    this.changePage();
  }

  toNextPage(): void {
    this.currentPage++;
    this.changePage();
  }

  toPreviousPage(): void {
    this.currentPage--;
    this.changePage();
  }


  isLastPage(): boolean {
    return this.themes.length < this.pageSize;
  }
}
