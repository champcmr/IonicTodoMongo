import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NavController, ViewController } from 'ionic-angular';

import {MemberService} from '../../providers/member-service';

@Component({
    selector:'new-member',
    templateUrl : '../new-member/new-member.html'
})

export class NewMemberModal{
    
    newMemberForm: FormGroup;
    submitAttempt: boolean = false;

    firstName;
    lastName;
    email;
    gender;

    constructor(public navctrl: NavController,
                public view: ViewController,
                public formBuilder: FormBuilder,
                public memberService: MemberService){
               
        this.newMemberForm = formBuilder.group({
            firstName: [ '',
                            Validators.compose([ 
                                Validators.maxLength(30), 
                                Validators.pattern('[a-zA-Z ]*'), 
                                Validators.required])
                        ],
            lastName: [ '', 
                        Validators.compose([ 
                                Validators.maxLength(30), 
                                Validators.pattern('[a-zA-Z ]*'), 
                                Validators.required])
                        ],
            email: [ '', 
                        Validators.compose([
                            Validators.required, 
                            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])
                    ],
            gender: ['male',Validators.required]
        });
        
    }

    // getRandomId(){
    //     return Math.random().toString(36).substring(7);
    // }

    saveMember(){
        this.submitAttempt = true;

        if(!this.newMemberForm.valid){
            console.log("not success!");
        }else {
            let newMember = {
                // id : this.getRandomId(),
                firstName : this.newMemberForm.controls['firstName'].value,
                lastName: this.newMemberForm.controls['lastName'].value,
                email: this.newMemberForm.controls['email'].value,
                gender : this.newMemberForm.controls['gender'].value
            }
            this.memberService.saveMember(newMember);
            this.view.dismiss(newMember);
        }
    }
    
    close(){
        this.view.dismiss();
    }
}