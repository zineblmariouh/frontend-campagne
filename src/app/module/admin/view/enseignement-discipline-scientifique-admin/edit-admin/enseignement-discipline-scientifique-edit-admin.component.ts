import {Component, OnInit} from '@angular/core';
import {EnseignementDisciplineScientifiqueService} from '../../../../../controller/service/EnseignementDisciplineScientifique.service';
import {EnseignementDisciplineScientifiqueVo} from '../../../../../controller/model/EnseignementDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-enseignement-discipline-scientifique-edit-admin',
  templateUrl: './enseignement-discipline-scientifique-edit-admin.component.html',
  styleUrls: ['./enseignement-discipline-scientifique-edit-admin.component.css']
})
export class EnseignementDisciplineScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enseignementDisciplineScientifiqueService: EnseignementDisciplineScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enseignementService: EnseignementService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enseignementDisciplineScientifiqueService.edit().subscribe(enseignementDisciplineScientifique=>{
    const myIndex = this.enseignementDisciplineScientifiques.findIndex(e => e.id === this.selectedEnseignementDisciplineScientifique.id);
    this.enseignementDisciplineScientifiques[myIndex] = this.selectedEnseignementDisciplineScientifique;
    this.editEnseignementDisciplineScientifiqueDialog = false;
    this.selectedEnseignementDisciplineScientifique = new EnseignementDisciplineScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenseignement(enseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('Enseignement', 'add');
                       if(isPermistted){
         this.selectedEnseignement = new EnseignementVo();
        this.createEnseignementDialog = true;
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
    this.editEnseignementDisciplineScientifiqueDialog  = false;
}

// getters and setters

get enseignementDisciplineScientifiques(): Array<EnseignementDisciplineScientifiqueVo> {
    return this.enseignementDisciplineScientifiqueService.enseignementDisciplineScientifiques;
       }
set enseignementDisciplineScientifiques(value: Array<EnseignementDisciplineScientifiqueVo>) {
        this.enseignementDisciplineScientifiqueService.enseignementDisciplineScientifiques = value;
       }

 get selectedEnseignementDisciplineScientifique(): EnseignementDisciplineScientifiqueVo {
           return this.enseignementDisciplineScientifiqueService.selectedEnseignementDisciplineScientifique;
       }
    set selectedEnseignementDisciplineScientifique(value: EnseignementDisciplineScientifiqueVo) {
        this.enseignementDisciplineScientifiqueService.selectedEnseignementDisciplineScientifique = value;
       }

   get editEnseignementDisciplineScientifiqueDialog(): boolean {
           return this.enseignementDisciplineScientifiqueService.editEnseignementDisciplineScientifiqueDialog;

       }
    set editEnseignementDisciplineScientifiqueDialog(value: boolean) {
        this.enseignementDisciplineScientifiqueService.editEnseignementDisciplineScientifiqueDialog = value;
       }

       get selectedEnseignement(): EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements(): Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get createEnseignementDialog(): boolean {
           return this.enseignementService.createEnseignementDialog;
       }
      set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
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
