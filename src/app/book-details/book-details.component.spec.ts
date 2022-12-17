import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { cold, getTestScheduler } from 'jasmine-marbles';

import { BooksDetailsService } from '../services/books-details.service';

import { BookDetailsComponent } from './book-details.component';

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

const booksDetailsServiceMock = jasmine.createSpyObj('BooksDetailsService', [
  'getListOfBooks',
]);

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      providers: [
        { provide: BooksDetailsService, useValue: booksDetailsServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    booksDetailsServiceMock.getListOfBooks.and.returnValue(of(mockData));
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data when getListOfBooks is called on initialization', () => {
    fixture.detectChanges();
    expect(booksDetailsServiceMock.getListOfBooks).toHaveBeenCalled();
  });

  it('should get list of books when getListOfBooks receives response', () => {
    const mockData$ = cold('-s|', { s: mockData });
    booksDetailsServiceMock.getListOfBooks.and.returnValue(mockData$);
    fixture.detectChanges();
    getTestScheduler().flush();
    expect(component.completeBooksList.length).toBe(2);
    expect(component.booksList).toEqual(component.completeBooksList);
  });
});
