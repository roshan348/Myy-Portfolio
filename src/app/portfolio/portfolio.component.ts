import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [],
})
export class PortfolioComponent {}
