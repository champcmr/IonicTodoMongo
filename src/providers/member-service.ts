import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MemberService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MemberService {

  membersData : any;

  constructor(public http: Http) {
    console.log('Hello MemberService Provider');
    this.membersData = null;
  }

  getMembers(){
    
    if(this.membersData){
      return Promise.resolve(this.membersData);
    }

    return new Promise(resolve => {
      this.http.get('http://localhost:8080/api/members')
              .map(res => res.json())
              .subscribe(data => {
                  this.membersData = data;
                  resolve(this.membersData);
              });
    })
 
  }


  saveMember(member){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/api/add-member',JSON.stringify(member), {headers: headers})
      .subscribe(res => {
        // console.log(res.json());
      });
  }

  deleteMember(id){
    this.http.delete('http://localhost:8080/api/delete-member/' + id).subscribe((res) => {
      console.log(res.json());
    });    
 
  }

}
