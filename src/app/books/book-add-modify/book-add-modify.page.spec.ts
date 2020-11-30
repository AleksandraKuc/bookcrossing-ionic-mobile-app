import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookAddModifyPage } from './book-add-modify.page';

describe('BookAddModifyPage', () => {
  let component: BookAddModifyPage;
  let fixture: ComponentFixture<BookAddModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAddModifyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookAddModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
