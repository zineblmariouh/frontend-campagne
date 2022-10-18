import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/DisciplineScientifiqueConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-consultance-scientifique-ponctuelle-edit-admin',
  templateUrl: './discipline-scientifique-consultance-scientifique-ponctuelle-edit-admin.component.html',
  styleUrls: ['./discipline-scientifique-consultance-scientifique-ponctuelle-edit-admin.component.css']
})
export class DisciplineScientifiqueConsultanceScientifiquePonctuelleEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueConsultanceScientifiquePonctuelleService: DisciplineScientifiqueConsultanceScientifiquePonctuelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.edit().subscribe(disciplineScientifiqueConsultanceScientifiquePonctuelle=>{
    const myIndex = this.disciplineScientifiqueConsultanceScientifiquePonctuelles.findIndex(e => e.id === this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle.id);
    this.disciplineScientifiqueConsultanceScientifiquePonctuelles[myIndex] = this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle;
    this.editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = false;
    this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();


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
// methods

hideEditDialog(){
    this.editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get disciplineScientifiqueConsultanceScientifiquePonctuelles(): Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
    return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelles;
       }
set disciplineScientifiqueConsultanceScientifiquePonctuelles(value: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.disciplineScientifiqueConsultanceScientifiquePonctuelles = value;
       }

 get selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle(): DisciplineScientifiqueConsultanceScientifiquePonctuelleVo {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle;
       }
    set selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle(value: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = value;
       }

   get editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;

       }
    set editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.disciplineScientifiqueConsultanceScientifiquePonctuelleService.editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
