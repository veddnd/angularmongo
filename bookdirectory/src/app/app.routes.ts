import { Routes } from '@angular/router';
import { BookListComponent } from './book-list.component';
import {BookFormComponent} from './book-form.component'
// import { ProfileComponent } from './profile.component';

export const routes: Routes = [
    { path: 'book', component: BookListComponent },
    {path :'' , component : BookFormComponent}
];
