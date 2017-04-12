import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TaskService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskService {

  // tasksData : any;
  headers = new Headers();

  constructor(public http: Http) {
    console.log('Hello TaskService Provider');
    // this.tasksData = null;
    this.headers.append('Content-Type', 'application/json');
  }

  getTasks(memberId){
    
    // if(this.tasksData){
    //   return Promise.resolve(this.tasksData);
    // }

    return new Promise(resolve => {
      this.http.get('http://192.168.0.113:8080/api/tasks/'+memberId)
              .map(res => res.json())
              .subscribe(data => {
                  // this.tasksData = data;
                  resolve(data);
              });
    })

  }

  addTask(task){
      this.http.post('http://192.168.0.113:8080/api/add-task',JSON.stringify(task), {headers: this.headers})
      .subscribe(res => {
          // console.log('after adding task: ',res.json());
      });
  }

  deleteTask(id){
    this.http.delete('http://192.168.0.113:8080/api/delete-task/' + id).subscribe((res) => {
      // console.log(res.json());
    });    
  }

  updateTask(task){
    this.http.put('http://192.168.0.113:8080/api/update-task/' + task.taskId, JSON.stringify(task), {headers: this.headers})
      .subscribe(res =>{});
  }

}
