import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserDataService} from '../../services/user-data.service';
import {User} from '../../interfaces/user';
import {Assessments} from '../../interfaces/assessments';
import {Graph} from '../../interfaces/graph';
import {AuthService} from '../../services/auth.service';
import {Role} from '../../interfaces/role.enum';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User;
  userAssessments: Assessments[];
  userAssessmentGraph: Graph;
  isActive = false;
  role = Role;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userDataService: UserDataService
  ) {
  }

  ngOnInit(): void {
    this.initData();
    this.userDataService.getCurrentUser().subscribe(currentUser => {
      this.currentUser = currentUser;
    });
  }

  ngOnDestroy(): void {

  }

  initData(): void {
    this.userDataService.getUserAssessments()
      .subscribe((assessments) => {
        this.userAssessments = assessments;
      });
    this.userDataService.getUserAssessmentGraph()
      .subscribe((graph) => {
        this.userAssessmentGraph = graph;
      });

  }


  getGraph(id: number): void {
    if (this.userAssessmentGraph.assessmentId === id) {
      this.isActive = !this.isActive;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
