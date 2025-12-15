import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'project-arcadius';

  currentYear: number = new Date().getFullYear();
  lastUpdated: Date = new Date();

  constructor() {}

  ngOnInit(): void {
    // Optional: Fetch dynamic lastUpdated from API if needed
    // this.lastUpdated = new Date(apiResponse.lastUpdated);
  }

  // Optional: Example method for header buttons
  onDashboardClick(): void {
    console.log('Dashboard clicked');
    // Navigate to dashboard or emit event
  }

  onSettingsClick(): void {
    console.log('Settings clicked');
    // Navigate to settings page or emit event
  }
}
