import {Component, OnInit} from '@angular/core';
import {FormationContinueObjetFormationGeneriqueService} from '../../../../../controller/service/FormationContinueObjetFormationGenerique.service';
import {FormationContinueObjetFormationGeneriqueVo} from '../../../../../controller/model/FormationContinueObjetFormationGenerique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';

@Component({
  selector: 'app-formation-continue-objet-formation-generique-edit-chercheur',
  templateUrl: './formation-continue-objet-formation-generique-edit-chercheur.component.html',
  styleUrls: ['./formation-continue-objet-formation-generique-edit-chercheur.component.css']
})
export class FormationContinueObjetFormationGeneriqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinueObjetFormationGeneriqueService: FormationContinueObjetFormationGeneriqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private objetFormationGeneriqueService: ObjetFormationGeneriqueService
 ,       private formationContinueService: FormationContinueService
) {
}

// methods
ngOnInit(): void {
    this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
    this.objetFormationGeneriqueService.findAll().subscribe((data) => this.objetFormationGeneriques = data);
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.formationContinueObjetFormationGeneriqueService.edit().subscribe(formationContinueObjetFormationGenerique=>{
    const myIndex = this.formationContinueObjetFormationGeneriques.findIndex(e => e.id === this.selectedFormationContinueObjetFormationGenerique.id);
    this.formationContinueObjetFormationGeneriques[myIndex] = this.selectedFormationContinueObjetFormationGenerique;
    this.editFormationContinueObjetFormationGeneriqueDialog = false;
    this.selectedFormationContinueObjetFormationGenerique = new FormationContinueObjetFormationGeneriqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateobjetFormationGenerique(objetFormationGenerique: string) {
                      const isPermistted = await this.roleService.isPermitted('ObjetFormationGenerique', 'add');
                       if(isPermistted){
         this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();
        this.createObjetFormationGeneriqueDialog = true;
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
    this.editFormationContinueObjetFormationGeneriqueDialog  = false;
}

// getters and setters

get formationContinueObjetFormationGeneriques(): Array<FormationContinueObjetFormationGeneriqueVo> {
    return this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriques;
       }
set formationContinueObjetFormationGeneriques(value: Array<FormationContinueObjetFormationGeneriqueVo>) {
        this.formationContinueObjetFormationGeneriqueService.formationContinueObjetFormationGeneriques = value;
       }

 get selectedFormationContinueObjetFormationGenerique(): FormationContinueObjetFormationGeneriqueVo {
           return this.formationContinueObjetFormationGeneriqueService.selectedFormationContinueObjetFormationGenerique;
       }
    set selectedFormationContinueObjetFormationGenerique(value: FormationContinueObjetFormationGeneriqueVo) {
        this.formationContinueObjetFormationGeneriqueService.selectedFormationContinueObjetFormationGenerique = value;
       }

   get editFormationContinueObjetFormationGeneriqueDialog(): boolean {
           return this.formationContinueObjetFormationGeneriqueService.editFormationContinueObjetFormationGeneriqueDialog;

       }
    set editFormationContinueObjetFormationGeneriqueDialog(value: boolean) {
        this.formationContinueObjetFormationGeneriqueService.editFormationContinueObjetFormationGeneriqueDialog = value;
       }

       get selectedObjetFormationGenerique(): ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
      set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }
       get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
           return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
       set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }
       get createObjetFormationGeneriqueDialog(): boolean {
           return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;
       }
      set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog= value;
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
