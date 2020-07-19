import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../_models/Message';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css']
})
export class CreateMessageComponent implements OnInit {
  createMessageForm: FormGroup;
  submitted: boolean = false;

  @Input('createMessage') createMessage: Message;
  @Output() onPost = new EventEmitter<Message>()

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createMessageForm = formBuilder.group({
      text: ['', [Validators.required, Validators.maxLength(5000)]]
        });
  }

  ngOnInit(): void {

  }


  postMessage(): void {
    this.submitted = true;

    if (this.createMessageForm.invalid) return;
    this.onPost.emit(this.createMessage);
  }

}
