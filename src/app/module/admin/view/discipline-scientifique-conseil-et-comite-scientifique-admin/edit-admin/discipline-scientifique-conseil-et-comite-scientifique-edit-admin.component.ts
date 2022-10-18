import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueConseilEtComiteScientifiqueService} from '../../../../../controller/service/DisciplineScientifiqueConseilEtComiteScientifique.service';
import {DisciplineScientifiqueConseilEtComiteScientifiqueVo} from '../../../../../controller/model/DisciplineScientifiqueConseilEtComiteScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ConseilEtComiteScientifiqueVo} from '../../../../../controller/model/ConseilEtComiteScientifique.model';
import {ConseilEtComiteScientifiqueService} from '../../../../../controller/service/ConseilEtComiteScientifique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-discipline-scientifique-conseil-et-comite-scientifique-edit-admin',
  templateUrl: './discipline-scientifique-conseil-et-comite-scientifique-edit-admin.component.html',
  styleUrls: ['./discipline-scientifique-conseil-et-comite-scientifique-edit-admin.component.css']
})
export class DisciplineScientifiqueConseilEtComiteScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueConseilEtComiteScientifiqueService: DisciplineScientifiqueConseilEtComiteScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private conseilEtComiteScientifiqueService: ConseilEtComiteScientifiqueService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
    this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
    this.conseilEtComiteScientifiqueService.findAll().subscribe((data) => this.conseilEtComiteScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.disciplineScientifiqueConseilEtComiteScientifiqueService.edit().subscribe(disciplineScientifiqueConseilEtComiteScientifique=>{
    const myIndex = this.disciplineScientifiqueConseilEtComiteScientifiques.findIndex(e => e.id === this.selectedDisciplineScientifiqueConseilEtComiteScientifique.id);
    this.disciplineScientifiqueConseilEtComiteScientifiques[myIndex] = this.selectedDisciplineScientifiqueConseilEtComiteScientifique;
    this.editDisciplineScientifiqueConseilEtComiteScientifiqueDialog = false;
    this.selectedDisciplineScientifiqueConseilEtComiteScientifique = new DisciplineScientifiqueConseilEtComiteScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateconseilEtComiteScientifique(conseilEtComiteScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ConseilEtComiteScientifique', 'add');
                       if(isPermistted){
         this.selectedConseilEtComiteScientifique = new ConseilEtComiteScientifiqueVo();
        this.createConseilEtComiteScientifiqueDialog = true;
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
    this.editDisciplineScientifiqueConseilEtComiteScientifiqueDialog  = false;
}

// getters and setters

get disciplineScientifiqueConseilEtComiteScientifiques(): Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo> {
    return this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiques;
       }
set disciplineScientifiqueConseilEtComiteScientifiques(value: Array<DisciplineScientifiqueConseilEtComiteScientifiqueVo>) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.disciplineScientifiqueConseilEtComiteScientifiques = value;
       }

 get selectedDisciplineScientifiqueConseilEtComiteScientifique(): DisciplineScientifiqueConseilEtComiteScientifiqueVo {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.selectedDisciplineScientifiqueConseilEtComiteScientifique;
       }
    set selectedDisciplineScientifiqueConseilEtComiteScientifique(value: DisciplineScientifiqueConseilEtComiteScientifiqueVo) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.selectedDisciplineScientifiqueConseilEtComiteScientifique = value;
       }

   get editDisciplineScientifiqueConseilEtComiteScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueConseilEtComiteScientifiqueService.editDisciplineScientifiqueConseilEtComiteScientifiqueDialog;

       }
    set editDisciplineScientifiqueConseilEtComiteScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueConseilEtComiteScientifiqueService.editDisciplineScientifiqueConseilEtComiteScientifiqueDialog = value;
       }

       get selectedConseilEtComiteScientifique(): ConseilEtComiteScientifiqueVo {
           return this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique;
       }
      set selectedConseilEtComiteScientifique(value: ConseilEtComiteScientifiqueVo) {
        this.conseilEtComiteScientifiqueService.selectedConseilEtComiteScientifique = value;
       }
       get conseilEtComiteScientifiques(): Array<ConseilEtComiteScientifiqueVo> {
           return this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques;
       }
       set conseilEtComiteScientifiques(value: Array<ConseilEtComiteScientifiqueVo>) {
        this.conseilEtComiteScientifiqueService.conseilEtComiteScientifiques = value;
       }
       get createConseilEtComiteScientifiqueDialog(): boolean {
           return this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog;
       }
      set createConseilEtComiteScientifiqueDialog(value: boolean) {
        this.conseilEtComiteScientifiqueService.createConseilEtComiteScientifiqueDialog= value;
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
