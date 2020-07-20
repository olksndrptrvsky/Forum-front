import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../_models/User';
import {UserService} from '../../_services/user.service';
import {ThemeService} from '../../_services/theme.service';

@Component({
  selector: 'app-appoint-moders',
  templateUrl: './appoint-moders.component.html',
  styleUrls: ['./appoint-moders.component.css']
})
export class AppointModersComponent implements OnInit {
  allModers: string[];

  selectedAll: string = null;

  selectedAppointed: string = null;

  appointedModers: string[] = [];

  @Input() themeId: number;
  @Output() onAppoint = new EventEmitter();
  constructor(
    private userService: UserService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.userService.getAllModers().subscribe( moders => {
      this.allModers = moders;
    })
  }

  moveToAppointed(moder: string): void {
    this.allModers = this.allModers.filter(m => m != moder);
    if (moder != null)
      this.appointedModers.push(moder);
    this.selectedAll = null;
  }

  removeFromAppointed(moder: string): void {
    this.appointedModers = this.appointedModers.filter(m => m != moder);
    if (moder != null)
      this.allModers.push(moder);
    this.selectedAppointed = null;
  }


  appointModers(): void {
    if (this.appointedModers.length == 0) return;

    for (let moder of this.appointedModers)
    {
      this.themeService.addModerToTheme({ themeId: this.themeId, moderUsername: moder})
        .subscribe((res) => this.onAppoint.emit());
    }

  }

}
