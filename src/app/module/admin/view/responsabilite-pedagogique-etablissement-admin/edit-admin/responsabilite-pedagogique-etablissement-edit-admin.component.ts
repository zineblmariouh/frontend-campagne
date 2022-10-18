import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueEtablissementService} from '../../../../../controller/service/ResponsabilitePedagogiqueEtablissement.service';
import {ResponsabilitePedagogiqueEtablissementVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEtablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-responsabilite-pedagogique-etablissement-edit-admin',
  templateUrl: './responsabilite-pedagogique-etablissement-edit-admin.component.html',
  styleUrls: ['./responsabilite-pedagogique-etablissement-edit-admin.component.css']
})
export class ResponsabilitePedagogiqueEtablissementEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabilitePedagogiqueEtablissementService: ResponsabilitePedagogiqueEtablissementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private etablissementService: EtablissementService
 ,       private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.responsabilitePedagogiqueEtablissementService.edit().subscribe(responsabilitePedagogiqueEtablissement=>{
    const myIndex = this.responsabilitePedagogiqueEtablissements.findIndex(e => e.id === this.selectedResponsabilitePedagogiqueEtablissement.id);
    this.responsabilitePedagogiqueEtablissements[myIndex] = this.selectedResponsabilitePedagogiqueEtablissement;
    this.editResponsabilitePedagogiqueEtablissementDialog = false;
    this.selectedResponsabilitePedagogiqueEtablissement = new ResponsabilitePedagogiqueEtablissementVo();


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
              public async openCreateresponsabilitePedagogique(responsabilitePedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('ResponsabilitePedagogique', 'add');
                       if(isPermistted){
         this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
        this.createResponsabilitePedagogiqueDialog = true;
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
    this.editResponsabilitePedagogiqueEtablissementDialog  = false;
}

// getters and setters

get responsabilitePedagogiqueEtablissements(): Array<ResponsabilitePedagogiqueEtablissementVo> {
    return this.responsabilitePedagogiqueEtablissementService.responsabilitePedagogiqueEtablissements;
       }
set responsabilitePedagogiqueEtablissements(value: Array<ResponsabilitePedagogiqueEtablissementVo>) {
        this.responsabilitePedagogiqueEtablissementService.responsabilitePedagogiqueEtablissements = value;
       }

 get selectedResponsabilitePedagogiqueEtablissement(): ResponsabilitePedagogiqueEtablissementVo {
           return this.responsabilitePedagogiqueEtablissementService.selectedResponsabilitePedagogiqueEtablissement;
       }
    set selectedResponsabilitePedagogiqueEtablissement(value: ResponsabilitePedagogiqueEtablissementVo) {
        this.responsabilitePedagogiqueEtablissementService.selectedResponsabilitePedagogiqueEtablissement = value;
       }

   get editResponsabilitePedagogiqueEtablissementDialog(): boolean {
           return this.responsabilitePedagogiqueEtablissementService.editResponsabilitePedagogiqueEtablissementDialog;

       }
    set editResponsabilitePedagogiqueEtablissementDialog(value: boolean) {
        this.responsabilitePedagogiqueEtablissementService.editResponsabilitePedagogiqueEtablissementDialog = value;
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
       get selectedResponsabilitePedagogique(): ResponsabilitePedagogiqueVo {
           return this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique;
       }
      set selectedResponsabilitePedagogique(value: ResponsabilitePedagogiqueVo) {
        this.responsabilitePedagogiqueService.selectedResponsabilitePedagogique = value;
       }
       get responsabilitePedagogiques(): Array<ResponsabilitePedagogiqueVo> {
           return this.responsabilitePedagogiqueService.responsabilitePedagogiques;
       }
       set responsabilitePedagogiques(value: Array<ResponsabilitePedagogiqueVo>) {
        this.responsabilitePedagogiqueService.responsabilitePedagogiques = value;
       }
       get createResponsabilitePedagogiqueDialog(): boolean {
           return this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog;
       }
      set createResponsabilitePedagogiqueDialog(value: boolean) {
        this.responsabilitePedagogiqueService.createResponsabilitePedagogiqueDialog= value;
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
