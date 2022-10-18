import {Component, OnInit} from '@angular/core';
import {ModaliteFormationContinueService} from '../../../../../controller/service/ModaliteFormationContinue.service';
import {ModaliteFormationContinueVo} from '../../../../../controller/model/ModaliteFormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-modalite-formation-continue-view-admin',
  templateUrl: './modalite-formation-continue-view-admin.component.html',
  styleUrls: ['./modalite-formation-continue-view-admin.component.css']
})
export class ModaliteFormationContinueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteFormationContinueService: ModaliteFormationContinueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewModaliteFormationContinueDialog  = false;
}

// getters and setters

get modaliteFormationContinues(): Array<ModaliteFormationContinueVo> {
    return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }

 get selectedModaliteFormationContinue():ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
    set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }

   get viewModaliteFormationContinueDialog():boolean {
           return this.modaliteFormationContinueService.viewModaliteFormationContinueDialog;

       }
    set viewModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.viewModaliteFormationContinueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
