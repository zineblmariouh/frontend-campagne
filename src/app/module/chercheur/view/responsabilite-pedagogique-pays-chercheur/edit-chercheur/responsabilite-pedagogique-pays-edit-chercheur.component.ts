import {Component, OnInit} from '@angular/core';
import {ResponsabilitePedagogiquePaysService} from '../../../../../controller/service/ResponsabilitePedagogiquePays.service';
import {ResponsabilitePedagogiquePaysVo} from '../../../../../controller/model/ResponsabilitePedagogiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ResponsabilitePedagogiqueVo} from '../../../../../controller/model/ResponsabilitePedagogique.model';
import {ResponsabilitePedagogiqueService} from '../../../../../controller/service/ResponsabilitePedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-responsabilite-pedagogique-pays-edit-chercheur',
  templateUrl: './responsabilite-pedagogique-pays-edit-chercheur.component.html',
  styleUrls: ['./responsabilite-pedagogique-pays-edit-chercheur.component.css']
})
export class ResponsabilitePedagogiquePaysEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabilitePedagogiquePaysService: ResponsabilitePedagogiquePaysService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private responsabilitePedagogiqueService: ResponsabilitePedagogiqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedResponsabilitePedagogique = new ResponsabilitePedagogiqueVo();
    this.responsabilitePedagogiqueService.findAll().subscribe((data) => this.responsabilitePedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.responsabilitePedagogiquePaysService.edit().subscribe(responsabilitePedagogiquePays=>{
    const myIndex = this.responsabilitePedagogiquePayss.findIndex(e => e.id === this.selectedResponsabilitePedagogiquePays.id);
    this.responsabilitePedagogiquePayss[myIndex] = this.selectedResponsabilitePedagogiquePays;
    this.editResponsabilitePedagogiquePaysDialog = false;
    this.selectedResponsabilitePedagogiquePays = new ResponsabilitePedagogiquePaysVo();


    }, error => {
        console.log(error);
    });

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
    this.editResponsabilitePedagogiquePaysDialog  = false;
}

// getters and setters

get responsabilitePedagogiquePayss(): Array<ResponsabilitePedagogiquePaysVo> {
    return this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePayss;
       }
set responsabilitePedagogiquePayss(value: Array<ResponsabilitePedagogiquePaysVo>) {
        this.responsabilitePedagogiquePaysService.responsabilitePedagogiquePayss = value;
       }

 get selectedResponsabilitePedagogiquePays(): ResponsabilitePedagogiquePaysVo {
           return this.responsabilitePedagogiquePaysService.selectedResponsabilitePedagogiquePays;
       }
    set selectedResponsabilitePedagogiquePays(value: ResponsabilitePedagogiquePaysVo) {
        this.responsabilitePedagogiquePaysService.selectedResponsabilitePedagogiquePays = value;
       }

   get editResponsabilitePedagogiquePaysDialog(): boolean {
           return this.responsabilitePedagogiquePaysService.editResponsabilitePedagogiquePaysDialog;

       }
    set editResponsabilitePedagogiquePaysDialog(value: boolean) {
        this.responsabilitePedagogiquePaysService.editResponsabilitePedagogiquePaysDialog = value;
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
