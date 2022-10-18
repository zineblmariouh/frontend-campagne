import {Component, OnInit} from '@angular/core';
import {EnseignementNatureService} from '../../../../../controller/service/EnseignementNature.service';
import {EnseignementNatureVo} from '../../../../../controller/model/EnseignementNature.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';

@Component({
  selector: 'app-enseignement-nature-view-admin',
  templateUrl: './enseignement-nature-view-admin.component.html',
  styleUrls: ['./enseignement-nature-view-admin.component.css']
})
export class EnseignementNatureViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enseignementNatureService: EnseignementNatureService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enseignementService :EnseignementService
    ,private natureEnseignementService :NatureEnseignementService
) {
}

// methods
ngOnInit(): void {
    this.selectedNatureEnseignement = new NatureEnseignementVo();
    this.natureEnseignementService.findAll().subscribe((data) => this.natureEnseignements = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
}

hideViewDialog(){
    this.viewEnseignementNatureDialog  = false;
}

// getters and setters

get enseignementNatures(): Array<EnseignementNatureVo> {
    return this.enseignementNatureService.enseignementNatures;
       }
set enseignementNatures(value: Array<EnseignementNatureVo>) {
        this.enseignementNatureService.enseignementNatures = value;
       }

 get selectedEnseignementNature():EnseignementNatureVo {
           return this.enseignementNatureService.selectedEnseignementNature;
       }
    set selectedEnseignementNature(value: EnseignementNatureVo) {
        this.enseignementNatureService.selectedEnseignementNature = value;
       }

   get viewEnseignementNatureDialog():boolean {
           return this.enseignementNatureService.viewEnseignementNatureDialog;

       }
    set viewEnseignementNatureDialog(value: boolean) {
        this.enseignementNatureService.viewEnseignementNatureDialog= value;
       }

       get selectedNatureEnseignement():NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
      set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }
       get natureEnseignements():Array<NatureEnseignementVo> {
           return this.natureEnseignementService.natureEnseignements;
       }
       set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }
       get editNatureEnseignementDialog():boolean {
           return this.natureEnseignementService.editNatureEnseignementDialog;
       }
      set editNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.editNatureEnseignementDialog= value;
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
