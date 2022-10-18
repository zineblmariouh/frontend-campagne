import {Component, OnInit} from '@angular/core';
import {NiveauEtudeEnseignementService} from '../../../../../controller/service/NiveauEtudeEnseignement.service';
import {NiveauEtudeEnseignementVo} from '../../../../../controller/model/NiveauEtudeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {NiveauEtudeVo} from '../../../../../controller/model/NiveauEtude.model';
import {NiveauEtudeService} from '../../../../../controller/service/NiveauEtude.service';

@Component({
  selector: 'app-niveau-etude-enseignement-view-chercheur',
  templateUrl: './niveau-etude-enseignement-view-chercheur.component.html',
  styleUrls: ['./niveau-etude-enseignement-view-chercheur.component.css']
})
export class NiveauEtudeEnseignementViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauEtudeEnseignementService: NiveauEtudeEnseignementService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enseignementService :EnseignementService
    ,private niveauEtudeService :NiveauEtudeService
) {
}

// methods
ngOnInit(): void {
    this.selectedNiveauEtude = new NiveauEtudeVo();
    this.niveauEtudeService.findAll().subscribe((data) => this.niveauEtudes = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
}

hideViewDialog(){
    this.viewNiveauEtudeEnseignementDialog  = false;
}

// getters and setters

get niveauEtudeEnseignements(): Array<NiveauEtudeEnseignementVo> {
    return this.niveauEtudeEnseignementService.niveauEtudeEnseignements;
       }
set niveauEtudeEnseignements(value: Array<NiveauEtudeEnseignementVo>) {
        this.niveauEtudeEnseignementService.niveauEtudeEnseignements = value;
       }

 get selectedNiveauEtudeEnseignement():NiveauEtudeEnseignementVo {
           return this.niveauEtudeEnseignementService.selectedNiveauEtudeEnseignement;
       }
    set selectedNiveauEtudeEnseignement(value: NiveauEtudeEnseignementVo) {
        this.niveauEtudeEnseignementService.selectedNiveauEtudeEnseignement = value;
       }

   get viewNiveauEtudeEnseignementDialog():boolean {
           return this.niveauEtudeEnseignementService.viewNiveauEtudeEnseignementDialog;

       }
    set viewNiveauEtudeEnseignementDialog(value: boolean) {
        this.niveauEtudeEnseignementService.viewNiveauEtudeEnseignementDialog= value;
       }

       get selectedNiveauEtude():NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
      set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }
       get niveauEtudes():Array<NiveauEtudeVo> {
           return this.niveauEtudeService.niveauEtudes;
       }
       set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }
       get editNiveauEtudeDialog():boolean {
           return this.niveauEtudeService.editNiveauEtudeDialog;
       }
      set editNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.editNiveauEtudeDialog= value;
       }
       get selectedEnseignement():EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements():Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get editEnseignementDialog():boolean {
           return this.enseignementService.editEnseignementDialog;
       }
      set editEnseignementDialog(value: boolean) {
        this.enseignementService.editEnseignementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
