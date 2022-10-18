import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.service';
import {RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-discipline-scientifique-edit-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-discipline-scientifique-edit-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-discipline-scientifique-edit-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.edit().subscribe(rencontreGrandPubliqueJeunePubliqueDisciplineScientifique=>{
    const myIndex = this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques.findIndex(e => e.id === this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique.id);
    this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques[myIndex] = this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique;
    this.editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = false;
    this.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = new RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreaterencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'add');
                       if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
        this.createRencontreGrandPubliqueJeunePubliqueDialog = true;
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
    this.editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(): Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo> {
    return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques;
       }
set rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques(value: Array<RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiques = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(): RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique(value: RencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.selectedRencontreGrandPubliqueJeunePubliqueDisciplineScientifique = value;
       }

   get editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog;

       }
    set editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueService.editRencontreGrandPubliqueJeunePubliqueDisciplineScientifiqueDialog = value;
       }

       get selectedRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get createRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog= value;
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
