import {Component, OnInit} from '@angular/core';
import {FadeAnimationUtil} from 'src/app/utils/animation/fade-animation.util';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  readonly FadeAnimationUtil = FadeAnimationUtil;

  nameFormControl: FormControl;
  emailFormControl: FormControl;
  messageFormControl: FormControl;
  loading = false;
  submitMessage: string = '';

  constructor(private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    this.nameFormControl = new FormControl('', Validators.required);
    this.emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this.messageFormControl = new FormControl('', Validators.required);
  }

  onSendMessage(): void {
    if (this.nameFormControl.valid && this.emailFormControl.valid && this.messageFormControl.valid) {
      this.loading = true;
      const name = this.nameFormControl.value;
      const email = this.emailFormControl.value;
      const message = this.messageFormControl.value;

      const headers = new HttpHeaders({'Content-Type': 'application/json'});
      this.http.post(
        'https://formspree.io/meqrnbgz',
        {name: name, replyTo: email, message: message},
        {'headers': headers}
      ).subscribe(res => {
        this.loading = false;
        this.submitMessage = 'Thanks for reaching out to me.';
        setTimeout(() => this.submitMessage = '', 5000);
        this.nameFormControl.reset();
        this.emailFormControl.reset();
        this.messageFormControl.reset();
      })
    }
  }
}
