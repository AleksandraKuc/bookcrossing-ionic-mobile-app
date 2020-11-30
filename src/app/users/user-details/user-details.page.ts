import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { AlertController } from '@ionic/angular';

import { ReportInfo } from '../../shared/models/report-info';
import { ReportService } from '../../core/services/report.service';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { UserDefinition } from '../../core/models/user-definition.model';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage {

  details: UserDefinition;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private alertCtrl: AlertController,
              private reportService: ReportService) { }

  ionViewWillEnter() {
    const username = this.activatedRoute.snapshot.paramMap.get('username');
    this.userService.getUser(username).subscribe(result => {
      this.details = result;
    });
  }

  get isProfileView(): boolean {
    return this.tokenStorage.areUsernameEquals(this.details?.username);
  }

  get buttonText(): string {
    if (this.isProfileView) {
      return 'Show my books';
    }
    return 'Show user\'s books';
  }

  showUsersBooks(): void {
    this.router.navigate(['navigation/books/user-books'], { state: { username: this.details.username }});
  }

  reportUser() {
    this.openReportDialog();
  }

  get isLogged(): boolean {
    return this.tokenStorage.isLoggedIn();
  }

  openReportDialog() {
    this.alertCtrl.create({
      header: 'Create report',
      subHeader: `Reporting ${this.details.username}`,
      inputs: [
        {
          name: 'content',
          type: 'text',
          placeholder: 'Enter report reason...'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Send report',
          handler: (alertData) => {
            this.sendReport(alertData.content);
          }
        }
      ]
    }).then(alert => alert.present());
  }

  sendReport(content) {
    const report = new ReportInfo(this.details.username, content);
    this.reportService.createReport(report).subscribe( () => {
      this.showSuccess();
    });
  }

  showSuccess() {
    this.alertCtrl.create({
      header: 'Success',
      message: 'Report sent successfully',
      buttons: ['OK']
    }).then(alert => alert.present());
  }
}
