import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EnjeuxIrdConsultanceScientifiquePonctuelle.service';
import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-enjeux-ird-consultance-scientifique-ponctuelle-edit-chercheur',
  templateUrl: './enjeux-ird-consultance-scientifique-ponctuelle-edit-chercheur.component.html',
  styleUrls: ['./enjeux-ird-consultance-scientifique-ponctuelle-edit-chercheur.component.css']
})
export class EnjeuxIrdConsultanceScientifiquePonctuelleEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdConsultanceScientifiquePonctuelleService: EnjeuxIrdConsultanceScientifiquePonctuelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enjeuxIrdConsultanceScientifiquePonctuelleService.edit().subscribe(enjeuxIrdConsultanceScientifiquePonctuelle=>{
    const myIndex = this.enjeuxIrdConsultanceScientifiquePonctuelles.findIndex(e => e.id === this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle.id);
    this.enjeuxIrdConsultanceScientifiquePonctuelles[myIndex] = this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle;
    this.editEnjeuxIrdConsultanceScientifiquePonctuelleDialog = false;
    this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = new EnjeuxIrdConsultanceScientifiquePonctuelleVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateconsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle: string) {
                      const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'add');
                       if(isPermistted){
         this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
        this.createConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEnjeuxIrdConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get enjeuxIrdConsultanceScientifiquePonctuelles(): Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
    return this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelles;
       }
set enjeuxIrdConsultanceScientifiquePonctuelles(value: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.enjeuxIrdConsultanceScientifiquePonctuelles = value;
       }

 get selectedEnjeuxIrdConsultanceScientifiquePonctuelle(): EnjeuxIrdConsultanceScientifiquePonctuelleVo {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.selectedEnjeuxIrdConsultanceScientifiquePonctuelle;
       }
    set selectedEnjeuxIrdConsultanceScientifiquePonctuelle(value: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.selectedEnjeuxIrdConsultanceScientifiquePonctuelle = value;
       }

   get editEnjeuxIrdConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.enjeuxIrdConsultanceScientifiquePonctuelleService.editEnjeuxIrdConsultanceScientifiquePonctuelleDialog;

       }
    set editEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.enjeuxIrdConsultanceScientifiquePonctuelleService.editEnjeuxIrdConsultanceScientifiquePonctuelleDialog = value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
      set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
       get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
       set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }
       get createConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog;
       }
      set createConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
