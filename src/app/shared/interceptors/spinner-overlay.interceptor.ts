import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoadingController } from '@ionic/angular';

import { finalize, tap, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private loadingCtrl: LoadingController) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.indexOf('http') !== 0) {
            return next.handle(req);
        }

        return from(this.loadingCtrl.create({
            spinner: 'circles',
            showBackdrop: false,
            translucent: true,
        }))
            .pipe(
                tap((loading) => {
                    return loading.present();
                }),
                switchMap((loading) => {
                    return next.handle(req).pipe(
                        finalize(() => {
                            loading.dismiss();
                        })
                    );
                })
            );
    }
}

export const httpOverlayInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
];
