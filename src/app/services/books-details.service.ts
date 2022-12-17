import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksDetailsService {
  private url =
    'https://www.googleapis.com/books/v1/volumes?q=kaplan%20test%20prep';

  constructor(private httpClient: HttpClient) {}

  getListOfBooks() {
    return this.httpClient.get(this.url).pipe(
      catchError((error) => {
        let errorMsg = this.getServerErrorMessage(error);
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
        return `Not Found: ${error.message}`;
      }
      case 403: {
        return `Access Denied: ${error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${error.message}`;
      }
      default: {
        return `Unknown Server Error: ${error.message}`;
      }
    }
  }
}
