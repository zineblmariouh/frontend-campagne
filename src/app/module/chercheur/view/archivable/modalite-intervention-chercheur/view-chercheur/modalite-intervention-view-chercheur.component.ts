import {Component, OnInit} from '@angular/core';
import {ModaliteInterventionService} from '../../../../../controller/service/ModaliteIntervention.service';
import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-modalite-intervention-view-chercheur',
  templateUrl: './modalite-intervention-view-chercheur.component.html',
  styleUrls: ['./modalite-intervention-view-chercheur.component.css']
})
export class ModaliteInterventionViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteInterventionService: ModaliteInterventionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewModaliteInterventionDialog  = false;
}

// getters and setters

get modaliteInterventions(): Array<ModaliteInterventionVo> {
    return this.modaliteInterventionService.modaliteInterventions;
       }
set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }

 get selectedModaliteIntervention():ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
    set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }

   get viewModaliteInterventionDialog():boolean {
           return this.modaliteInterventionService.viewModaliteInterventionDialog;

       }
    set viewModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.viewModaliteInterventionDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
