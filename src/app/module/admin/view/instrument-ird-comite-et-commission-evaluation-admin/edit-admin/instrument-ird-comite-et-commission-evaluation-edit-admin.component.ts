import {Component, OnInit} from '@angular/core';
import {InstrumentIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/InstrumentIrdComiteEtCommissionEvaluation.service';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/InstrumentIrdComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-instrument-ird-comite-et-commission-evaluation-edit-admin',
  templateUrl: './instrument-ird-comite-et-commission-evaluation-edit-admin.component.html',
  styleUrls: ['./instrument-ird-comite-et-commission-evaluation-edit-admin.component.css']
})
export class InstrumentIrdComiteEtCommissionEvaluationEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdComiteEtCommissionEvaluationService: InstrumentIrdComiteEtCommissionEvaluationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
 ,       private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
 ,       private instrumentIrdService: InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.instrumentIrdComiteEtCommissionEvaluationService.edit().subscribe(instrumentIrdComiteEtCommissionEvaluation=>{
    const myIndex = this.instrumentIrdComiteEtCommissionEvaluations.findIndex(e => e.id === this.selectedInstrumentIrdComiteEtCommissionEvaluation.id);
    this.instrumentIrdComiteEtCommissionEvaluations[myIndex] = this.selectedInstrumentIrdComiteEtCommissionEvaluation;
    this.editInstrumentIrdComiteEtCommissionEvaluationDialog = false;
    this.selectedInstrumentIrdComiteEtCommissionEvaluation = new InstrumentIrdComiteEtCommissionEvaluationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeInstrumentIrd(typeInstrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
        this.createTypeInstrumentIrdDialog = true;
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
              public async openCreatecomiteEtCommissionEvaluation(comiteEtCommissionEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('ComiteEtCommissionEvaluation', 'add');
                       if(isPermistted){
         this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
        this.createComiteEtCommissionEvaluationDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editInstrumentIrdComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get instrumentIrdComiteEtCommissionEvaluations(): Array<InstrumentIrdComiteEtCommissionEvaluationVo> {
    return this.instrumentIrdComiteEtCommissionEvaluationService.instrumentIrdComiteEtCommissionEvaluations;
       }
set instrumentIrdComiteEtCommissionEvaluations(value: Array<InstrumentIrdComiteEtCommissionEvaluationVo>) {
        this.instrumentIrdComiteEtCommissionEvaluationService.instrumentIrdComiteEtCommissionEvaluations = value;
       }

 get selectedInstrumentIrdComiteEtCommissionEvaluation(): InstrumentIrdComiteEtCommissionEvaluationVo {
           return this.instrumentIrdComiteEtCommissionEvaluationService.selectedInstrumentIrdComiteEtCommissionEvaluation;
       }
    set selectedInstrumentIrdComiteEtCommissionEvaluation(value: InstrumentIrdComiteEtCommissionEvaluationVo) {
        this.instrumentIrdComiteEtCommissionEvaluationService.selectedInstrumentIrdComiteEtCommissionEvaluation = value;
       }

   get editInstrumentIrdComiteEtCommissionEvaluationDialog(): boolean {
           return this.instrumentIrdComiteEtCommissionEvaluationService.editInstrumentIrdComiteEtCommissionEvaluationDialog;

       }
    set editInstrumentIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.instrumentIrdComiteEtCommissionEvaluationService.editInstrumentIrdComiteEtCommissionEvaluationDialog = value;
       }

       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
      set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
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
       get selectedComiteEtCommissionEvaluation(): ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
      set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }
       get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
           return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
       set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }
       get createComiteEtCommissionEvaluationDialog(): boolean {
           return this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog;
       }
      set createComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.createComiteEtCommissionEvaluationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
