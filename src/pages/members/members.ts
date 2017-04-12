import { Component } from '@angular/core';

import { NavController, ModalController } from 'ionic-angular';

import {TaskListPage} from '../task-list/task-list';
import {NewMemberModal} from '../new-member/new-member';

import {MemberService} from '../../providers/member-service';


@Component({
    selector: 'members-list',
    templateUrl : 'members.html'
})

export class MembersPage {

    members;

    constructor( public navCtrl: NavController, 
                 public modal: ModalController,
                 public memberService: MemberService){     
        this.members = [];                             
    }   

    ionViewDidLoad(){
        this.getMembers();
    }

    getMembers(){
        this.memberService.getMembers().then((data)=>{
            this.members = data; 
        });
    }

    viewMemberTask(event, member){
        this.navCtrl.push(TaskListPage, {
            selectedMember : member
        });
    }

    removeMember(event, member){
        this.members.forEach((data, index, object)=>{
            if(data._id === member._id){
                object.splice(index,1);
            }
        })
        this.memberService.deleteMember(member._id);
    }

    openMemberModal(){
        let addMemberModal = this.modal.create(NewMemberModal);

        addMemberModal.onDidDismiss((member)=>{
            if(member){
                this.members.push(member);
            }
        });
    
        addMemberModal.present();
    }

}