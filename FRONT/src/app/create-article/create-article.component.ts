import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiBlogService } from '../services/blog.service';

@Component({
  selector: 'app-create-article',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css'
})
export class CreateArticleComponent {
  titre: string = '';
  intro: string = '';
  article: string='';
  message: string ='';
  
  constructor(private http: HttpClient, private createArticleService: ApiBlogService) { }

  
  async onSubmit(): Promise<void> {
    if (!this.titre) {
      this.message = 'Veuillez entrer un titre.';
      return;
    }

    if (!this.article) {
      this.message = 'Veuillez entrer un article.';
      return;
    }
  
    try { 
      // Requête pour créer l'article'
      this.createArticleService.postCreateArticle(this.titre, this.intro, this.article).subscribe(
        (response) => {
          console.log('Réponse création article :', response);
          this.message = `L'article' "${this.titre}" a été créé avec succès.`;
        }
      );
    } catch (error) {
      console.error('Erreur création article :', error);
      this.message = `Erreur lors de la création de l'article: "${this.titre}".`;
    }
  }
}