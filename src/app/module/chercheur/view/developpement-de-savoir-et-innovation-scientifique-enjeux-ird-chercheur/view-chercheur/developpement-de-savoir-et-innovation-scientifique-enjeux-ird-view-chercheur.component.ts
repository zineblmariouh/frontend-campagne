import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-enjeux-ird-view-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-enjeux-ird-view-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-enjeux-ird-view-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private enjeuxIrdService :EnjeuxIrdService
    ,private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

hideViewDialog(){
    this.viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds;
       }
set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd():DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(value: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = value;
       }

   get viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;

       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.viewDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog= value;
       }

       get selectedEnjeuxIrd():EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds():Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get editEnjeuxIrdDialog():boolean {
           return this.enjeuxIrdService.editEnjeuxIrdDialog;
       }
      set editEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.editEnjeuxIrdDialog= value;
       }
       get selectedDeveloppementDeSavoirEtInnovationScientifique():DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques():Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get editDeveloppementDeSavoirEtInnovationScientifiqueDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set editDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
