import {Component, OnInit} from '@angular/core';
import {FormationContinueCommanditaireService} from '../../../../../controller/service/FormationContinueCommanditaire.service';
import {FormationContinueCommanditaireVo} from '../../../../../controller/model/FormationContinueCommanditaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {CommanditaireVo} from '../../../../../controller/model/Commanditaire.model';
import {CommanditaireService} from '../../../../../controller/service/Commanditaire.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-formation-continue-commanditaire-edit-admin',
  templateUrl: './formation-continue-commanditaire-edit-admin.component.html',
  styleUrls: ['./formation-continue-commanditaire-edit-admin.component.css']
})
export class FormationContinueCommanditaireEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinueCommanditaireService: FormationContinueCommanditaireService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private commanditaireService: CommanditaireService
 ,       private formationContinueService: FormationContinueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommanditaire = new CommanditaireVo();
    this.commanditaireService.findAll().subscribe((data) => this.commanditaires = data);
    this.selectedFormationContinue = new FormationContinueVo();
    this.formationContinueService.findAll().subscribe((data) => this.formationContinues = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.formationContinueCommanditaireService.edit().subscribe(formationContinueCommanditaire=>{
    const myIndex = this.formationContinueCommanditaires.findIndex(e => e.id === this.selectedFormationContinueCommanditaire.id);
    this.formationContinueCommanditaires[myIndex] = this.selectedFormationContinueCommanditaire;
    this.editFormationContinueCommanditaireDialog = false;
    this.selectedFormationContinueCommanditaire = new FormationContinueCommanditaireVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecommanditaire(commanditaire: string) {
                      const isPermistted = await this.roleService.isPermitted('Commanditaire', 'add');
                       if(isPermistted){
         this.selectedCommanditaire = new CommanditaireVo();
        this.createCommanditaireDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    this.editFormationContinueCommanditaireDialog  = false;
}

// getters and setters

get formationContinueCommanditaires(): Array<FormationContinueCommanditaireVo> {
    return this.formationContinueCommanditaireService.formationContinueCommanditaires;
       }
set formationContinueCommanditaires(value: Array<FormationContinueCommanditaireVo>) {
        this.formationContinueCommanditaireService.formationContinueCommanditaires = value;
       }

 get selectedFormationContinueCommanditaire(): FormationContinueCommanditaireVo {
           return this.formationContinueCommanditaireService.selectedFormationContinueCommanditaire;
       }
    set selectedFormationContinueCommanditaire(value: FormationContinueCommanditaireVo) {
        this.formationContinueCommanditaireService.selectedFormationContinueCommanditaire = value;
       }

   get editFormationContinueCommanditaireDialog(): boolean {
           return this.formationContinueCommanditaireService.editFormationContinueCommanditaireDialog;

       }
    set editFormationContinueCommanditaireDialog(value: boolean) {
        this.formationContinueCommanditaireService.editFormationContinueCommanditaireDialog = value;
       }

       get selectedCommanditaire(): CommanditaireVo {
           return this.commanditaireService.selectedCommanditaire;
       }
      set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
       }
       get commanditaires(): Array<CommanditaireVo> {
           return this.commanditaireService.commanditaires;
       }
       set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
       }
       get createCommanditaireDialog(): boolean {
           return this.commanditaireService.createCommanditaireDialog;
       }
      set createCommanditaireDialog(value: boolean) {
        this.commanditaireService.createCommanditaireDialog= value;
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
