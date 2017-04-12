import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import {TaskService} from '../../providers/task-service';

@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html'
})
export class NewTaskModal {
  
  newTaskForm: FormGroup;
  submitAttempt: boolean = false;
  paramMemberId : string = this.navParams.get('_id');

  dueDate;
  
  constructor(  public navCtrl: NavController,
                public view: ViewController,
                public navParams :NavParams,
                public formBuilder: FormBuilder,
                public taskService: TaskService) {
    
    this.dueDate = new Date().toISOString();

    this.newTaskForm = formBuilder.group({
       taskTitle: [ '',
                    Validators.compose([ 
                          Validators.maxLength(30),  
                          Validators.required])
                  ],
       dueDate : ['',Validators.required]
    });

  }

  ionViewDidLoad() {
    
  }

  generateRandomId(){
      return Math.random().toString(36).substring(7);
  }

  saveTask(){
    this.submitAttempt = true;

    if(!this.newTaskForm.valid){
        console.log("not save task success!");
    }else {
      let newTask = {
        taskId : this.generateRandomId(),
        refMemberId: this.paramMemberId,
        status : false,
        title : this.newTaskForm.controls['taskTitle'].value,
        dueDate : moment(this.dueDate).format("YYYY-MM-DD"),
      }
      console.log('New Task: ',newTask);
      this.taskService.addTask(newTask);   
      this.view.dismiss(newTask);
    }
  }

  close(){
    this.view.dismiss();
  }

}
