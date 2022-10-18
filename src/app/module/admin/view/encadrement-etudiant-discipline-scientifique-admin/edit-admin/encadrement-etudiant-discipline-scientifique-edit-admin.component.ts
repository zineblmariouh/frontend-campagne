import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantDisciplineScientifiqueService} from '../../../../../controller/service/EncadrementEtudiantDisciplineScientifique.service';
import {EncadrementEtudiantDisciplineScientifiqueVo} from '../../../../../controller/model/EncadrementEtudiantDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-encadrement-etudiant-discipline-scientifique-edit-admin',
  templateUrl: './encadrement-etudiant-discipline-scientifique-edit-admin.component.html',
  styleUrls: ['./encadrement-etudiant-discipline-scientifique-edit-admin.component.css']
})
export class EncadrementEtudiantDisciplineScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private encadrementEtudiantDisciplineScientifiqueService: EncadrementEtudiantDisciplineScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private encadrementEtudiantService: EncadrementEtudiantService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
    this.encadrementEtudiantService.findAll().subscribe((data) => this.encadrementEtudiants = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.encadrementEtudiantDisciplineScientifiqueService.edit().subscribe(encadrementEtudiantDisciplineScientifique=>{
    const myIndex = this.encadrementEtudiantDisciplineScientifiques.findIndex(e => e.id === this.selectedEncadrementEtudiantDisciplineScientifique.id);
    this.encadrementEtudiantDisciplineScientifiques[myIndex] = this.selectedEncadrementEtudiantDisciplineScientifique;
    this.editEncadrementEtudiantDisciplineScientifiqueDialog = false;
    this.selectedEncadrementEtudiantDisciplineScientifique = new EncadrementEtudiantDisciplineScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateencadrementEtudiant(encadrementEtudiant: string) {
                      const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'add');
                       if(isPermistted){
         this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
        this.createEncadrementEtudiantDialog = true;
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
    this.editEncadrementEtudiantDisciplineScientifiqueDialog  = false;
}

// getters and setters

get encadrementEtudiantDisciplineScientifiques(): Array<EncadrementEtudiantDisciplineScientifiqueVo> {
    return this.encadrementEtudiantDisciplineScientifiqueService.encadrementEtudiantDisciplineScientifiques;
       }
set encadrementEtudiantDisciplineScientifiques(value: Array<EncadrementEtudiantDisciplineScientifiqueVo>) {
        this.encadrementEtudiantDisciplineScientifiqueService.encadrementEtudiantDisciplineScientifiques = value;
       }

 get selectedEncadrementEtudiantDisciplineScientifique(): EncadrementEtudiantDisciplineScientifiqueVo {
           return this.encadrementEtudiantDisciplineScientifiqueService.selectedEncadrementEtudiantDisciplineScientifique;
       }
    set selectedEncadrementEtudiantDisciplineScientifique(value: EncadrementEtudiantDisciplineScientifiqueVo) {
        this.encadrementEtudiantDisciplineScientifiqueService.selectedEncadrementEtudiantDisciplineScientifique = value;
       }

   get editEncadrementEtudiantDisciplineScientifiqueDialog(): boolean {
           return this.encadrementEtudiantDisciplineScientifiqueService.editEncadrementEtudiantDisciplineScientifiqueDialog;

       }
    set editEncadrementEtudiantDisciplineScientifiqueDialog(value: boolean) {
        this.encadrementEtudiantDisciplineScientifiqueService.editEncadrementEtudiantDisciplineScientifiqueDialog = value;
       }

       get selectedEncadrementEtudiant(): EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
      set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }
       get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
           return this.encadrementEtudiantService.encadrementEtudiants;
       }
       set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }
       get createEncadrementEtudiantDialog(): boolean {
           return this.encadrementEtudiantService.createEncadrementEtudiantDialog;
       }
      set createEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.createEncadrementEtudiantDialog= value;
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
