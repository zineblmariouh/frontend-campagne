import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueComiteEtCommissionEvaluationService} from '../../../../../controller/service/DisciplineScientifiqueComiteEtCommissionEvaluation.service';
import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../../../../../controller/model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ComiteEtCommissionEvaluationVo} from '../../../../../controller/model/ComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationService} from '../../../../../controller/service/ComiteEtCommissionEvaluation.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-comite-et-commission-evaluation-edit-admin',
  templateUrl: './discipline-scientifique-comite-et-commission-evaluation-edit-admin.component.html',
  styleUrls: ['./discipline-scientifique-comite-et-commission-evaluation-edit-admin.component.css']
})
export class DisciplineScientifiqueComiteEtCommissionEvaluationEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueComiteEtCommissionEvaluationService: DisciplineScientifiqueComiteEtCommissionEvaluationService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private comiteEtCommissionEvaluationService: ComiteEtCommissionEvaluationService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedComiteEtCommissionEvaluation = new ComiteEtCommissionEvaluationVo();
    this.comiteEtCommissionEvaluationService.findAll().subscribe((data) => this.comiteEtCommissionEvaluations = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.disciplineScientifiqueComiteEtCommissionEvaluationService.edit().subscribe(disciplineScientifiqueComiteEtCommissionEvaluation=>{
    const myIndex = this.disciplineScientifiqueComiteEtCommissionEvaluations.findIndex(e => e.id === this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation.id);
    this.disciplineScientifiqueComiteEtCommissionEvaluations[myIndex] = this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation;
    this.editDisciplineScientifiqueComiteEtCommissionEvaluationDialog = false;
    this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation = new DisciplineScientifiqueComiteEtCommissionEvaluationVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
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
    this.editDisciplineScientifiqueComiteEtCommissionEvaluationDialog  = false;
}

// getters and setters

get disciplineScientifiqueComiteEtCommissionEvaluations(): Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
    return this.disciplineScientifiqueComiteEtCommissionEvaluationService.disciplineScientifiqueComiteEtCommissionEvaluations;
       }
set disciplineScientifiqueComiteEtCommissionEvaluations(value: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.disciplineScientifiqueComiteEtCommissionEvaluations = value;
       }

 get selectedDisciplineScientifiqueComiteEtCommissionEvaluation(): DisciplineScientifiqueComiteEtCommissionEvaluationVo {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.selectedDisciplineScientifiqueComiteEtCommissionEvaluation;
       }
    set selectedDisciplineScientifiqueComiteEtCommissionEvaluation(value: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.selectedDisciplineScientifiqueComiteEtCommissionEvaluation = value;
       }

   get editDisciplineScientifiqueComiteEtCommissionEvaluationDialog(): boolean {
           return this.disciplineScientifiqueComiteEtCommissionEvaluationService.editDisciplineScientifiqueComiteEtCommissionEvaluationDialog;

       }
    set editDisciplineScientifiqueComiteEtCommissionEvaluationDialog(value: boolean) {
        this.disciplineScientifiqueComiteEtCommissionEvaluationService.editDisciplineScientifiqueComiteEtCommissionEvaluationDialog = value;
       }

       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
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
