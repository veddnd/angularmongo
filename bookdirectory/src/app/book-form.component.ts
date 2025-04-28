import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  imports : [FormsModule,HttpClientModule],
  templateUrl: './book-form.component.html',
})
export class BookFormComponent {
  book = {
    title: '',
    author: '',
    year: null
  };

  constructor(private http: HttpClient) { }

  addBook() {
    this.http.post('http://localhost:5000/api/books', this.book).subscribe({
      next: (res) => {
        console.log('Book added:', res);
        alert('Book saved successfully! 🎉');
        this.book = { title: '', author: '', year: null }; // clear form
      },
      error: (err) => {
        console.error('Error adding book:', err);
        alert('Something went wrong! 🚫');
      }
    });
  }

  onMouseEnter(event: MouseEvent) {
    (event.target as HTMLElement).style.backgroundColor = '#1d4ed8'; // Darker blue on hover
  }
  
  onMouseLeave(event: MouseEvent) {
    (event.target as HTMLElement).style.backgroundColor = '#2563eb'; // Normal blue after hover
  }
  

}
