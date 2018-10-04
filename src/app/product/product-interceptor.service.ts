import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let httpReq: HttpRequest<any> = req.clone({
            setHeaders: {'Content-Type': 'application/json'}
        });

        return next.handle(httpReq);
    }
}