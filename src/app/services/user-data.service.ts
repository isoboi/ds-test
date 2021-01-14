import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {Assessments} from '../interfaces/assessments';
import {Graph} from '../interfaces/graph';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`/api/currentuser`);
  }

  getUserAssessments(): Observable<Assessments[]> {
    return this.http.get<Assessments[]>('/api/userassessments');
  }

  getUserAssessmentGraph(): Observable<Graph> {
    return this.http.get<Graph>('/api/userassessment/graph');
  }
}
