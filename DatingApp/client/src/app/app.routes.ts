import { Routes } from '@angular/router';
import {
  HomeComponent,
  ListsComponent,
  MemberDetailsComponent,
  MemberListComponent,
  MessagesComponent,
} from './components';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Datting App' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        component: MemberListComponent,
        title: 'Members',
      },
      {
        path: 'members/:id',
        component: MemberDetailsComponent,
        title: 'Member Details',
      },
      { path: 'lists', component: ListsComponent, title: 'Lists' },
      { path: 'messages', component: MessagesComponent, title: 'Messages' },
    ],
  },
  {
    path: '**',
    component: HomeComponent, //change later
    title: 'Datting App',
    pathMatch: 'full',
  },
];
