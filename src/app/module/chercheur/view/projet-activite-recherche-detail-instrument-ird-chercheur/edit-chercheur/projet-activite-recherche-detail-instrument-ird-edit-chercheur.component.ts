import {Component, OnInit} from '@angular/core';
import {ProjetActiviteRechercheDetailInstrumentIrdService} from '../../../../../controller/service/ProjetActiviteRechercheDetailInstrumentIrd.service';
import {ProjetActiviteRechercheDetailInstrumentIrdVo} from '../../../../../controller/model/ProjetActiviteRechercheDetailInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ProjetActiviteRechercheDetailVo} from '../../../../../controller/model/ProjetActiviteRechercheDetail.model';
import {ProjetActiviteRechercheDetailService} from '../../../../../controller/service/ProjetActiviteRechercheDetail.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-projet-activite-recherche-detail-instrument-ird-edit-chercheur',
  templateUrl: './projet-activite-recherche-detail-instrument-ird-edit-chercheur.component.html',
  styleUrls: ['./projet-activite-recherche-detail-instrument-ird-edit-chercheur.component.css']
})
export class ProjetActiviteRechercheDetailInstrumentIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private projetActiviteRechercheDetailInstrumentIrdService: ProjetActiviteRechercheDetailInstrumentIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private projetActiviteRechercheDetailService: ProjetActiviteRechercheDetailService
 ,       private instrumentIrdService: InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedProjetActiviteRechercheDetail = new ProjetActiviteRechercheDetailVo();
    this.projetActiviteRechercheDetailService.findAll().subscribe((data) => this.projetActiviteRechercheDetails = data);
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.projetActiviteRechercheDetailInstrumentIrdService.edit().subscribe(projetActiviteRechercheDetailInstrumentIrd=>{
    const myIndex = this.projetActiviteRechercheDetailInstrumentIrds.findIndex(e => e.id === this.selectedProjetActiviteRechercheDetailInstrumentIrd.id);
    this.projetActiviteRechercheDetailInstrumentIrds[myIndex] = this.selectedProjetActiviteRechercheDetailInstrumentIrd;
    this.editProjetActiviteRechercheDetailInstrumentIrdDialog = false;
    this.selectedProjetActiviteRechercheDetailInstrumentIrd = new ProjetActiviteRechercheDetailInstrumentIrdVo();


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
              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editProjetActiviteRechercheDetailInstrumentIrdDialog  = false;
}

// getters and setters

get projetActiviteRechercheDetailInstrumentIrds(): Array<ProjetActiviteRechercheDetailInstrumentIrdVo> {
    return this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrds;
       }
set projetActiviteRechercheDetailInstrumentIrds(value: Array<ProjetActiviteRechercheDetailInstrumentIrdVo>) {
        this.projetActiviteRechercheDetailInstrumentIrdService.projetActiviteRechercheDetailInstrumentIrds = value;
       }

 get selectedProjetActiviteRechercheDetailInstrumentIrd(): ProjetActiviteRechercheDetailInstrumentIrdVo {
           return this.projetActiviteRechercheDetailInstrumentIrdService.selectedProjetActiviteRechercheDetailInstrumentIrd;
       }
    set selectedProjetActiviteRechercheDetailInstrumentIrd(value: ProjetActiviteRechercheDetailInstrumentIrdVo) {
        this.projetActiviteRechercheDetailInstrumentIrdService.selectedProjetActiviteRechercheDetailInstrumentIrd = value;
       }

   get editProjetActiviteRechercheDetailInstrumentIrdDialog(): boolean {
           return this.projetActiviteRechercheDetailInstrumentIrdService.editProjetActiviteRechercheDetailInstrumentIrdDialog;

       }
    set editProjetActiviteRechercheDetailInstrumentIrdDialog(value: boolean) {
        this.projetActiviteRechercheDetailInstrumentIrdService.editProjetActiviteRechercheDetailInstrumentIrdDialog = value;
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
       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
