import { Component, OnInit } from '@angular/core';
import {Theme} from '../../_models/Theme';
import {ActivatedRoute, Router} from '@angular/router';
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
  ) { }


  ngOnInit(): void {
    this.loadThemes(this.router.url);
  }

  isChosenFilter(filter: string): boolean {
    return this.activatedRoute.snapshot.params.filter === filter;
  }

  loadThemes(newRoute: string): void {
    this.loadingThemes = true;
    this.router.navigate([`${newRoute}`]).then(() => {
      let filter: string = this.activatedRoute.snapshot.params.filter;
      let page: string = this.activatedRoute.snapshot.params.page;

      this.themeService.getThemes(filter, page).subscribe( themes =>
      {
        this.themes = themes;
        this.loadingThemes = false;
      });
    });

  }
}
