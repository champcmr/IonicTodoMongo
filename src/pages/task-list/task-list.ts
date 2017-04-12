import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ModalController } from 'ionic-angular';

import { NewTaskModal } from '../new-task/new-task';
import { TaskService } from '../../providers/task-service';
import * as moment from 'moment';

@Component({
    selector: 'page-task-list',
    templateUrl:'task-list.html'
})

export class TaskListPage{
  selectedMember: any;
  isLoading: boolean;
  tasks;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modal : ModalController,
              public loading: LoadingController,
              public taskService: TaskService
              ) {  
      this.tasks = [];          
  }

  ionViewDidLoad(){
      let loader = this.loading.create({
            content: 'Getting Tasks...',
      });
      this.selectedMember = this.navParams.get('selectedMember');

      loader.present().then(()=>{
            this.getTasks(loader, this.selectedMember._id);
      });
      
  }

  getTasks(loader, memberId){
      console.log('Get Task: ',memberId);
      this.isLoading = true;
      this.taskService.getTasks(memberId).then((data)=>{
        if(data){
          this.tasks = data;
          this.isLoading = false;
        }  
        loader.dismiss();
      })
  }

  checkDueDate(taskDate){
      return moment().diff(moment(taskDate),'days') > 0 ? true : false;
  }

  modifyTask(task){
    // console.log('Modify: ',task.status);
    this.taskService.updateTask(task);
  }

  removeTask(task){
      this.tasks.forEach((data,index,object)=>{
        if(data._id === task._id){
           console.log('Remove task: ',task,index);
           object.splice(index,1);
        }
      })
      this.taskService.deleteTask(task._id);
  }

  openTaskModal(){
    
      let addTaskModal = this.modal.create(NewTaskModal,this.selectedMember);

      addTaskModal.onDidDismiss((task)=>{ 
          if(task){
              this.tasks.push(task);
          }
      });

      addTaskModal.present();
  }

}
