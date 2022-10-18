import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailEtablissementService} from '../../../../../controller/service/VieInstitutionnelleDetailEtablissement.service';
import {VieInstitutionnelleDetailEtablissementVo} from '../../../../../controller/model/VieInstitutionnelleDetailEtablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-etablissement-edit-chercheur',
  templateUrl: './vie-institutionnelle-detail-etablissement-edit-chercheur.component.html',
  styleUrls: ['./vie-institutionnelle-detail-etablissement-edit-chercheur.component.css']
})
export class VieInstitutionnelleDetailEtablissementEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailEtablissementService: VieInstitutionnelleDetailEtablissementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService
 ,       private etablissementService: EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
    this.vieInstitutionnelleDetailService.findAll().subscribe((data) => this.vieInstitutionnelleDetails = data);
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.vieInstitutionnelleDetailEtablissementService.edit().subscribe(vieInstitutionnelleDetailEtablissement=>{
    const myIndex = this.vieInstitutionnelleDetailEtablissements.findIndex(e => e.id === this.selectedVieInstitutionnelleDetailEtablissement.id);
    this.vieInstitutionnelleDetailEtablissements[myIndex] = this.selectedVieInstitutionnelleDetailEtablissement;
    this.editVieInstitutionnelleDetailEtablissementDialog = false;
    this.selectedVieInstitutionnelleDetailEtablissement = new VieInstitutionnelleDetailEtablissementVo();


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
              public async openCreatevieInstitutionnelleDetail(vieInstitutionnelleDetail: string) {
                      const isPermistted = await this.roleService.isPermitted('VieInstitutionnelleDetail', 'add');
                       if(isPermistted){
         this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
        this.createVieInstitutionnelleDetailDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editVieInstitutionnelleDetailEtablissementDialog  = false;
}

// getters and setters

get vieInstitutionnelleDetailEtablissements(): Array<VieInstitutionnelleDetailEtablissementVo> {
    return this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissements;
       }
set vieInstitutionnelleDetailEtablissements(value: Array<VieInstitutionnelleDetailEtablissementVo>) {
        this.vieInstitutionnelleDetailEtablissementService.vieInstitutionnelleDetailEtablissements = value;
       }

 get selectedVieInstitutionnelleDetailEtablissement(): VieInstitutionnelleDetailEtablissementVo {
           return this.vieInstitutionnelleDetailEtablissementService.selectedVieInstitutionnelleDetailEtablissement;
       }
    set selectedVieInstitutionnelleDetailEtablissement(value: VieInstitutionnelleDetailEtablissementVo) {
        this.vieInstitutionnelleDetailEtablissementService.selectedVieInstitutionnelleDetailEtablissement = value;
       }

   get editVieInstitutionnelleDetailEtablissementDialog(): boolean {
           return this.vieInstitutionnelleDetailEtablissementService.editVieInstitutionnelleDetailEtablissementDialog;

       }
    set editVieInstitutionnelleDetailEtablissementDialog(value: boolean) {
        this.vieInstitutionnelleDetailEtablissementService.editVieInstitutionnelleDetailEtablissementDialog = value;
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
       get selectedVieInstitutionnelleDetail(): VieInstitutionnelleDetailVo {
           return this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail;
       }
      set selectedVieInstitutionnelleDetail(value: VieInstitutionnelleDetailVo) {
        this.vieInstitutionnelleDetailService.selectedVieInstitutionnelleDetail = value;
       }
       get vieInstitutionnelleDetails(): Array<VieInstitutionnelleDetailVo> {
           return this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails;
       }
       set vieInstitutionnelleDetails(value: Array<VieInstitutionnelleDetailVo>) {
        this.vieInstitutionnelleDetailService.vieInstitutionnelleDetails = value;
       }
       get createVieInstitutionnelleDetailDialog(): boolean {
           return this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog;
       }
      set createVieInstitutionnelleDetailDialog(value: boolean) {
        this.vieInstitutionnelleDetailService.createVieInstitutionnelleDetailDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
