import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'barChart';

  constructor(private router: Router) { }
  
  navigateToApi(api: string): void {
    this.router.navigate([api]);
  }
}
