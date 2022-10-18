import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueEncadrementDoctorantService} from '../../../../../controller/service/DisciplineScientifiqueEncadrementDoctorant.service';
import {DisciplineScientifiqueEncadrementDoctorantVo} from '../../../../../controller/model/DisciplineScientifiqueEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';

@Component({
  selector: 'app-discipline-scientifique-encadrement-doctorant-edit-admin',
  templateUrl: './discipline-scientifique-encadrement-doctorant-edit-admin.component.html',
  styleUrls: ['./discipline-scientifique-encadrement-doctorant-edit-admin.component.css']
})
export class DisciplineScientifiqueEncadrementDoctorantEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueEncadrementDoctorantService: DisciplineScientifiqueEncadrementDoctorantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
 ,       private encadrementDoctorantService: EncadrementDoctorantService
) {
}

// methods
ngOnInit(): void {
    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
    this.encadrementDoctorantService.findAll().subscribe((data) => this.encadrementDoctorants = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.disciplineScientifiqueEncadrementDoctorantService.edit().subscribe(disciplineScientifiqueEncadrementDoctorant=>{
    const myIndex = this.disciplineScientifiqueEncadrementDoctorants.findIndex(e => e.id === this.selectedDisciplineScientifiqueEncadrementDoctorant.id);
    this.disciplineScientifiqueEncadrementDoctorants[myIndex] = this.selectedDisciplineScientifiqueEncadrementDoctorant;
    this.editDisciplineScientifiqueEncadrementDoctorantDialog = false;
    this.selectedDisciplineScientifiqueEncadrementDoctorant = new DisciplineScientifiqueEncadrementDoctorantVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateencadrementDoctorant(encadrementDoctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'add');
                       if(isPermistted){
         this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
        this.createEncadrementDoctorantDialog = true;
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
    this.editDisciplineScientifiqueEncadrementDoctorantDialog  = false;
}

// getters and setters

get disciplineScientifiqueEncadrementDoctorants(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
    return this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorants;
       }
set disciplineScientifiqueEncadrementDoctorants(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
        this.disciplineScientifiqueEncadrementDoctorantService.disciplineScientifiqueEncadrementDoctorants = value;
       }

 get selectedDisciplineScientifiqueEncadrementDoctorant(): DisciplineScientifiqueEncadrementDoctorantVo {
           return this.disciplineScientifiqueEncadrementDoctorantService.selectedDisciplineScientifiqueEncadrementDoctorant;
       }
    set selectedDisciplineScientifiqueEncadrementDoctorant(value: DisciplineScientifiqueEncadrementDoctorantVo) {
        this.disciplineScientifiqueEncadrementDoctorantService.selectedDisciplineScientifiqueEncadrementDoctorant = value;
       }

   get editDisciplineScientifiqueEncadrementDoctorantDialog(): boolean {
           return this.disciplineScientifiqueEncadrementDoctorantService.editDisciplineScientifiqueEncadrementDoctorantDialog;

       }
    set editDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this.disciplineScientifiqueEncadrementDoctorantService.editDisciplineScientifiqueEncadrementDoctorantDialog = value;
       }

       get selectedEncadrementDoctorant(): EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
      set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }
       get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
           return this.encadrementDoctorantService.encadrementDoctorants;
       }
       set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }
       get createEncadrementDoctorantDialog(): boolean {
           return this.encadrementDoctorantService.createEncadrementDoctorantDialog;
       }
      set createEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.createEncadrementDoctorantDialog= value;
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
