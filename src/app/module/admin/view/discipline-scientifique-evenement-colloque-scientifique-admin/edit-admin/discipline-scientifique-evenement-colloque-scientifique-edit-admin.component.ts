import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueEvenementColloqueScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueEvenementColloqueScientifique.service';
import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';

@Component({
  selector: 'app-discipline-scientifique-evenement-colloque-scientifique-edit-admin',
  templateUrl: './discipline-scientifique-evenement-colloque-scientifique-edit-admin.component.html',
  styleUrls: ['./discipline-scientifique-evenement-colloque-scientifique-edit-admin.component.css']
})
export class DisciplineScientifiqueEvenementColloqueScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueEvenementColloqueScientifiqueService: DisciplineScientifiqueEvenementColloqueScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.disciplineScientifiqueEvenementColloqueScientifiqueService.edit().subscribe(disciplineScientifiqueEvenementColloqueScientifique=>{
    const myIndex = this.disciplineScientifiqueEvenementColloqueScientifiques.findIndex(e => e.id === this.selectedDisciplineScientifiqueEvenementColloqueScientifique.id);
    this.disciplineScientifiqueEvenementColloqueScientifiques[myIndex] = this.selectedDisciplineScientifiqueEvenementColloqueScientifique;
    this.editDisciplineScientifiqueEvenementColloqueScientifiqueDialog = false;
    this.selectedDisciplineScientifiqueEvenementColloqueScientifique = new DisciplineScientifiqueEvenementColloqueScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateevenementColloqueScienntifique(evenementColloqueScienntifique: string) {
                      const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'add');
                       if(isPermistted){
         this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
        this.createEvenementColloqueScienntifiqueDialog = true;
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
    this.editDisciplineScientifiqueEvenementColloqueScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiqueEvenementColloqueScientifiques(): Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
    return this.disciplineScientifiqueEvenementColloqueScientifiqueService.disciplineScientifiqueEvenementColloqueScientifiques;
       }
set disciplineScientifiqueEvenementColloqueScientifiques(value: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.disciplineScientifiqueEvenementColloqueScientifiques = value;
       }

 get selectedDisciplineScientifiqueEvenementColloqueScientifique(): DisciplineScientifiqueEvenementColloqueScientifiqueVo {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.selectedDisciplineScientifiqueEvenementColloqueScientifique;
       }
    set selectedDisciplineScientifiqueEvenementColloqueScientifique(value: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.selectedDisciplineScientifiqueEvenementColloqueScientifique = value;
       }

   get editDisciplineScientifiqueEvenementColloqueScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueEvenementColloqueScientifiqueService.editDisciplineScientifiqueEvenementColloqueScientifiqueDialog;

       }
    set editDisciplineScientifiqueEvenementColloqueScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueEvenementColloqueScientifiqueService.editDisciplineScientifiqueEvenementColloqueScientifiqueDialog = value;
       }

       get selectedEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
      set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }
       get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
       set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }
       get createEvenementColloqueScienntifiqueDialog(): boolean {
           return this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog;
       }
      set createEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog= value;
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
