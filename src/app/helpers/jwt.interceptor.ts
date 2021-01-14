import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available

    request = request.clone({
      setHeaders: {
        'X-Token': localStorage.getItem('X-Token')
      }
    });

    return next.handle(request);
  }
}
