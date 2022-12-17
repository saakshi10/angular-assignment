import { Book } from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(
      new Book('Book1', ['Author1'], 'Publisher1', 'PublishedDate')
    ).toBeTruthy();
  });
});
