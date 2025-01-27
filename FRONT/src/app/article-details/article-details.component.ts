import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { ApiBlogService } from '../services/blog.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css'],
  imports: [
    NgIf
  ]
})
export class ArticleDetailsComponent implements OnInit {
  article: any = null;
  private articleDetailsUrl = 'http://localhost:3000/article ';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private deleteArticleService: ApiBlogService
  ) { }

  ngOnInit() {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.fetchArticleDetails(articleId);
    }
  }

  fetchArticleDetails(articleId: string) {
    this.http.get(`${this.articleDetailsUrl}/${articleId}`, { withCredentials: true }).subscribe({
      next: (article: any) => {
        this.article = article;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des détails de l'article :", error);
        this.router.navigate(['/homepage']);
      }
    });
  }

  deleteArticle() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.deleteArticleService.deleteArticle(this.article._id).subscribe({
        next: () => {
          alert("L'article' a été supprimée avec succès.");
          this.router.navigate(['/homepage']);
        },
        error: (error) => {
          console.error("Erreur lors de la suppression de l'article :", error);
          alert("Une erreur est survenue lors de la suppression de l'article");
        }
      });
    }
  }
}
