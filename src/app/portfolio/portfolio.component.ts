import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [],
})
export class PortfolioComponent {
  constructor(private http: HttpClient) {}
  // onSubmit() {
  //   this.http
  //     .post('https://formspree.io/f/mvoeyvvl', this.contactUs.value)
  //     .subscribe((res) => {
  //       console.log('res', res);
  //       alert('Form submitted successfully!');
  //       // Clear form fields
  //       this.contactUs.reset();
  //     });
  // }
}
