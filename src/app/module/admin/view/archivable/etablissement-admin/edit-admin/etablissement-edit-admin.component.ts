import {Component, OnInit} from '@angular/core';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {VilleVo} from '../../../../../controller/model/Ville.model';
import {VilleService} from '../../../../../controller/service/Ville.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-etablissement-edit-admin',
  templateUrl: './etablissement-edit-admin.component.html',
  styleUrls: ['./etablissement-edit-admin.component.css']
})
export class EtablissementEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementService: EtablissementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private villeService: VilleService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedVille = new VilleVo();
    this.villeService.findAll().subscribe((data) => this.villes = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEtablissement.dateArchivage = DateUtils.toDate(this.selectedEtablissement.dateArchivage);
            this.selectedEtablissement.dateCreation = DateUtils.toDate(this.selectedEtablissement.dateCreation);
    this.etablissementService.edit().subscribe(etablissement=>{
    const myIndex = this.etablissements.findIndex(e => e.id === this.selectedEtablissement.id);
    this.etablissements[myIndex] = this.selectedEtablissement;
    this.editEtablissementDialog = false;
    this.selectedEtablissement = new EtablissementVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateville(ville: string) {
                      const isPermistted = await this.roleService.isPermitted('Ville', 'add');
                       if(isPermistted){
         this.selectedVille = new VilleVo();
        this.createVilleDialog = true;
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
    this.editEtablissementDialog  = false;
}

// getters and setters

get etablissements(): Array<EtablissementVo> {
    return this.etablissementService.etablissements;
       }
set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }

 get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
    set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }

   get editEtablissementDialog(): boolean {
           return this.etablissementService.editEtablissementDialog;

       }
    set editEtablissementDialog(value: boolean) {
        this.etablissementService.editEtablissementDialog = value;
       }

       get selectedVille(): VilleVo {
           return this.villeService.selectedVille;
       }
      set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
       }
       get villes(): Array<VilleVo> {
           return this.villeService.villes;
       }
       set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
       }
       get createVilleDialog(): boolean {
           return this.villeService.createVilleDialog;
       }
      set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog= value;
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
