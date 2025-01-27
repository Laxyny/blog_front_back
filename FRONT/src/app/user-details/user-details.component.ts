import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  imports: [
    NgIf
  ]
})
export class UserDetailsComponent implements OnInit {
  user: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.fetchUserDetails(userId);
  }

  fetchUserDetails(userId: string | null) {
    if (!userId) return;

    this.http.get(`http://localhost:3000/user/${userId}`, { withCredentials: true }).subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
      }
    });
  }

  // Permissions
  addWritePermission(userId: string | null) {
    if (!userId) return;

    const body = {
      permissions: ['read', 'write']
    };

    this.http.put(`http://localhost:3000/users/${userId}/permissions/`, body, { withCredentials: true }).subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout de permission à l'utilisateur :", error);
      }
    });
  }

  deleteWritePermission(userId: string | null) {
    if (!userId) return;

    const body = {
      permissions: ['read']
    };

    this.http.put(`http://localhost:3000/users/${userId}/permissions/`, body, { withCredentials: true }).subscribe({
      next: (user: any) => {
        this.user = user;
      },
      error: (error) => {
        console.error("Erreur lors de la suppression de permission à l'utilisateur :", error);
      }
    });
  }
}
