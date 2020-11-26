import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../core/services/book.service';
import {BookDefinition} from '../../core/models/book-definition.model';
import {UserDefinition} from '../../core/models/user-definition.model';
import {HistoryUsersService} from '../../core/services/history-users.service';
import {UserService} from '../../core/services/user.service';
import {TokenStorageService} from '../../shared/services/token-storage.service';
import {ConversationService} from '../../core/services/conversation.service';
import {MessageDefinition} from '../../core/models/message-definition.model';
import {ConversationDefinition} from '../../core/models/conversation-definition.model';

@Component({
    selector: 'app-book-details',
    templateUrl: './book-details.page.html',
    styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {

    details: BookDefinition;
    currentUser: UserDefinition;
    isFavourite = false;

    constructor(private activatedRoute: ActivatedRoute,
                private bookService: BookService,
                private userService: UserService,
                private historyUsersService: HistoryUsersService,
                private conversationService: ConversationService,
                private tokenStorage: TokenStorageService,
                private router: Router) {
    }

    ngOnInit() {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.bookService.getBook(id).subscribe(result => {
            this.details = result;
            this.getCurrentUser();
        });
    }

    getCurrentUser(): void {
        this.historyUsersService.getUserHistory(this.details.history.id_history).subscribe(result => {
            let userId: number;
            if (result) {
                let index = result.findIndex(item => item.userType === 'currentUser');
                if (index === -1) {
                    index = 0;
                }
                userId = result[index].id_historyUsers.id_user;
                this.userService.getUserById(userId).subscribe(element => {
                    this.currentUser = element;
                });
            }
        });
    }

    protected modifyLink(id: number): string {
        return `books/edit/${encodeURIComponent(id)}`;
    }

    editBook(): void {
        this.router.navigate([this.modifyLink(this.details.id_book)]);
    }

    deleteBook(): void {
        this.bookService.deleteBook(this.details.id_book).subscribe(() => {
            this.router.navigate([`/books`]);
        });
    }

    protected userLink(username: string): string {
        return `users/details/${encodeURIComponent(username)}`;
    }

    showUserProfile(): void {
        const username = this.currentUser.username;
        this.router.navigate([this.userLink(username)]);
    }

    protected checkFavourites(): void {
        this.bookService.checkIfFavourite(this.details.id_book).subscribe(data => {
            this.isFavourite = data;
        });
    }

    addToFavourites(): void {
        this.bookService.addToFavourites(this.details.id_book).subscribe(() => {
            this.isFavourite = true;
        });
    }

    removeFromFavourites(): void {
        this.bookService.removeFromFavourites(this.details.id_book).subscribe(() => {
            this.isFavourite = false;
        });
    }

    get isLoggedUser(): boolean {
        return !!this.tokenStorage.getUsername();
    }

    get isMyBook(): boolean {
        return this.currentUser?.username === this.tokenStorage.retrieveUsername();
    }

    reserveBook(): void {
        this.conversationService.checkIfExists(this.currentUser.username)
            .subscribe(
                response => {
                    if (!response) {
                        this.conversationService.createConversation(this.currentUser.username)
                            .subscribe(
                                (conversation: ConversationDefinition) => {
                                    this.sendMessage(conversation.id_conversation);
                                });
                    } else {
                        this.conversationService.getConversationByUsers(this.currentUser.username)
                            .subscribe(
                                (conversation: ConversationDefinition) => {
                                    this.sendMessage(conversation.id_conversation);
                                }
                            );
                    }
                });
    }

    sendMessage(conversationId: number): void {
        const content = this.details.isbn !== null ?
            `Hi, I want to reserve book  "${this.details.title}" with isbn code ${this.details.isbn}` :
            `Hi, I want to reserve book  "${this.details.title}"`;

        const message = new MessageDefinition(
            content, this.currentUser?.username, conversationId
        );
        this.conversationService.sendMessage(message).subscribe(
            () => {
                console.log('reserved'); // tu powinien być alert, że book reserved
                // message sent to current owner of the book. Go to our web page to see details.
            }
        );
    }

}
