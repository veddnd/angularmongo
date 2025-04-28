import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],  // <-- Add FormsModule here
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];  // <-- Declare the books array with Book type
  editingBook: Book | null = null;
  updatedBook: Book = { _id: '', title: '', author: '', year: 0 };  // <-- Define updatedBook type

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchBooks();
  }

  fetchBooks() {
    this.http.get<Book[]>('http://localhost:5000/api/books').subscribe(
      data => this.books = data,
      error => console.error(error)
    );
  }

  deleteBook(id: string) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.http.delete(`http://localhost:5000/api/books/${id}`).subscribe(
        () => {
          this.fetchBooks();  // Refresh the list after deletion
        },
        error => console.error(error)
      );
    }
  }

  editBook(book: Book) {
    this.editingBook = book;
    this.updatedBook = { ...book };  // Copy the current book data to the update form
  }

  updateBook() {
    if (this.editingBook) {
      this.http.put<Book>(`http://localhost:5000/api/books/${this.editingBook._id}`, this.updatedBook)
        .subscribe(
          updatedBook => {
            const index = this.books.findIndex(b => b._id === updatedBook._id);
            if (index !== -1) {
              this.books[index] = updatedBook;
            }
            this.editingBook = null;
            this.updatedBook = { _id: '', title: '', author: '', year: 0 };  // Reset form
          },
          error => console.error(error)
        );
    }
  }
}

interface Book {
  _id: string;  // <-- Ensure _id is part of the Book interface
  title: string;
  author: string;
  year: number;
}
