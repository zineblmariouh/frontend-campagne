import {Component, OnInit} from '@angular/core';
import {EtablissementComiteEtCommissionEvaluationService} from '../../../../../controller/service/EtablissementComiteEtCommissionEvaluation.service';
import {EtablissementComiteEtCommissionEvaluationVo} from '../../../../../controller/model/EtablissementComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-etablissement-comite-et-commission-evaluation-edit-chercheur',
  templateUrl: './etablissement-comite-et-commission-evaluation-edit-chercheur.component.html',
  styleUrls: ['./etablissement-comite-et-commission-evaluation-edit-chercheur.component.css']
})
export class EtablissementComiteEtCommissionEvaluationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etablissementComiteEtCommissionEvaluationService: EtablissementComiteEtCommissionEvaluationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
 ,       private etablissementService: EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.etablissementComiteEtCommissionEvaluationService.edit().subscribe(etablissementComiteEtCommissionEvaluation=>{
    const myIndex = this.etablissementComiteEtCommissionEvaluations.findIndex(e => e.id === this.selectedEtablissementComiteEtCommissionEvaluation.id);
    this.etablissementComiteEtCommissionEvaluations[myIndex] = this.selectedEtablissementComiteEtCommissionEvaluation;
    this.editEtablissementComiteEtCommissionEvaluationDialog = false;
    this.selectedEtablissementComiteEtCommissionEvaluation = new EtablissementComiteEtCommissionEvaluationVo();


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
    this.editEtablissementComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get etablissementComiteEtCommissionEvaluations(): Array<EtablissementComiteEtCommissionEvaluationVo> {
    return this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluations;
       }
set etablissementComiteEtCommissionEvaluations(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
        this.etablissementComiteEtCommissionEvaluationService.etablissementComiteEtCommissionEvaluations = value;
       }

 get selectedEtablissementComiteEtCommissionEvaluation(): EtablissementComiteEtCommissionEvaluationVo {
           return this.etablissementComiteEtCommissionEvaluationService.selectedEtablissementComiteEtCommissionEvaluation;
       }
    set selectedEtablissementComiteEtCommissionEvaluation(value: EtablissementComiteEtCommissionEvaluationVo) {
        this.etablissementComiteEtCommissionEvaluationService.selectedEtablissementComiteEtCommissionEvaluation = value;
       }

   get editEtablissementComiteEtCommissionEvaluationDialog(): boolean {
           return this.etablissementComiteEtCommissionEvaluationService.editEtablissementComiteEtCommissionEvaluationDialog;

       }
    set editEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this.etablissementComiteEtCommissionEvaluationService.editEtablissementComiteEtCommissionEvaluationDialog = value;
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
