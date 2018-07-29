import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaderResponse, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class TokenIntercepter implements HttpInterceptor {

    constructor(private service: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
     Observable<HttpEvent<any>> {
         const usrToken = localStorage.getItem('usrToken');
         if (usrToken) {
             const cloned = req.clone({
                 headers: req.headers.set('Authorization', 'Bearer ' + usrToken)
             });
             return next.handle(cloned);
         } else {
            return next.handle(req);
         }
    }
}
