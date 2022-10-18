import {Component, OnInit} from '@angular/core';
import {EtablissementConseilsScientifiqueService} from '../../../../../controller/service/EtablissementConseilsScientifique.service';
import {EtablissementConseilsScientifiqueVo} from '../../../../../controller/model/EtablissementConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-etablissement-conseils-scientifique-edit-admin',
  templateUrl: './etablissement-conseils-scientifique-edit-admin.component.html',
  styleUrls: ['./etablissement-conseils-scientifique-edit-admin.component.css']
})
export class EtablissementConseilsScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementConseilsScientifiqueService: EtablissementConseilsScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private conseilsScientifiqueService: ConseilsScientifiqueService
 ,       private etablissementService: EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etablissementConseilsScientifiqueService.edit().subscribe(etablissementConseilsScientifique=>{
    const myIndex = this.etablissementConseilsScientifiques.findIndex(e => e.id === this.selectedEtablissementConseilsScientifique.id);
    this.etablissementConseilsScientifiques[myIndex] = this.selectedEtablissementConseilsScientifique;
    this.editEtablissementConseilsScientifiqueDialog = false;
    this.selectedEtablissementConseilsScientifique = new EtablissementConseilsScientifiqueVo();


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
              public async openCreateconseilsScientifique(conseilsScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
        this.createConseilsScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEtablissementConseilsScientifiqueDialog  = false;
}

// getters and setters

get etablissementConseilsScientifiques(): Array<EtablissementConseilsScientifiqueVo> {
    return this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiques;
       }
set etablissementConseilsScientifiques(value: Array<EtablissementConseilsScientifiqueVo>) {
        this.etablissementConseilsScientifiqueService.etablissementConseilsScientifiques = value;
       }

 get selectedEtablissementConseilsScientifique(): EtablissementConseilsScientifiqueVo {
           return this.etablissementConseilsScientifiqueService.selectedEtablissementConseilsScientifique;
       }
    set selectedEtablissementConseilsScientifique(value: EtablissementConseilsScientifiqueVo) {
        this.etablissementConseilsScientifiqueService.selectedEtablissementConseilsScientifique = value;
       }

   get editEtablissementConseilsScientifiqueDialog(): boolean {
           return this.etablissementConseilsScientifiqueService.editEtablissementConseilsScientifiqueDialog;

       }
    set editEtablissementConseilsScientifiqueDialog(value: boolean) {
        this.etablissementConseilsScientifiqueService.editEtablissementConseilsScientifiqueDialog = value;
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
       get selectedConseilsScientifique(): ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get createConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;
       }
      set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
