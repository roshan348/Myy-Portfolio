import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import * as AOS from 'aos';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    // BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
  ],
  providers: [MessageService],
})
export class PortfolioComponent implements OnInit {
  contactForm: FormGroup;
  isNavOpen = false;
  showBackToTop = false;
  texts: string[] = ['Angular Developer', 'Frontend Developer'];
  typedText: string = '';
  currentTextIndex: number = 0;
  currentLetterIndex: number = 0;
  typingSpeed: number = 90;
  pauseDuration: number = 500;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.startTypingAnimation();

    AOS.init({
      duration: 1200,
      once: false,
      offset: 50,
    });
  }

  startTypingAnimation() {
    this.typeNextLetter();
  }

  typeNextLetter() {
    if (this.currentLetterIndex < this.texts[this.currentTextIndex].length) {
      this.typedText += this.texts[this.currentTextIndex].charAt(
        this.currentLetterIndex
      );
      this.currentLetterIndex++;
      setTimeout(() => this.typeNextLetter(), this.typingSpeed);
    } else {
      setTimeout(() => this.startDeletingAnimation(), this.pauseDuration);
    }
  }

  startDeletingAnimation() {
    if (this.typedText.length > 0) {
      this.typedText = this.typedText.slice(0, -1);
      setTimeout(() => this.startDeletingAnimation(), this.typingSpeed);
    } else {
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      this.currentLetterIndex = 0;
      setTimeout(() => this.typeNextLetter(), this.typingSpeed);
    }
  }

  onSubmit() {
    this.http
      .post('https://formspree.io/f/mvgoppqn', this.contactForm.value)
      .subscribe(
        (res) => {
          console.log('Called');
          this.messageService.add({
            severity: 'success',
            detail: 'Form submitted successfully',
          });
          this.contactForm.reset();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            detail: 'Failed to send message',
          });
          console.error(error);
        }
      );
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.showBackToTop = true;
    } else {
      this.showBackToTop = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
