import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueEnjeuxIrdService} from '../../../../../controller/service/OutilPedagogiqueEnjeuxIrd.service';
import {OutilPedagogiqueEnjeuxIrdVo} from '../../../../../controller/model/OutilPedagogiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-outil-pedagogique-enjeux-ird-edit-admin',
  templateUrl: './outil-pedagogique-enjeux-ird-edit-admin.component.html',
  styleUrls: ['./outil-pedagogique-enjeux-ird-edit-admin.component.css']
})
export class OutilPedagogiqueEnjeuxIrdEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueEnjeuxIrdService: OutilPedagogiqueEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private outilPedagogiqueService: OutilPedagogiqueService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.outilPedagogiqueEnjeuxIrdService.edit().subscribe(outilPedagogiqueEnjeuxIrd=>{
    const myIndex = this.outilPedagogiqueEnjeuxIrds.findIndex(e => e.id === this.selectedOutilPedagogiqueEnjeuxIrd.id);
    this.outilPedagogiqueEnjeuxIrds[myIndex] = this.selectedOutilPedagogiqueEnjeuxIrd;
    this.editOutilPedagogiqueEnjeuxIrdDialog = false;
    this.selectedOutilPedagogiqueEnjeuxIrd = new OutilPedagogiqueEnjeuxIrdVo();


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
// methods

hideEditDialog(){
    this.editOutilPedagogiqueEnjeuxIrdDialog  = false;
}

// getters and setters

get outilPedagogiqueEnjeuxIrds(): Array<OutilPedagogiqueEnjeuxIrdVo> {
    return this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrds;
       }
set outilPedagogiqueEnjeuxIrds(value: Array<OutilPedagogiqueEnjeuxIrdVo>) {
        this.outilPedagogiqueEnjeuxIrdService.outilPedagogiqueEnjeuxIrds = value;
       }

 get selectedOutilPedagogiqueEnjeuxIrd(): OutilPedagogiqueEnjeuxIrdVo {
           return this.outilPedagogiqueEnjeuxIrdService.selectedOutilPedagogiqueEnjeuxIrd;
       }
    set selectedOutilPedagogiqueEnjeuxIrd(value: OutilPedagogiqueEnjeuxIrdVo) {
        this.outilPedagogiqueEnjeuxIrdService.selectedOutilPedagogiqueEnjeuxIrd = value;
       }

   get editOutilPedagogiqueEnjeuxIrdDialog(): boolean {
           return this.outilPedagogiqueEnjeuxIrdService.editOutilPedagogiqueEnjeuxIrdDialog;

       }
    set editOutilPedagogiqueEnjeuxIrdDialog(value: boolean) {
        this.outilPedagogiqueEnjeuxIrdService.editOutilPedagogiqueEnjeuxIrdDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
