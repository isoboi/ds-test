import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, mergeMap, materialize, dematerialize} from 'rxjs/operators';

const users = [
  {
    email: 'admin@deepersignals.com',
    password: 'password',
    first_name: 'Admin',
    last_name: 'Deepersignals',
    role: 'Admin',
    token: 'QWRtaW5Vc2Vy'
  },
  {
    email: 'user@deepersignals.com',
    password: 'password',
    first_name: 'User',
    last_name: 'Deepersignals',
    role: 'User',
    token: 'QWRtaW5Vc2Vx'
  }
];
const assessments = [
  {
    id: 1,
    name: 'Core Drivers',
    users_resolved: 5,
    active: true,
    image_url: 'https:\/\/d1cuxz3dnd9slg.cloudfront.net\/assessments\/Core+Values+-+Cover+Photo.jpg___2020-05-15-14-13-06.jpg'
  }
];
const graph = {
  assessmentId: 1,
  data: {
    Agreeableness: 13.333333333333334,
    Drive: 21.666666666666668,
    Luck: 10,
    Openess: 30
  },
  type: 'bar'
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      // tslint:disable-next-line:max-line-length
      .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
      .pipe(delay(500))
      .pipe(dematerialize());

    // tslint:disable-next-line:typedef
    function handleRoute() {

      switch (true) {
        case url.endsWith('/api/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/api/users') && method === 'GET':
          return getUsers();
        case url.endsWith('/api/currentuser') && method === 'GET':
          return getCurrentUser();
        case url.endsWith('/api/userassessments') && method === 'GET':
          return getUserAssessments();
        case url.endsWith('/api/userassessment/graph') && method === 'GET':
          return getUserAssessmentGraph();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    // tslint:disable-next-line:typedef
    function authenticate() {
      const {email, password} = body;
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        return error('Username or password is incorrect');
      }
      return ok({
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        token: user.token
      });
    }

    // tslint:disable-next-line:typedef
    function getCurrentUser() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const token = headers.get('X-Token');
      const user = users.find(u => u.token === token);
      if (user) {
        return ok(user);
      }
    }

    // tslint:disable-next-line:typedef
    function getUsers() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(users);
    }

    // tslint:disable-next-line:typedef
    function getUserAssessments() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(assessments);
    }

    // tslint:disable-next-line:typedef
    function getUserAssessmentGraph() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(graph);
    }


    // helper functions

    // tslint:disable-next-line:typedef no-shadowed-variable
    function ok(body?) {
      return of(new HttpResponse({status: 200, body}));
    }

    // tslint:disable-next-line:typedef
    function error(message) {
      return throwError({error: {message}});
    }

    // tslint:disable-next-line:typedef
    function unauthorized() {
      return throwError({status: 401, error: {message: 'Unauthorised'}});
    }

    // tslint:disable-next-line:typedef
    function isLoggedIn() {
      const token = headers.get('X-Token');
      return token && users.some(user => user.token === token);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
