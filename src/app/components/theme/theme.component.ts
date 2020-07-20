import { Component, OnInit } from '@angular/core';
import {Message} from '../../_models/Message';
import {ThemeService} from '../../_services/theme.service';
import {MessageService} from '../../_services/message.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SpecificTheme} from '../../_models/SpecificTheme';
import {AuthService} from '../../_services/auth.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  theme: SpecificTheme;
  messages: Message[];
  replies: Message[] = [];
  repliesPage: number;
  createMessage: Message = null;
  changeTheme: SpecificTheme = null;

  loadingTheme: boolean = false;
  loadingMessages: boolean = false;
  idShowActions: number = null;
  showThemeActions: boolean = false;
  currentPage: number;
  pagesCount: number;

  constructor(
    private themeService: ThemeService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public authService: AuthService) {

      this.currentPage = this.activatedRoute.snapshot.params.page;
      this.repliesPage = 0;
      this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.loadContent();
        }
      })
  }

  ngOnInit(): void {
  }


  get loading(): boolean {
    return this.loadingMessages && this.loadingTheme;
  }

  loadContent(): void {
    this.loadingMessages = true;
    this.loadingTheme = true;

    const page = this.activatedRoute.snapshot.params.page;
    const themeId = this.activatedRoute.snapshot.params.id;
    this.themeService.getTheme(themeId).subscribe(theme => {
        this.theme = theme;
        this.messageService.getPagesCountForTheme(this.theme.id).subscribe(pagesCount => {
          this.pagesCount = pagesCount;
          this.loadingTheme = false;
        });

    });

    this.messageService.getMessagesInTheme(themeId, page).subscribe( messages => {
      this.messages = messages;
      this.loadingMessages = false;
    })
  }

  searchByHashtag(hashtag: string): void {
    this.router.navigate(
      ['/themes/search/1'],
      {
        queryParams: { search: `[${hashtag}]` },
      });
  }

  userIsAuthor(authorUsername: string): boolean {
    return this.authService.getCurrentUser()?.username === authorUsername;
  }

  loadReplies(messageId: number): void {
    this.replies = [];
    if (this.replies.length > 0 && messageId == this.replies[0].replyMessageId) {
      this.repliesPage++;
    }
    else {
      this.repliesPage = 1;
    }

    for (let i = 1; i <= this.repliesPage; i++)
    {
      this.messageService.getRepliesForMessage(messageId, i).subscribe(replies => {
        this.replies = this.replies.concat(replies);
      })
    }
  }

  isLastRepliesPage(): boolean {
    const pageSize = 15;
    return this.replies.length < pageSize * this.repliesPage;
  }

  closeReplies(): void {
    this.replies = [];
    this.repliesPage = 1;
  }


  writeMessage(): void {
    if (!this.authService.userIsLoggedIn()) {
      this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } })
    }
    this.createMessage = { themeId: this.theme.id } as Message;
  }


  editMessage(message: Message): void {
    this.createMessage = { ...message, author: { ...message.author } }
  }


  replyMessage(message: Message): void {
    if (!this.authService.userIsLoggedIn()) {
      this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } })
    }
    this.createMessage = {
      themeId: this.theme.id,
      replyMessageId: message.id
    } as Message;

  }


  deleteMessage(message: Message): void {
    this.messageService.deleteMessage(message.id).subscribe( () => {
      this.reloadContent(message);
    })
  }


  reportMessage(message: Message): void {

  }


  showActions(id: number): void {
    if (this.idShowActions == id) this.idShowActions = null;
    else this.idShowActions = id;
  }


  postMessage(message: Message): void {
    if (message.id == null)
    {
      this.messageService.createMessage(message).subscribe(message =>
      {
        this.reloadContent(message);
        this.createMessage = null;
      })
    }
    else {
      this.messageService.updateMessage(message).subscribe(() =>
      {
        this.reloadContent(message);
        this.createMessage = null;
      });
    }
  }


  reloadContent(messageChanged: Message) {
    this.idShowActions = null;
    this.loadContent();
    if (messageChanged?.replyMessageId != null) this.loadReplies(messageChanged.replyMessageId);
  }

  editTheme(): void {
    this.changeTheme = { ...this.theme, author: { ...this.theme.author} }
  }

  postTheme(theme: SpecificTheme): void {
    this.changeTheme = null;
    this.showThemeActions = false;
    this.loadContent();
  }


  deleteTheme(): void {
    this.themeService.deleteTheme(this.theme.id).subscribe(() => {
      this.router.navigate(['/']);
    })
  }


  private changePage(): void {
    this.router.navigate([`/theme/${this.theme.id}/${this.currentPage}`]);
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

  toLastPage(): void {
    this.currentPage = this.pagesCount;
    this.changePage();
  }

}

