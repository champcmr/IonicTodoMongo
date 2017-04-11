import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { MembersPage } from '../pages/members/members';
import { TaskListPage} from '../pages/task-list/task-list';
import {NewMemberModal} from '../pages/new-member/new-member';
import {NewTaskModal} from '../pages/new-task/new-task';

import {MemberService} from '../providers/member-service';
import {TaskService} from '../providers/task-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    MembersPage,
    ListPage,   
    TaskListPage,
    NewMemberModal,
    NewTaskModal
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    MembersPage,
    TaskListPage,
    NewMemberModal,
    NewTaskModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MemberService,
    TaskService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
