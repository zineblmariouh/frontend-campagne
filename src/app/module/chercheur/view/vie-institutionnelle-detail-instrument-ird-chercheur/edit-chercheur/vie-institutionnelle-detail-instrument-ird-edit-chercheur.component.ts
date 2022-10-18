import {Component, OnInit} from '@angular/core';
import {VieInstitutionnelleDetailInstrumentIrdService} from '../../../../../controller/service/VieInstitutionnelleDetailInstrumentIrd.service';
import {VieInstitutionnelleDetailInstrumentIrdVo} from '../../../../../controller/model/VieInstitutionnelleDetailInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {VieInstitutionnelleDetailVo} from '../../../../../controller/model/VieInstitutionnelleDetail.model';
import {VieInstitutionnelleDetailService} from '../../../../../controller/service/VieInstitutionnelleDetail.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-vie-institutionnelle-detail-instrument-ird-edit-chercheur',
  templateUrl: './vie-institutionnelle-detail-instrument-ird-edit-chercheur.component.html',
  styleUrls: ['./vie-institutionnelle-detail-instrument-ird-edit-chercheur.component.css']
})
export class VieInstitutionnelleDetailInstrumentIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private vieInstitutionnelleDetailInstrumentIrdService: VieInstitutionnelleDetailInstrumentIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private vieInstitutionnelleDetailService: VieInstitutionnelleDetailService
 ,       private instrumentIrdService: InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedVieInstitutionnelleDetail = new VieInstitutionnelleDetailVo();
    this.vieInstitutionnelleDetailService.findAll().subscribe((data) => this.vieInstitutionnelleDetails = data);
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.vieInstitutionnelleDetailInstrumentIrdService.edit().subscribe(vieInstitutionnelleDetailInstrumentIrd=>{
    const myIndex = this.vieInstitutionnelleDetailInstrumentIrds.findIndex(e => e.id === this.selectedVieInstitutionnelleDetailInstrumentIrd.id);
    this.vieInstitutionnelleDetailInstrumentIrds[myIndex] = this.selectedVieInstitutionnelleDetailInstrumentIrd;
    this.editVieInstitutionnelleDetailInstrumentIrdDialog = false;
    this.selectedVieInstitutionnelleDetailInstrumentIrd = new VieInstitutionnelleDetailInstrumentIrdVo();


    }, error => {
        console.log(error);
    });

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
    this.editVieInstitutionnelleDetailInstrumentIrdDialog  = false;
}

// getters and setters

get vieInstitutionnelleDetailInstrumentIrds(): Array<VieInstitutionnelleDetailInstrumentIrdVo> {
    return this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrds;
       }
set vieInstitutionnelleDetailInstrumentIrds(value: Array<VieInstitutionnelleDetailInstrumentIrdVo>) {
        this.vieInstitutionnelleDetailInstrumentIrdService.vieInstitutionnelleDetailInstrumentIrds = value;
       }

 get selectedVieInstitutionnelleDetailInstrumentIrd(): VieInstitutionnelleDetailInstrumentIrdVo {
           return this.vieInstitutionnelleDetailInstrumentIrdService.selectedVieInstitutionnelleDetailInstrumentIrd;
       }
    set selectedVieInstitutionnelleDetailInstrumentIrd(value: VieInstitutionnelleDetailInstrumentIrdVo) {
        this.vieInstitutionnelleDetailInstrumentIrdService.selectedVieInstitutionnelleDetailInstrumentIrd = value;
       }

   get editVieInstitutionnelleDetailInstrumentIrdDialog(): boolean {
           return this.vieInstitutionnelleDetailInstrumentIrdService.editVieInstitutionnelleDetailInstrumentIrdDialog;

       }
    set editVieInstitutionnelleDetailInstrumentIrdDialog(value: boolean) {
        this.vieInstitutionnelleDetailInstrumentIrdService.editVieInstitutionnelleDetailInstrumentIrdDialog = value;
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
