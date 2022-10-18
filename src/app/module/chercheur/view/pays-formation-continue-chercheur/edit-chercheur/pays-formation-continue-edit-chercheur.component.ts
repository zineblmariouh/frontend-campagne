import {Component, OnInit} from '@angular/core';
import {PaysFormationContinueService} from '../../../../../controller/service/PaysFormationContinue.service';
import {PaysFormationContinueVo} from '../../../../../controller/model/PaysFormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-pays-formation-continue-edit-chercheur',
  templateUrl: './pays-formation-continue-edit-chercheur.component.html',
  styleUrls: ['./pays-formation-continue-edit-chercheur.component.css']
})
export class PaysFormationContinueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private paysFormationContinueService: PaysFormationContinueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private formationContinueService: FormationContinueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.paysFormationContinueService.edit().subscribe(paysFormationContinue=>{
    const myIndex = this.paysFormationContinues.findIndex(e => e.id === this.selectedPaysFormationContinue.id);
    this.paysFormationContinues[myIndex] = this.selectedPaysFormationContinue;
    this.editPaysFormationContinueDialog = false;
    this.selectedPaysFormationContinue = new PaysFormationContinueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
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
    this.editPaysFormationContinueDialog  = false;
}

// getters and setters

get paysFormationContinues(): Array<PaysFormationContinueVo> {
    return this.paysFormationContinueService.paysFormationContinues;
       }
set paysFormationContinues(value: Array<PaysFormationContinueVo>) {
        this.paysFormationContinueService.paysFormationContinues = value;
       }

 get selectedPaysFormationContinue(): PaysFormationContinueVo {
           return this.paysFormationContinueService.selectedPaysFormationContinue;
       }
    set selectedPaysFormationContinue(value: PaysFormationContinueVo) {
        this.paysFormationContinueService.selectedPaysFormationContinue = value;
       }

   get editPaysFormationContinueDialog(): boolean {
           return this.paysFormationContinueService.editPaysFormationContinueDialog;

       }
    set editPaysFormationContinueDialog(value: boolean) {
        this.paysFormationContinueService.editPaysFormationContinueDialog = value;
       }

       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
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
