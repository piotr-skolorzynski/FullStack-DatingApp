import { Routes } from '@angular/router';
import { adminGuard, authGuard, preventUnsavedChangesGuard } from './guards';
import {
  AdminPanelComponent,
  HomeComponent,
  ListsComponent,
  MemberDetailsComponent,
  MemberEditComponent,
  MemberListComponent,
  MessagesComponent,
  NotFoundComponent,
  ServerErrorComponent,
} from './components';

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
        path: 'members/:username',
        component: MemberDetailsComponent,
        title: 'Member Details',
      },
      {
        path: 'member/edit',
        component: MemberEditComponent,
        title: 'Edit member',
        canDeactivate: [preventUnsavedChangesGuard],
      },
      { path: 'lists', component: ListsComponent, title: 'Lists' },
      { path: 'messages', component: MessagesComponent, title: 'Messages' },
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [adminGuard],
      },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: 'Not found',
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    title: 'Server error',
  },
  {
    path: '**',
    component: HomeComponent, //change later
    title: 'Datting App',
    pathMatch: 'full',
  },
];
