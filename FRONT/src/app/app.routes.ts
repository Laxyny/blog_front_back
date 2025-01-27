import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { AuthGuard } from './guards/auth.guard';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', component: HomeComponent },

    //Homepage
    { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
    { path: 'user/:id', component: UserDetailsComponent, canActivate: [AuthGuard] }, //Aller sur la page d'un user
    { path: 'getArticle/:id', component: ArticleDetailsComponent, canActivate: [AuthGuard] }, //Aller sur la page d'un article

    //Create article
    { path: 'createArticle', component: CreateArticleComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
