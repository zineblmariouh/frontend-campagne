import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailPaysService} from '../../../../../controller/service/ProjetActiviteRechercheDetailPays.service';
import {ProjetActiviteRechercheDetailPaysVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailPays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-pays-edit-chercheur',
  templateUrl: './projet-activite-recherche-detail-pays-edit-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-pays-edit-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailPaysEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailPaysService: ProjetActiviteRechercheDetailPaysService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.projetActiviteRechercheDetailPaysService.edit().subscribe(projetActiviteRechercheDetailPays=>{
    const myIndex = this.projetActiviteRechercheDetailPayss.findIndex(e => e.id === this.selectedProjetActiviteRechercheDetailPays.id);
    this.projetActiviteRechercheDetailPayss[myIndex] = this.selectedProjetActiviteRechercheDetailPays;
    this.editProjetActiviteRechercheDetailPaysDialog = false;
    this.selectedProjetActiviteRechercheDetailPays = new ProjetActiviteRechercheDetailPaysVo();


    }, error => {
        console.log(error);
    });

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
    this.editProjetActiviteRechercheDetailPaysDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetailPayss(): Array<ProjetActiviteRechercheDetailPaysVo> {
    return this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPayss;
       }
set projetActiviteRechercheDetailPayss(value: Array<ProjetActiviteRechercheDetailPaysVo>) {
        this.projetActiviteRechercheDetailPaysService.projetActiviteRechercheDetailPayss = value;
       }

 get selectedProjetActiviteRechercheDetailPays(): ProjetActiviteRechercheDetailPaysVo {
           return this.projetActiviteRechercheDetailPaysService.selectedProjetActiviteRechercheDetailPays;
       }
    set selectedProjetActiviteRechercheDetailPays(value: ProjetActiviteRechercheDetailPaysVo) {
        this.projetActiviteRechercheDetailPaysService.selectedProjetActiviteRechercheDetailPays = value;
       }

   get editProjetActiviteRechercheDetailPaysDialog(): boolean {
           return this.projetActiviteRechercheDetailPaysService.editProjetActiviteRechercheDetailPaysDialog;

       }
    set editProjetActiviteRechercheDetailPaysDialog(value: boolean) {
        this.projetActiviteRechercheDetailPaysService.editProjetActiviteRechercheDetailPaysDialog = value;
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
