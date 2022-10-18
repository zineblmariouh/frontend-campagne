import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConseilsScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilsScientifique.service';
import {DisciplineScientifiqueConseilsScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilsScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConseilsScientifiqueVo} from '../../../../../controller/model/ConseilsScientifique.model';
import {ConseilsScientifiqueService} from '../../../../../controller/service/ConseilsScientifique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-conseils-scientifique-edit-chercheur',
  templateUrl: './discipline-scientifique-conseils-scientifique-edit-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-conseils-scientifique-edit-chercheur.component.css']
})
export class DisciplineScientifiqueConseilsScientifiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueConseilsScientifiqueService: DisciplineScientifiqueConseilsScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private conseilsScientifiqueService: ConseilsScientifiqueService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
    this.conseilsScientifiqueService.findAll().subscribe((data) => this.conseilsScientifiques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.disciplineScientifiqueConseilsScientifiqueService.edit().subscribe(disciplineScientifiqueConseilsScientifique=>{
    const myIndex = this.disciplineScientifiqueConseilsScientifiques.findIndex(e => e.id === this.selectedDisciplineScientifiqueConseilsScientifique.id);
    this.disciplineScientifiqueConseilsScientifiques[myIndex] = this.selectedDisciplineScientifiqueConseilsScientifique;
    this.editDisciplineScientifiqueConseilsScientifiqueDialog = false;
    this.selectedDisciplineScientifiqueConseilsScientifique = new DisciplineScientifiqueConseilsScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateconseilsScientifique(conseilsScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilsScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilsScientifique = new ConseilsScientifiqueVo();
        this.createConseilsScientifiqueDialog = true;
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
    this.editDisciplineScientifiqueConseilsScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiqueConseilsScientifiques(): Array<DisciplineScientifiqueConseilsScientifiqueVo> {
    return this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiques;
       }
set disciplineScientifiqueConseilsScientifiques(value: Array<DisciplineScientifiqueConseilsScientifiqueVo>) {
        this.disciplineScientifiqueConseilsScientifiqueService.disciplineScientifiqueConseilsScientifiques = value;
       }

 get selectedDisciplineScientifiqueConseilsScientifique(): DisciplineScientifiqueConseilsScientifiqueVo {
           return this.disciplineScientifiqueConseilsScientifiqueService.selectedDisciplineScientifiqueConseilsScientifique;
       }
    set selectedDisciplineScientifiqueConseilsScientifique(value: DisciplineScientifiqueConseilsScientifiqueVo) {
        this.disciplineScientifiqueConseilsScientifiqueService.selectedDisciplineScientifiqueConseilsScientifique = value;
       }

   get editDisciplineScientifiqueConseilsScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueConseilsScientifiqueService.editDisciplineScientifiqueConseilsScientifiqueDialog;

       }
    set editDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilsScientifiqueService.editDisciplineScientifiqueConseilsScientifiqueDialog = value;
       }

       get selectedConseilsScientifique(): ConseilsScientifiqueVo {
           return this.conseilsScientifiqueService.selectedConseilsScientifique;
       }
      set selectedConseilsScientifique(value: ConseilsScientifiqueVo) {
        this.conseilsScientifiqueService.selectedConseilsScientifique = value;
       }
       get conseilsScientifiques(): Array<ConseilsScientifiqueVo> {
           return this.conseilsScientifiqueService.conseilsScientifiques;
       }
       set conseilsScientifiques(value: Array<ConseilsScientifiqueVo>) {
        this.conseilsScientifiqueService.conseilsScientifiques = value;
       }
       get createConseilsScientifiqueDialog(): boolean {
           return this.conseilsScientifiqueService.createConseilsScientifiqueDialog;
       }
      set createConseilsScientifiqueDialog(value: boolean) {
        this.conseilsScientifiqueService.createConseilsScientifiqueDialog= value;
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
