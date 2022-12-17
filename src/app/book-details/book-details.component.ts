import { Component, OnDestroy, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { catchError, map, of, Subscription } from 'rxjs';
import { Book } from '../models/book';
import { BooksDetailsService } from '../services/books-details.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  searchIcon = faSearch;
  completeBooksList: Book[];
  booksList: Book[];

  noBookFound: boolean = false;

  errorState: boolean = false;
  errorMsg: string = '';

  constructor(private booksDetailsService: BooksDetailsService) {
    this.completeBooksList = [];
    this.booksList = [];
  }

  ngOnInit(): void {
    this.subscription = this.booksDetailsService.getListOfBooks().subscribe({
      next: (response: any) => {
        let booksDetails: any = response.items;
        booksDetails.forEach((bookItem: any) => {
          let bookVolInfo = bookItem.volumeInfo;
          let book = new Book(
            bookVolInfo.title,
            bookVolInfo.authors,
            bookVolInfo.publisher,
            bookVolInfo.publishedDate
          );
          this.completeBooksList.push(book);
        });
        this.booksList = this.completeBooksList;
      },
      error: (error: any) => {
        this.errorMsg = error.message;
        this.errorState = true;
        return of([]);
      },
    });
  }

  searchBooks(searchString: string): void {
    if (searchString == '') {
      this.booksList = this.completeBooksList;
    }
    this.booksList = this.completeBooksList.filter((book) => {
      return Object.values(book)
        .flat()
        .some((val) => val.toLowerCase().includes(searchString.toLowerCase()));
    });

    this.noBookFound = !this.booksList.length;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
