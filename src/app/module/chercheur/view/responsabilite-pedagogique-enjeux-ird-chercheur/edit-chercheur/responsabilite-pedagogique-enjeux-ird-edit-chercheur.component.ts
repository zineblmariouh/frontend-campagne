import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiqueEnjeuxIrdService} from '../../../../../controller/service/ResponsabilitePedagogiqueEnjeuxIrd.service';
import {ResponsabilitePedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/ResponsabilitePedagogiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';

@Component({
  selector: 'app-responsabilite-pedagogique-enjeux-ird-edit-chercheur',
  templateUrl: './responsabilite-pedagogique-enjeux-ird-edit-chercheur.component.html',
  styleUrls: ['./responsabilite-pedagogique-enjeux-ird-edit-chercheur.component.css']
})
export class ResponsabilitePedagogiqueEnjeuxIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabilitePedagogiqueEnjeuxIrdService: ResponsabilitePedagogiqueEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.responsabilitePedagogiqueEnjeuxIrdService.edit().subscribe(responsabilitePedagogiqueEnjeuxIrd=>{
    const myIndex = this.responsabilitePedagogiqueEnjeuxIrds.findIndex(e => e.id === this.selectedResponsabilitePedagogiqueEnjeuxIrd.id);
    this.responsabilitePedagogiqueEnjeuxIrds[myIndex] = this.selectedResponsabilitePedagogiqueEnjeuxIrd;
    this.editResponsabilitePedagogiqueEnjeuxIrdDialog = false;
    this.selectedResponsabilitePedagogiqueEnjeuxIrd = new ResponsabilitePedagogiqueEnjeuxIrdVo();


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
// methods

hideEditDialog(){
    this.editResponsabilitePedagogiqueEnjeuxIrdDialog  = false;
}

// getters and setters

get responsabilitePedagogiqueEnjeuxIrds(): Array<ResponsabilitePedagogiqueEnjeuxIrdVo> {
    return this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrds;
       }
set responsabilitePedagogiqueEnjeuxIrds(value: Array<ResponsabilitePedagogiqueEnjeuxIrdVo>) {
        this.responsabilitePedagogiqueEnjeuxIrdService.responsabilitePedagogiqueEnjeuxIrds = value;
       }

 get selectedResponsabilitePedagogiqueEnjeuxIrd(): ResponsabilitePedagogiqueEnjeuxIrdVo {
           return this.responsabilitePedagogiqueEnjeuxIrdService.selectedResponsabilitePedagogiqueEnjeuxIrd;
       }
    set selectedResponsabilitePedagogiqueEnjeuxIrd(value: ResponsabilitePedagogiqueEnjeuxIrdVo) {
        this.responsabilitePedagogiqueEnjeuxIrdService.selectedResponsabilitePedagogiqueEnjeuxIrd = value;
       }

   get editResponsabilitePedagogiqueEnjeuxIrdDialog(): boolean {
           return this.responsabilitePedagogiqueEnjeuxIrdService.editResponsabilitePedagogiqueEnjeuxIrdDialog;

       }
    set editResponsabilitePedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.responsabilitePedagogiqueEnjeuxIrdService.editResponsabilitePedagogiqueEnjeuxIrdDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
