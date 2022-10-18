import {Component, OnInit} from '@angular/core';
import {EtablissementConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/EtablissementConsultanceScientifiquePonctuelle.service';
import {EtablissementConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/EtablissementConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-etablissement-consultance-scientifique-ponctuelle-edit-admin',
  templateUrl: './etablissement-consultance-scientifique-ponctuelle-edit-admin.component.html',
  styleUrls: ['./etablissement-consultance-scientifique-ponctuelle-edit-admin.component.css']
})
export class EtablissementConsultanceScientifiquePonctuelleEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementConsultanceScientifiquePonctuelleService: EtablissementConsultanceScientifiquePonctuelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private etablissementService: EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etablissementConsultanceScientifiquePonctuelleService.edit().subscribe(etablissementConsultanceScientifiquePonctuelle=>{
    const myIndex = this.etablissementConsultanceScientifiquePonctuelles.findIndex(e => e.id === this.selectedEtablissementConsultanceScientifiquePonctuelle.id);
    this.etablissementConsultanceScientifiquePonctuelles[myIndex] = this.selectedEtablissementConsultanceScientifiquePonctuelle;
    this.editEtablissementConsultanceScientifiquePonctuelleDialog = false;
    this.selectedEtablissementConsultanceScientifiquePonctuelle = new EtablissementConsultanceScientifiquePonctuelleVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
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
    this.editEtablissementConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get etablissementConsultanceScientifiquePonctuelles(): Array<EtablissementConsultanceScientifiquePonctuelleVo> {
    return this.etablissementConsultanceScientifiquePonctuelleService.etablissementConsultanceScientifiquePonctuelles;
       }
set etablissementConsultanceScientifiquePonctuelles(value: Array<EtablissementConsultanceScientifiquePonctuelleVo>) {
        this.etablissementConsultanceScientifiquePonctuelleService.etablissementConsultanceScientifiquePonctuelles = value;
       }

 get selectedEtablissementConsultanceScientifiquePonctuelle(): EtablissementConsultanceScientifiquePonctuelleVo {
           return this.etablissementConsultanceScientifiquePonctuelleService.selectedEtablissementConsultanceScientifiquePonctuelle;
       }
    set selectedEtablissementConsultanceScientifiquePonctuelle(value: EtablissementConsultanceScientifiquePonctuelleVo) {
        this.etablissementConsultanceScientifiquePonctuelleService.selectedEtablissementConsultanceScientifiquePonctuelle = value;
       }

   get editEtablissementConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.etablissementConsultanceScientifiquePonctuelleService.editEtablissementConsultanceScientifiquePonctuelleDialog;

       }
    set editEtablissementConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.etablissementConsultanceScientifiquePonctuelleService.editEtablissementConsultanceScientifiquePonctuelleDialog = value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
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
