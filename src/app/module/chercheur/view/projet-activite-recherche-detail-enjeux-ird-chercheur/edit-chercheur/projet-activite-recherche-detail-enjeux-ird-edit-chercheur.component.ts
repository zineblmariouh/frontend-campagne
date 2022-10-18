import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailEnjeuxIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailEnjeuxIrd.service';
import {ProjetActiviteRechercheDetailEnjeuxIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-enjeux-ird-edit-chercheur',
  templateUrl: './projet-activite-recherche-detail-enjeux-ird-edit-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-enjeux-ird-edit-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailEnjeuxIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailEnjeuxIrdService: ProjetActiviteRechercheDetailEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.projetActiviteRechercheDetailEnjeuxIrdService.edit().subscribe(projetActiviteRechercheDetailEnjeuxIrd=>{
    const myIndex = this.projetActiviteRechercheDetailEnjeuxIrds.findIndex(e => e.id === this.selectedProjetActiviteRechercheDetailEnjeuxIrd.id);
    this.projetActiviteRechercheDetailEnjeuxIrds[myIndex] = this.selectedProjetActiviteRechercheDetailEnjeuxIrd;
    this.editProjetActiviteRechercheDetailEnjeuxIrdDialog = false;
    this.selectedProjetActiviteRechercheDetailEnjeuxIrd = new ProjetActiviteRechercheDetailEnjeuxIrdVo();


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
              public async openCreateprojetActiviteRechercheDetail(projetActiviteRechercheDetail: string) {
                      const isPermistted = await this.roleService.isPermitted('ProjetActiviteRechercheDetail', 'add');
                       if(isPermistted){
         this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
        this.createProjetActiviteRechercheDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editProjetActiviteRechercheDetailEnjeuxIrdDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetailEnjeuxIrds(): Array<ProjetActiviteRechercheDetailEnjeuxIrdVo> {
    return this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrds;
       }
set projetActiviteRechercheDetailEnjeuxIrds(value: Array<ProjetActiviteRechercheDetailEnjeuxIrdVo>) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.projetActiviteRechercheDetailEnjeuxIrds = value;
       }

 get selectedProjetActiviteRechercheDetailEnjeuxIrd(): ProjetActiviteRechercheDetailEnjeuxIrdVo {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.selectedProjetActiviteRechercheDetailEnjeuxIrd;
       }
    set selectedProjetActiviteRechercheDetailEnjeuxIrd(value: ProjetActiviteRechercheDetailEnjeuxIrdVo) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.selectedProjetActiviteRechercheDetailEnjeuxIrd = value;
       }

   get editProjetActiviteRechercheDetailEnjeuxIrdDialog(): boolean {
           return this.projetActiviteRechercheDetailEnjeuxIrdService.editProjetActiviteRechercheDetailEnjeuxIrdDialog;

       }
    set editProjetActiviteRechercheDetailEnjeuxIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailEnjeuxIrdService.editProjetActiviteRechercheDetailEnjeuxIrdDialog = value;
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
       get selectedProjetActiviteRechercheDetail(): ProjetActiviteRechercheDetailVo {
           return this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail;
       }
      set selectedProjetActiviteRechercheDetail(value: ProjetActiviteRechercheDetailVo) {
        this.projetActiviteRechercheDetailService.selectedProjetActiviteRechercheDetail = value;
       }
       get projetActiviteRechercheDetails(): Array<ProjetActiviteRechercheDetailVo> {
           return this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails;
       }
       set projetActiviteRechercheDetails(value: Array<ProjetActiviteRechercheDetailVo>) {
        this.projetActiviteRechercheDetailService.projetActiviteRechercheDetails = value;
       }
       get createProjetActiviteRechercheDetailDialog(): boolean {
           return this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog;
       }
      set createProjetActiviteRechercheDetailDialog(value: boolean) {
        this.projetActiviteRechercheDetailService.createProjetActiviteRechercheDetailDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
