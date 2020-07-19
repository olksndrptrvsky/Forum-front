import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../_models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageUrl: string = '/api/message'


  constructor(
    private http: HttpClient,
  ) { }

  getMessagesInTheme(themeId: number, page: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messageUrl}/${themeId}/${page}`);
  }

  getRepliesForMessage(messageId: number, page: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.messageUrl}/${messageId}/replies/${page}`);
  }


  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(`${this.messageUrl}`, message);
  }

  deleteMessage(messageId: number): Observable<any> {
    return this.http.delete(`${this.messageUrl}/${messageId}`);
  }

  updateMessage(message: Message): Observable<any> {
    return this.http.put<Message>(`${this.messageUrl}/${message.id}`, message);
  }
}


