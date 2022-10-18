import {Component, OnInit} from '@angular/core';
import {FormationContinueDisciplineScientifiqueService} from '../../../../../controller/service/FormationContinueDisciplineScientifique.service';
import {FormationContinueDisciplineScientifiqueVo} from '../../../../../controller/model/FormationContinueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-formation-continue-discipline-scientifique-edit-admin',
  templateUrl: './formation-continue-discipline-scientifique-edit-admin.component.html',
  styleUrls: ['./formation-continue-discipline-scientifique-edit-admin.component.css']
})
export class FormationContinueDisciplineScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinueDisciplineScientifiqueService: FormationContinueDisciplineScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private formationContinueService: FormationContinueService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.formationContinueDisciplineScientifiqueService.edit().subscribe(formationContinueDisciplineScientifique=>{
    const myIndex = this.formationContinueDisciplineScientifiques.findIndex(e => e.id === this.selectedFormationContinueDisciplineScientifique.id);
    this.formationContinueDisciplineScientifiques[myIndex] = this.selectedFormationContinueDisciplineScientifique;
    this.editFormationContinueDisciplineScientifiqueDialog = false;
    this.selectedFormationContinueDisciplineScientifique = new FormationContinueDisciplineScientifiqueVo();


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
              public async openCreateformationContinue(formationContinue: string) {
                      const isPermistted = await this.roleService.isPermitted('FormationContinue', 'add');
                       if(isPermistted){
         this.selectedFormationContinue = new FormationContinueVo();
        this.createFormationContinueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editFormationContinueDisciplineScientifiqueDialog  = false;
}

// getters and setters

get formationContinueDisciplineScientifiques(): Array<FormationContinueDisciplineScientifiqueVo> {
    return this.formationContinueDisciplineScientifiqueService.formationContinueDisciplineScientifiques;
       }
set formationContinueDisciplineScientifiques(value: Array<FormationContinueDisciplineScientifiqueVo>) {
        this.formationContinueDisciplineScientifiqueService.formationContinueDisciplineScientifiques = value;
       }

 get selectedFormationContinueDisciplineScientifique(): FormationContinueDisciplineScientifiqueVo {
           return this.formationContinueDisciplineScientifiqueService.selectedFormationContinueDisciplineScientifique;
       }
    set selectedFormationContinueDisciplineScientifique(value: FormationContinueDisciplineScientifiqueVo) {
        this.formationContinueDisciplineScientifiqueService.selectedFormationContinueDisciplineScientifique = value;
       }

   get editFormationContinueDisciplineScientifiqueDialog(): boolean {
           return this.formationContinueDisciplineScientifiqueService.editFormationContinueDisciplineScientifiqueDialog;

       }
    set editFormationContinueDisciplineScientifiqueDialog(value: boolean) {
        this.formationContinueDisciplineScientifiqueService.editFormationContinueDisciplineScientifiqueDialog = value;
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
       get selectedFormationContinue(): FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
      set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }
       get formationContinues(): Array<FormationContinueVo> {
           return this.formationContinueService.formationContinues;
       }
       set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }
       get createFormationContinueDialog(): boolean {
           return this.formationContinueService.createFormationContinueDialog;
       }
      set createFormationContinueDialog(value: boolean) {
        this.formationContinueService.createFormationContinueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
