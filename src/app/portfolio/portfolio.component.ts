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

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
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

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.startTypingAnimation();
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
      .post('https://formspree.io/f/xjvndlza', this.contactForm.value)
      .subscribe((res) => {
        alert('Form submitted successfully!');
        this.contactForm.reset();
      });
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
