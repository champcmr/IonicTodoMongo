import { Component } from '@angular/core';

import { NavController, LoadingController, ModalController } from 'ionic-angular';

import {TaskListPage} from '../task-list/task-list';
import {NewMemberModal} from '../new-member/new-member';

import {MemberService} from '../../providers/member-service';


@Component({
    selector: 'members-list',
    templateUrl : 'members.html'
})

export class MembersPage {

    isLoading : boolean;
    members;

    constructor( public navCtrl: NavController, 
                 public modal: ModalController,
                 public loading: LoadingController,
                 public memberService: MemberService){     
        this.members = [];                             
    }   

    ionViewDidLoad(){
         let loader = this.loading.create({
            content: 'Getting Members...',
         });

         loader.present().then(()=>{
            this.getMembers(loader);
            // loader.dismiss();
         });
    }

    getMembers(loader){
        this.isLoading = true;
        this.memberService.getMembers().then((data)=>{
            if(data){
                this.members = data;             
                this.isLoading = false;                
            }
            loader.dismiss();
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