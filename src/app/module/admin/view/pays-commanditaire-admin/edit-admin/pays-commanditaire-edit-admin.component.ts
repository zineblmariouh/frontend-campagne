import {Component, OnInit} from '@angular/core';
import {PaysCommanditaireService} from '../../../../../controller/service/PaysCommanditaire.service';
import {PaysCommanditaireVo} from '../../../../../controller/model/PaysCommanditaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-commanditaire-edit-admin',
  templateUrl: './pays-commanditaire-edit-admin.component.html',
  styleUrls: ['./pays-commanditaire-edit-admin.component.css']
})
export class PaysCommanditaireEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysCommanditaireService: PaysCommanditaireService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.paysCommanditaireService.edit().subscribe(paysCommanditaire=>{
    const myIndex = this.paysCommanditaires.findIndex(e => e.id === this.selectedPaysCommanditaire.id);
    this.paysCommanditaires[myIndex] = this.selectedPaysCommanditaire;
    this.editPaysCommanditaireDialog = false;
    this.selectedPaysCommanditaire = new PaysCommanditaireVo();


    }, error => {
        console.log(error);
    });

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
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editPaysCommanditaireDialog  = false;
}

// getters and setters

get paysCommanditaires(): Array<PaysCommanditaireVo> {
    return this.paysCommanditaireService.paysCommanditaires;
       }
set paysCommanditaires(value: Array<PaysCommanditaireVo>) {
        this.paysCommanditaireService.paysCommanditaires = value;
       }

 get selectedPaysCommanditaire(): PaysCommanditaireVo {
           return this.paysCommanditaireService.selectedPaysCommanditaire;
       }
    set selectedPaysCommanditaire(value: PaysCommanditaireVo) {
        this.paysCommanditaireService.selectedPaysCommanditaire = value;
       }

   get editPaysCommanditaireDialog(): boolean {
           return this.paysCommanditaireService.editPaysCommanditaireDialog;

       }
    set editPaysCommanditaireDialog(value: boolean) {
        this.paysCommanditaireService.editPaysCommanditaireDialog = value;
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
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
