import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdComiteEtCommissionEvaluationService} from '../../../../../controller/service/EnjeuxIrdComiteEtCommissionEvaluation.service';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EnjeuxIrdComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-enjeux-ird-comite-et-commission-evaluation-edit-chercheur',
  templateUrl: './enjeux-ird-comite-et-commission-evaluation-edit-chercheur.component.html',
  styleUrls: ['./enjeux-ird-comite-et-commission-evaluation-edit-chercheur.component.css']
})
export class EnjeuxIrdComiteEtCommissionEvaluationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdComiteEtCommissionEvaluationService: EnjeuxIrdComiteEtCommissionEvaluationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enjeuxIrdComiteEtCommissionEvaluationService.edit().subscribe(enjeuxIrdComiteEtCommissionEvaluation=>{
    const myIndex = this.enjeuxIrdComiteEtCommissionEvaluations.findIndex(e => e.id === this.selectedEnjeuxIrdComiteEtCommissionEvaluation.id);
    this.enjeuxIrdComiteEtCommissionEvaluations[myIndex] = this.selectedEnjeuxIrdComiteEtCommissionEvaluation;
    this.editEnjeuxIrdComiteEtCommissionEvaluationDialog = false;
    this.selectedEnjeuxIrdComiteEtCommissionEvaluation = new EnjeuxIrdComiteEtCommissionEvaluationVo();


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
    this.editEnjeuxIrdComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get enjeuxIrdComiteEtCommissionEvaluations(): Array<EnjeuxIrdComiteEtCommissionEvaluationVo> {
    return this.enjeuxIrdComiteEtCommissionEvaluationService.enjeuxIrdComiteEtCommissionEvaluations;
       }
set enjeuxIrdComiteEtCommissionEvaluations(value: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.enjeuxIrdComiteEtCommissionEvaluations = value;
       }

 get selectedEnjeuxIrdComiteEtCommissionEvaluation(): EnjeuxIrdComiteEtCommissionEvaluationVo {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.selectedEnjeuxIrdComiteEtCommissionEvaluation;
       }
    set selectedEnjeuxIrdComiteEtCommissionEvaluation(value: EnjeuxIrdComiteEtCommissionEvaluationVo) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.selectedEnjeuxIrdComiteEtCommissionEvaluation = value;
       }

   get editEnjeuxIrdComiteEtCommissionEvaluationDialog(): boolean {
           return this.enjeuxIrdComiteEtCommissionEvaluationService.editEnjeuxIrdComiteEtCommissionEvaluationDialog;

       }
    set editEnjeuxIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this.enjeuxIrdComiteEtCommissionEvaluationService.editEnjeuxIrdComiteEtCommissionEvaluationDialog = value;
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
