import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-mode-diffusion-view-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-mode-diffusion-view-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-mode-diffusion-view-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueModeDiffusionService: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private modeDiffusionService :ModeDiffusionService
    ,private developpementDeSavoirEtInnovationScientifiqueService :DeveloppementDeSavoirEtInnovationScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedModeDiffusion = new ModeDiffusionVo();
    this.modeDiffusionService.findAll().subscribe((data) => this.modeDiffusions = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

hideViewDialog(){
    this.viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueModeDiffusions(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusions;
       }
set developpementDeSavoirEtInnovationScientifiqueModeDiffusions(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusions = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion():DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(value: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = value;
       }

   get viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog():boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;

       }
    set viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.viewDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog= value;
       }

       get selectedModeDiffusion():ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
      set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }
       get modeDiffusions():Array<ModeDiffusionVo> {
           return this.modeDiffusionService.modeDiffusions;
       }
       set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }
       get editModeDiffusionDialog():boolean {
           return this.modeDiffusionService.editModeDiffusionDialog;
       }
      set editModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.editModeDiffusionDialog= value;
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
