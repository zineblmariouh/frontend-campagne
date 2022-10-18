import {Component, OnInit} from '@angular/core';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluationComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';

@Component({
  selector: 'app-type-expertise-evaluation-comite-et-commission-evaluation-edit-chercheur',
  templateUrl: './type-expertise-evaluation-comite-et-commission-evaluation-edit-chercheur.component.html',
  styleUrls: ['./type-expertise-evaluation-comite-et-commission-evaluation-edit-chercheur.component.css']
})
export class TypeExpertiseEvaluationComiteEtCommissionEvaluationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeExpertiseEvaluationComiteEtCommissionEvaluationService: TypeExpertiseEvaluationComiteEtCommissionEvaluationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
 ,       private typeExpertiseEvaluationService: TypeExpertiseEvaluationService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();
    this.typeExpertiseEvaluationService.findAll().subscribe((data) => this.typeExpertiseEvaluations = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.edit().subscribe(typeExpertiseEvaluationComiteEtCommissionEvaluation=>{
    const myIndex = this.typeExpertiseEvaluationComiteEtCommissionEvaluations.findIndex(e => e.id === this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation.id);
    this.typeExpertiseEvaluationComiteEtCommissionEvaluations[myIndex] = this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation;
    this.editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = false;
    this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeExpertiseEvaluation(typeExpertiseEvaluation: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeExpertiseEvaluation', 'add');
                       if(isPermistted){
         this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();
        this.createTypeExpertiseEvaluationDialog = true;
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
    this.editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get typeExpertiseEvaluationComiteEtCommissionEvaluations(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
    return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluations;
       }
set typeExpertiseEvaluationComiteEtCommissionEvaluations(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.typeExpertiseEvaluationComiteEtCommissionEvaluations = value;
       }

 get selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation(): TypeExpertiseEvaluationComiteEtCommissionEvaluationVo {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation;
       }
    set selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation(value: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = value;
       }

   get editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(): boolean {
           return this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;

       }
    set editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationComiteEtCommissionEvaluationService.editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = value;
       }

       get selectedTypeExpertiseEvaluation(): TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
      set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }
       get typeExpertiseEvaluations(): Array<TypeExpertiseEvaluationVo> {
           return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
       set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }
       get createTypeExpertiseEvaluationDialog(): boolean {
           return this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog;
       }
      set createTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.createTypeExpertiseEvaluationDialog= value;
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
