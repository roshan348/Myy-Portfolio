import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener } from '@angular/core';
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
export class PortfolioComponent {
  contactForm: FormGroup;
  // isExpanded = false;
  isNavOpen = false;
  showBackToTop = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    this.http
      .post('https://formspree.io/f/xjvndlza', this.contactForm.value)
      .subscribe((res) => {
        alert('Form submitted successfully!');
        this.contactForm.reset();
      });
  }

  // toggleMenu() {
  //   this.isExpanded = !this.isExpanded;
  // }

  // closeMobileMenu() {
  //   this.isMobileMenuOpen = false;
  // }

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
