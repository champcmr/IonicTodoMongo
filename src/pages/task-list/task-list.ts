import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { NewTaskModal } from '../new-task/new-task';
import { TaskService } from '../../providers/task-service';
import * as moment from 'moment';

@Component({
    selector: 'page-task-list',
    templateUrl:'task-list.html'
})

export class TaskListPage{
  selectedMember: any;
  tasks;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modal : ModalController,
              public taskService: TaskService
              ) {  
      this.tasks = [];          
  }

  ionViewDidLoad(){
      this.selectedMember = this.navParams.get('selectedMember');
      this.getTasks(this.selectedMember._id);
  }

  getTasks(memberId){
      this.taskService.getTasks(memberId).then((data)=>{
        if(data){
          this.tasks = data;
        }
      })
  }

  checkDueDate(taskDate){
      return moment().diff(moment(taskDate),'days') > 0 ? true : false;
  }

  modifyTask(task){
    console.log('Modi: ',task);
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

  saveTaskToStorage(task){
      // store memberId with each task
      task["refMemberId"] = this.selectedMember._id;
      this.tasks.push(task);
      this.taskService.addTask(task);    
  }

  addTask(){
      let addTaskModal = this.modal.create(NewTaskModal);

      addTaskModal.onDidDismiss((task)=>{ 
          if(task){
              this.saveTaskToStorage(task);
          }
      });

      addTaskModal.present();
  }

}
