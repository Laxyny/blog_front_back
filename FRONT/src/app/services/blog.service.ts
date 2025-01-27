import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiBlogService {
    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get('http://localhost:3000/users', { withCredentials: true });
    }

    getArticles(): Observable<any> {
        return this.http.get('http://localhost:3000/getAllArticles', { withCredentials: true });
    }


    postCreateArticle(titre: string, intro: string, article: string): Observable<any> {
        return this.http.post(
            'http://localhost:3000/createArticle',
            {
                titre: titre,
                intro: intro,
                article: article
            }, { withCredentials: true }
        );
    }
    deleteUser(userId: string): Observable<any> {
        return this.http.delete(`http://localhost:3000/deleteUser/${userId}`, { withCredentials: true });
    }

    deleteArticle(articleId: string):Observable<any>{
        return this.http.delete(`http://localhost:3000/deleteArticle/${articleId}`, { withCredentials: true });
    }
}
