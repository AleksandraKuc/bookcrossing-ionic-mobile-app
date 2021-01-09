import { BookHistoryDefinition } from './bookHistory-definition.model';

export class BookDefinition {
    // tslint:disable-next-line:variable-name
    id_book: number;
    title: string;
    description: string;
    author: string;
    isbn: number;
    category: string;
    history: BookHistoryDefinition;

    constructor(title: string, description: string, author: string, isbn: number, category: string) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.isbn = isbn;
        this.category = category;
    }

    setId(id: number): void {
        this.id_book = id;
    }
}
