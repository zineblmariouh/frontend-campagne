import {Component, OnInit} from '@angular/core';
import {InstrumentIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/InstrumentIrdComiteEtCommissionEvaluation.service';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/InstrumentIrdComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-instrument-ird-comite-et-commission-evaluation-view-admin',
  templateUrl: './instrument-ird-comite-et-commission-evaluation-view-admin.component.html',
  styleUrls: ['./instrument-ird-comite-et-commission-evaluation-view-admin.component.css']
})
export class InstrumentIrdComiteEtCommissionEvaluationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdComiteEtCommissionEvaluationService: InstrumentIrdComiteEtCommissionEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private typeInstrumentIrdService :TypeInstrumentIrdService
    ,private comiteEtCommissionEvaluationService :ComiteEtCommissionEvaluationService
    ,private instrumentIrdService :InstrumentIrdService
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

hideViewDialog(){
    this.viewInstrumentIrdComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get instrumentIrdComiteEtCommissionEvaluations(): Array<InstrumentIrdComiteEtCommissionEvaluationVo> {
    return this.instrumentIrdComiteEtCommissionEvaluationService.instrumentIrdComiteEtCommissionEvaluations;
       }
set instrumentIrdComiteEtCommissionEvaluations(value: Array<InstrumentIrdComiteEtCommissionEvaluationVo>) {
        this.instrumentIrdComiteEtCommissionEvaluationService.instrumentIrdComiteEtCommissionEvaluations = value;
       }

 get selectedInstrumentIrdComiteEtCommissionEvaluation():InstrumentIrdComiteEtCommissionEvaluationVo {
           return this.instrumentIrdComiteEtCommissionEvaluationService.selectedInstrumentIrdComiteEtCommissionEvaluation;
       }
    set selectedInstrumentIrdComiteEtCommissionEvaluation(value: InstrumentIrdComiteEtCommissionEvaluationVo) {
        this.instrumentIrdComiteEtCommissionEvaluationService.selectedInstrumentIrdComiteEtCommissionEvaluation = value;
       }

   get viewInstrumentIrdComiteEtCommissionEvaluationDialog():boolean {
           return this.instrumentIrdComiteEtCommissionEvaluationService.viewInstrumentIrdComiteEtCommissionEvaluationDialog;

       }
    set viewInstrumentIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.instrumentIrdComiteEtCommissionEvaluationService.viewInstrumentIrdComiteEtCommissionEvaluationDialog= value;
       }

       get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds():Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get editTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;
       }
      set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog= value;
       }
       get selectedInstrumentIrd():InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds():Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get editInstrumentIrdDialog():boolean {
           return this.instrumentIrdService.editInstrumentIrdDialog;
       }
      set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog= value;
       }
       get selectedComiteEtCommissionEvaluation():ComiteEtCommissionEvaluationVo {
           return this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation;
       }
      set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this.comiteEtCommissionEvaluationService.selectedComiteEtCommissionEvaluation = value;
       }
       get comiteEtCommissionEvaluations():Array<ComiteEtCommissionEvaluationVo> {
           return this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations;
       }
       set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this.comiteEtCommissionEvaluationService.comiteEtCommissionEvaluations = value;
       }
       get editComiteEtCommissionEvaluationDialog():boolean {
           return this.comiteEtCommissionEvaluationService.editComiteEtCommissionEvaluationDialog;
       }
      set editComiteEtCommissionEvaluationDialog(value: boolean) {
        this.comiteEtCommissionEvaluationService.editComiteEtCommissionEvaluationDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
