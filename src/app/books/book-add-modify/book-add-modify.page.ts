import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController, ModalController } from '@ionic/angular';

import { BookDefinition } from '../../core/models/book-definition.model';
import { BookService } from '../../core/services/book.service';

@Component({
  selector: 'app-book-add-modify',
  templateUrl: './book-add-modify.page.html',
  styleUrls: ['./book-add-modify.page.scss'],
})
export class BookAddModifyPage implements OnInit {

  @Input() returnUrl: string;
  @Input() modifyId: number;
  @Input() pageMode: string;

  details: BookDefinition;

  categories: string[] = ['Biography', 'ChildrenBook', 'Guide', 'PopularScience', 'Thriller', 'Novel', 'Poetry', 'History', 'Romance', 'Education', 'Scientific', 'Adventure', 'Criminal', 'Humour', 'Science_fiction', 'Other'];

  bookForm: FormGroup;

  constructor(private bookService: BookService,
              private router: Router,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.bookForm = this.generateForm();
  }

  ionViewWillEnter() {
    if (this.pageMode === 'edit') {
      this.bookService.getBook(this.modifyId).subscribe(result => {
        this.details = result;
        this.fillForm();
      });
    }
  }

  get pageTitle(): string {
    if (this.pageMode === 'add') {
      return 'Add book';
    }
    return 'Modify book';
  }

  generateForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      author: new FormControl('', [Validators.required]),
      isbn: new FormControl(''),
      category: new FormControl('', [Validators.required]),
    });
  }

  fillForm(): void {
    this.bookForm.get('title').setValue(this.details.title);
    this.bookForm.get('description').setValue(this.details.description);
    this.bookForm.get('author').setValue(this.details.author);
    this.bookForm.get('isbn').setValue(this.details.isbn);
    this.bookForm.get('category').setValue(this.details.category);
  }

  getReturn(): string {
    return this.returnUrl || '/';
  }

  save(): void {
    if (this.bookForm.valid) {
      this.pageMode === 'add' ? this.createBook() : this.modifyBook();
    } else {
      this.failure();
    }
  }

  createBook(): void {
    const book = new BookDefinition(
        this.bookForm.get('title').value,
        this.bookForm.get('description').value,
        this.bookForm.get('author').value,
        this.bookForm.get('isbn').value,
        this.bookForm.get('category').value
    );
    this.bookService.createBook(book).subscribe(
        result => {
          this.success(encodeURIComponent(result.id_book));
        },
        error => {
          this.failure();
        });
  }

  modifyBook() {
    this.updateDefinition();
    this.bookService.updateBook(this.details).subscribe(
        result => {
          this.success(encodeURIComponent(result.id_book));
        },
        error => {
          this.failure();
        });
  }

  updateDefinition() {
    this.details.title = this.bookForm.get('title').value;
    this.details.description = this.bookForm.get('description').value;
    this.details.author = this.bookForm.get('author').value;
    this.details.isbn = this.bookForm.get('isbn').value;
    this.details.category = this.bookForm.get('category').value;
  }

  success(id: string) {
    this.alertCtrl.create({
      header: 'Success!',
      message: this.pageMode === 'edit' ? 'Book modified successfully' : 'Book added successfully!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.dismiss();
            this.router.navigateByUrl(`/navigation/books/book-details/${id}`);
          }
        }]
    }).then(alert => alert.present());
  }

  failure() {
    this.alertCtrl.create({
      header: 'Failure!',
      message: 'Please check entered data and try again',
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  backButton() {
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  get submitButton(): string {
    return this.pageMode === 'add' ? 'Create' : 'Save';
  }

  controlValid(name: string): boolean {
    return this.bookForm.get(name).hasError('required') &&
        (this.bookForm.get(name).touched ||
        this.bookForm.get(name).dirty);
  }
}
