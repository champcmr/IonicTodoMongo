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

    members = [];

    constructor( public navCtrl: NavController, 
                 public modal: ModalController,
                 public memberService: MemberService){                                  
    }   

    ionViewDidLoad(){
        this.getMembers();
    }

    getMembers(){
        this.memberService.getMembers().then((data)=>{
            this.members = data; 
            console.log('Data: ',data);
        });
    }

    fnMemberTapped(event, member){
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

    saveMemberToStorage(member){
        this.members.push(member);
        this.memberService.saveMember(member);
    }

    addMember(){
        let addMemberModal = this.modal.create(NewMemberModal);

        addMemberModal.onDidDismiss((member)=>{
            if(member){
                this.saveMemberToStorage(member);
            }
        });
    
        addMemberModal.present();
    }

}