import {Component, OnInit} from '@angular/core';
import {FormationContinueCommanditaireService} from '../../../../../controller/service/FormationContinueCommanditaire.service';
import {FormationContinueCommanditaireVo} from '../../../../../controller/model/FormationContinueCommanditaire.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {CommanditaireVo} from '../../../../../controller/model/Commanditaire.model';
import {CommanditaireService} from '../../../../../controller/service/Commanditaire.service';
import {FormationContinueVo} from '../../../../../controller/model/FormationContinue.model';
import {FormationContinueService} from '../../../../../controller/service/FormationContinue.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-formation-continue-commanditaire-view-admin',
  templateUrl: './formation-continue-commanditaire-view-admin.component.html',
  styleUrls: ['./formation-continue-commanditaire-view-admin.component.css']
})
export class FormationContinueCommanditaireViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private formationContinueCommanditaireService: FormationContinueCommanditaireService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private commanditaireService :CommanditaireService
    ,private formationContinueService :FormationContinueService
    ,private paysService :PaysService
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

hideViewDialog(){
    this.viewFormationContinueCommanditaireDialog  = false;
}

// getters and setters

get formationContinueCommanditaires(): Array<FormationContinueCommanditaireVo> {
    return this.formationContinueCommanditaireService.formationContinueCommanditaires;
       }
set formationContinueCommanditaires(value: Array<FormationContinueCommanditaireVo>) {
        this.formationContinueCommanditaireService.formationContinueCommanditaires = value;
       }

 get selectedFormationContinueCommanditaire():FormationContinueCommanditaireVo {
           return this.formationContinueCommanditaireService.selectedFormationContinueCommanditaire;
       }
    set selectedFormationContinueCommanditaire(value: FormationContinueCommanditaireVo) {
        this.formationContinueCommanditaireService.selectedFormationContinueCommanditaire = value;
       }

   get viewFormationContinueCommanditaireDialog():boolean {
           return this.formationContinueCommanditaireService.viewFormationContinueCommanditaireDialog;

       }
    set viewFormationContinueCommanditaireDialog(value: boolean) {
        this.formationContinueCommanditaireService.viewFormationContinueCommanditaireDialog= value;
       }

       get selectedCommanditaire():CommanditaireVo {
           return this.commanditaireService.selectedCommanditaire;
       }
      set selectedCommanditaire(value: CommanditaireVo) {
        this.commanditaireService.selectedCommanditaire = value;
       }
       get commanditaires():Array<CommanditaireVo> {
           return this.commanditaireService.commanditaires;
       }
       set commanditaires(value: Array<CommanditaireVo>) {
        this.commanditaireService.commanditaires = value;
       }
       get editCommanditaireDialog():boolean {
           return this.commanditaireService.editCommanditaireDialog;
       }
      set editCommanditaireDialog(value: boolean) {
        this.commanditaireService.editCommanditaireDialog= value;
       }
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }
       get selectedFormationContinue():FormationContinueVo {
           return this.formationContinueService.selectedFormationContinue;
       }
      set selectedFormationContinue(value: FormationContinueVo) {
        this.formationContinueService.selectedFormationContinue = value;
       }
       get formationContinues():Array<FormationContinueVo> {
           return this.formationContinueService.formationContinues;
       }
       set formationContinues(value: Array<FormationContinueVo>) {
        this.formationContinueService.formationContinues = value;
       }
       get editFormationContinueDialog():boolean {
           return this.formationContinueService.editFormationContinueDialog;
       }
      set editFormationContinueDialog(value: boolean) {
        this.formationContinueService.editFormationContinueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
