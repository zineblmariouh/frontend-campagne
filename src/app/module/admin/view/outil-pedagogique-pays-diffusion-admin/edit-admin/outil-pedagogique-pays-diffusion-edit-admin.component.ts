import {Component, OnInit} from '@angular/core';
import {OutilPedagogiquePaysDiffusionService} from '../../../../../controller/service/OutilPedagogiquePaysDiffusion.service';
import {OutilPedagogiquePaysDiffusionVo} from '../../../../../controller/model/OutilPedagogiquePaysDiffusion.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-outil-pedagogique-pays-diffusion-edit-admin',
  templateUrl: './outil-pedagogique-pays-diffusion-edit-admin.component.html',
  styleUrls: ['./outil-pedagogique-pays-diffusion-edit-admin.component.css']
})
export class OutilPedagogiquePaysDiffusionEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiquePaysDiffusionService: OutilPedagogiquePaysDiffusionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private outilPedagogiqueService: OutilPedagogiqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.outilPedagogiquePaysDiffusionService.edit().subscribe(outilPedagogiquePaysDiffusion=>{
    const myIndex = this.outilPedagogiquePaysDiffusions.findIndex(e => e.id === this.selectedOutilPedagogiquePaysDiffusion.id);
    this.outilPedagogiquePaysDiffusions[myIndex] = this.selectedOutilPedagogiquePaysDiffusion;
    this.editOutilPedagogiquePaysDiffusionDialog = false;
    this.selectedOutilPedagogiquePaysDiffusion = new OutilPedagogiquePaysDiffusionVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateoutilPedagogique(outilPedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'add');
                       if(isPermistted){
         this.selectedOutilPedagogique = new OutilPedagogiqueVo();
        this.createOutilPedagogiqueDialog = true;
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
    this.editOutilPedagogiquePaysDiffusionDialog  = false;
}

// getters and setters

get outilPedagogiquePaysDiffusions(): Array<OutilPedagogiquePaysDiffusionVo> {
    return this.outilPedagogiquePaysDiffusionService.outilPedagogiquePaysDiffusions;
       }
set outilPedagogiquePaysDiffusions(value: Array<OutilPedagogiquePaysDiffusionVo>) {
        this.outilPedagogiquePaysDiffusionService.outilPedagogiquePaysDiffusions = value;
       }

 get selectedOutilPedagogiquePaysDiffusion(): OutilPedagogiquePaysDiffusionVo {
           return this.outilPedagogiquePaysDiffusionService.selectedOutilPedagogiquePaysDiffusion;
       }
    set selectedOutilPedagogiquePaysDiffusion(value: OutilPedagogiquePaysDiffusionVo) {
        this.outilPedagogiquePaysDiffusionService.selectedOutilPedagogiquePaysDiffusion = value;
       }

   get editOutilPedagogiquePaysDiffusionDialog(): boolean {
           return this.outilPedagogiquePaysDiffusionService.editOutilPedagogiquePaysDiffusionDialog;

       }
    set editOutilPedagogiquePaysDiffusionDialog(value: boolean) {
        this.outilPedagogiquePaysDiffusionService.editOutilPedagogiquePaysDiffusionDialog = value;
       }

       get selectedOutilPedagogique(): OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques(): Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get createOutilPedagogiqueDialog(): boolean {
           return this.outilPedagogiqueService.createOutilPedagogiqueDialog;
       }
      set createOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.createOutilPedagogiqueDialog= value;
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
