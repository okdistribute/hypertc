module.exports = Book

class Book {
  static from (json) {
    var book = new Book()
    book.title = json.title
    book.author = json.author
  }
}
