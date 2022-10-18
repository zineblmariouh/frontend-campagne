import {Component, OnInit} from '@angular/core';
import {ModaliteInterventionService} from '../../../../../controller/service/ModaliteIntervention.service';
import {ModaliteInterventionVo} from '../../../../../controller/model/ModaliteIntervention.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-modalite-intervention-edit-chercheur',
  templateUrl: './modalite-intervention-edit-chercheur.component.html',
  styleUrls: ['./modalite-intervention-edit-chercheur.component.css']
})
export class ModaliteInterventionEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteInterventionService: ModaliteInterventionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedModaliteIntervention.dateArchivage = DateUtils.toDate(this.selectedModaliteIntervention.dateArchivage);
            this.selectedModaliteIntervention.dateCreation = DateUtils.toDate(this.selectedModaliteIntervention.dateCreation);
    this.modaliteInterventionService.edit().subscribe(modaliteIntervention=>{
    const myIndex = this.modaliteInterventions.findIndex(e => e.id === this.selectedModaliteIntervention.id);
    this.modaliteInterventions[myIndex] = this.selectedModaliteIntervention;
    this.editModaliteInterventionDialog = false;
    this.selectedModaliteIntervention = new ModaliteInterventionVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editModaliteInterventionDialog  = false;
}

// getters and setters

get modaliteInterventions(): Array<ModaliteInterventionVo> {
    return this.modaliteInterventionService.modaliteInterventions;
       }
set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this.modaliteInterventionService.modaliteInterventions = value;
       }

 get selectedModaliteIntervention(): ModaliteInterventionVo {
           return this.modaliteInterventionService.selectedModaliteIntervention;
       }
    set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this.modaliteInterventionService.selectedModaliteIntervention = value;
       }

   get editModaliteInterventionDialog(): boolean {
           return this.modaliteInterventionService.editModaliteInterventionDialog;

       }
    set editModaliteInterventionDialog(value: boolean) {
        this.modaliteInterventionService.editModaliteInterventionDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
