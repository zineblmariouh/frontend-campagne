import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirProjetActiviteRechercheService} from '../../../../../controller/service/CommunauteSavoirProjetActiviteRecherche.service';
import {CommunauteSavoirProjetActiviteRechercheVo} from '../../../../../controller/model/CommunauteSavoirProjetActiviteRecherche.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ProjetActiviteRechercheVo} from '../../../../../controller/model/ProjetActiviteRecherche.model';
import {ProjetActiviteRechercheService} from '../../../../../controller/service/ProjetActiviteRecherche.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-communaute-savoir-projet-activite-recherche-edit-admin',
  templateUrl: './communaute-savoir-projet-activite-recherche-edit-admin.component.html',
  styleUrls: ['./communaute-savoir-projet-activite-recherche-edit-admin.component.css']
})
export class CommunauteSavoirProjetActiviteRechercheEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirProjetActiviteRechercheService: CommunauteSavoirProjetActiviteRechercheService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private projetActiviteRechercheService: ProjetActiviteRechercheService
 ,       private communauteSavoirService: CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
    this.projetActiviteRechercheService.findAll().subscribe((data) => this.projetActiviteRecherches = data);
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.communauteSavoirProjetActiviteRechercheService.edit().subscribe(communauteSavoirProjetActiviteRecherche=>{
    const myIndex = this.communauteSavoirProjetActiviteRecherches.findIndex(e => e.id === this.selectedCommunauteSavoirProjetActiviteRecherche.id);
    this.communauteSavoirProjetActiviteRecherches[myIndex] = this.selectedCommunauteSavoirProjetActiviteRecherche;
    this.editCommunauteSavoirProjetActiviteRechercheDialog = false;
    this.selectedCommunauteSavoirProjetActiviteRecherche = new CommunauteSavoirProjetActiviteRechercheVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateprojetActiviteRecherche(projetActiviteRecherche: string) {
                      const isPermistted = await this.roleService.isPermitted('ProjetActiviteRecherche', 'add');
                       if(isPermistted){
         this.selectedProjetActiviteRecherche = new ProjetActiviteRechercheVo();
        this.createProjetActiviteRechercheDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editCommunauteSavoirProjetActiviteRechercheDialog  = false;
}

// getters and setters

get communauteSavoirProjetActiviteRecherches(): Array<CommunauteSavoirProjetActiviteRechercheVo> {
    return this.communauteSavoirProjetActiviteRechercheService.communauteSavoirProjetActiviteRecherches;
       }
set communauteSavoirProjetActiviteRecherches(value: Array<CommunauteSavoirProjetActiviteRechercheVo>) {
        this.communauteSavoirProjetActiviteRechercheService.communauteSavoirProjetActiviteRecherches = value;
       }

 get selectedCommunauteSavoirProjetActiviteRecherche(): CommunauteSavoirProjetActiviteRechercheVo {
           return this.communauteSavoirProjetActiviteRechercheService.selectedCommunauteSavoirProjetActiviteRecherche;
       }
    set selectedCommunauteSavoirProjetActiviteRecherche(value: CommunauteSavoirProjetActiviteRechercheVo) {
        this.communauteSavoirProjetActiviteRechercheService.selectedCommunauteSavoirProjetActiviteRecherche = value;
       }

   get editCommunauteSavoirProjetActiviteRechercheDialog(): boolean {
           return this.communauteSavoirProjetActiviteRechercheService.editCommunauteSavoirProjetActiviteRechercheDialog;

       }
    set editCommunauteSavoirProjetActiviteRechercheDialog(value: boolean) {
        this.communauteSavoirProjetActiviteRechercheService.editCommunauteSavoirProjetActiviteRechercheDialog = value;
       }

       get selectedProjetActiviteRecherche(): ProjetActiviteRechercheVo {
           return this.projetActiviteRechercheService.selectedProjetActiviteRecherche;
       }
      set selectedProjetActiviteRecherche(value: ProjetActiviteRechercheVo) {
        this.projetActiviteRechercheService.selectedProjetActiviteRecherche = value;
       }
       get projetActiviteRecherches(): Array<ProjetActiviteRechercheVo> {
           return this.projetActiviteRechercheService.projetActiviteRecherches;
       }
       set projetActiviteRecherches(value: Array<ProjetActiviteRechercheVo>) {
        this.projetActiviteRechercheService.projetActiviteRecherches = value;
       }
       get createProjetActiviteRechercheDialog(): boolean {
           return this.projetActiviteRechercheService.createProjetActiviteRechercheDialog;
       }
      set createProjetActiviteRechercheDialog(value: boolean) {
        this.projetActiviteRechercheService.createProjetActiviteRechercheDialog= value;
       }
       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
