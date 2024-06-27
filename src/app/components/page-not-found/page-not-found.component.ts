import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // ... any initialization logic if needed
  }

  goBack() {
    this.router.navigate(['/home']); 
  }

}
