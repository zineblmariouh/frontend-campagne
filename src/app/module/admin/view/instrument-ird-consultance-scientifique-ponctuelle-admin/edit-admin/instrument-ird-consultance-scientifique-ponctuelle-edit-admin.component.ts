import {Component, OnInit} from '@angular/core';
import {InstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/InstrumentIrdConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/InstrumentIrdConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-instrument-ird-consultance-scientifique-ponctuelle-edit-admin',
  templateUrl: './instrument-ird-consultance-scientifique-ponctuelle-edit-admin.component.html',
  styleUrls: ['./instrument-ird-consultance-scientifique-ponctuelle-edit-admin.component.css']
})
export class InstrumentIrdConsultanceScientifiquePonctuelleEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdConsultanceScientifiquePonctuelleService: InstrumentIrdConsultanceScientifiquePonctuelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private instrumentIrdService: InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.instrumentIrdConsultanceScientifiquePonctuelleService.edit().subscribe(instrumentIrdConsultanceScientifiquePonctuelle=>{
    const myIndex = this.instrumentIrdConsultanceScientifiquePonctuelles.findIndex(e => e.id === this.selectedInstrumentIrdConsultanceScientifiquePonctuelle.id);
    this.instrumentIrdConsultanceScientifiquePonctuelles[myIndex] = this.selectedInstrumentIrdConsultanceScientifiquePonctuelle;
    this.editInstrumentIrdConsultanceScientifiquePonctuelleDialog = false;
    this.selectedInstrumentIrdConsultanceScientifiquePonctuelle = new InstrumentIrdConsultanceScientifiquePonctuelleVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateconsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle: string) {
                      const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'add');
                       if(isPermistted){
         this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
        this.createConsultanceScientifiquePonctuelleDialog = true;
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
    this.editInstrumentIrdConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get instrumentIrdConsultanceScientifiquePonctuelles(): Array<InstrumentIrdConsultanceScientifiquePonctuelleVo> {
    return this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelles;
       }
set instrumentIrdConsultanceScientifiquePonctuelles(value: Array<InstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.instrumentIrdConsultanceScientifiquePonctuelles = value;
       }

 get selectedInstrumentIrdConsultanceScientifiquePonctuelle(): InstrumentIrdConsultanceScientifiquePonctuelleVo {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.selectedInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set selectedInstrumentIrdConsultanceScientifiquePonctuelle(value: InstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.selectedInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

   get editInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.instrumentIrdConsultanceScientifiquePonctuelleService.editInstrumentIrdConsultanceScientifiquePonctuelleDialog;

       }
    set editInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.instrumentIrdConsultanceScientifiquePonctuelleService.editInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }

       get selectedConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
      set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
       get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
       set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }
       get createConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog;
       }
      set createConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog= value;
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
