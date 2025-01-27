import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { ApiBlogService } from '../services/blog.service';

@Component({
  selector: 'app-homepage',
  imports: [
    NgIf,
    NgFor,
    RouterModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  welcomeMessage: string = '';
  isAdmin: boolean = false;
  users: any[] = [];
  articles: any[] = [];


  private apiUrl = 'http://localhost:3000/user';
  private articleUrl = 'http://localhost:3000/article';
  private logoutUrl = 'http://localhost:3000/logout';

  constructor(private http: HttpClient, private router: Router, private getUsers: ApiBlogService,private getArticles: ApiBlogService) { }

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get(this.apiUrl, { withCredentials: true }).subscribe({
      next: (user: any) => {
        this.welcomeMessage = `Bienvenue, ${user.name}, vous êtes ${user.role}.`;
        this.isAdmin = user.role === 'admin';

        if (this.isAdmin) {
          this.fetchUsersData();
        }
      },
      error: () => {
        console.log('Erreur Homepage redirection vers /login')
        this.router.navigate(['/login']);
      }
    });
  }

  fetchUsersData() {
    this.getUsers.getUsers().subscribe({
      next: (users: any[]) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des users :', error);
        this.users = [];
      }
    });
  }

  fetchAticlesData() {
    this.getArticles.getArticles().subscribe({
      next: (users: any[]) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles :', error);
        this.users = [];
      }
    });
  }

  

  logout() {
    this.http.post(this.logoutUrl, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion :', error);
      }
    });
  }



  goToCreateArticle() {
    this.router.navigate(['/createArticle']);
  }

  goToUserDetails(userId: string) {
  this.router.navigate([`/user/${userId}`]);
  }

  goToArticleDetails(articleId: string){
    this.router.navigate([`/article/${articleId}`]);
  }
}
