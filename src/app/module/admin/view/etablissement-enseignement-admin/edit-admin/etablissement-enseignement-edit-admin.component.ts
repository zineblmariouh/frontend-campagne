import {Component, OnInit} from '@angular/core';
import {EtablissementEnseignementService} from '../../../../../controller/service/EtablissementEnseignement.service';
import {EtablissementEnseignementVo} from '../../../../../controller/model/EtablissementEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-etablissement-enseignement-edit-admin',
  templateUrl: './etablissement-enseignement-edit-admin.component.html',
  styleUrls: ['./etablissement-enseignement-edit-admin.component.css']
})
export class EtablissementEnseignementEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementEnseignementService: EtablissementEnseignementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enseignementService: EnseignementService
 ,       private etablissementService: EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etablissementEnseignementService.edit().subscribe(etablissementEnseignement=>{
    const myIndex = this.etablissementEnseignements.findIndex(e => e.id === this.selectedEtablissementEnseignement.id);
    this.etablissementEnseignements[myIndex] = this.selectedEtablissementEnseignement;
    this.editEtablissementEnseignementDialog = false;
    this.selectedEtablissementEnseignement = new EtablissementEnseignementVo();


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
              public async openCreateenseignement(enseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('Enseignement', 'add');
                       if(isPermistted){
         this.selectedEnseignement = new EnseignementVo();
        this.createEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEtablissementEnseignementDialog  = false;
}

// getters and setters

get etablissementEnseignements(): Array<EtablissementEnseignementVo> {
    return this.etablissementEnseignementService.etablissementEnseignements;
       }
set etablissementEnseignements(value: Array<EtablissementEnseignementVo>) {
        this.etablissementEnseignementService.etablissementEnseignements = value;
       }

 get selectedEtablissementEnseignement(): EtablissementEnseignementVo {
           return this.etablissementEnseignementService.selectedEtablissementEnseignement;
       }
    set selectedEtablissementEnseignement(value: EtablissementEnseignementVo) {
        this.etablissementEnseignementService.selectedEtablissementEnseignement = value;
       }

   get editEtablissementEnseignementDialog(): boolean {
           return this.etablissementEnseignementService.editEtablissementEnseignementDialog;

       }
    set editEtablissementEnseignementDialog(value: boolean) {
        this.etablissementEnseignementService.editEtablissementEnseignementDialog = value;
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
       get selectedEnseignement(): EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements(): Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get createEnseignementDialog(): boolean {
           return this.enseignementService.createEnseignementDialog;
       }
      set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
