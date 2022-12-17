import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { BooksDetailsService } from './books-details.service';

describe('BooksDetailsService', () => {
  let service: BooksDetailsService;

  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  const mockData = {
    items: [
      {
        volumeInfo: {
          title: 'SAT Prep Plus 2021',
          authors: ['Kaplan Test Prep'],
          publisher: 'Simon and Schuster',
          publishedDate: '2020-06-02',
        },
      },
      {
        volumeInfo: {
          title: 'Official Guide to OET',
          authors: ['Kaplan Test Prep'],
          publisher: 'Simon and Schuster',
          publishedDate: '2020-03-03',
        },
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new BooksDetailsService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of books', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockData));

    service.getListOfBooks().subscribe({
      next: (response) => {
        expect(response).toEqual(mockData);
        done();
      },
      error: done.fail,
    });
  });
});
