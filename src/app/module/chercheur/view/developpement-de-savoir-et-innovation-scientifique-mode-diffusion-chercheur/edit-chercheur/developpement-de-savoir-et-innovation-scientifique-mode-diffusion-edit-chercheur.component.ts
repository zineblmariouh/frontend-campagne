import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ModeDiffusionVo} from '../../../../../controller/model/ModeDiffusion.model';
import {ModeDiffusionService} from '../../../../../controller/service/ModeDiffusion.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-mode-diffusion-edit-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-mode-diffusion-edit-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-mode-diffusion-edit-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueModeDiffusionService: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private modeDiffusionService: ModeDiffusionService
 ,       private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedModeDiffusion = new ModeDiffusionVo();
    this.modeDiffusionService.findAll().subscribe((data) => this.modeDiffusions = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.edit().subscribe(developpementDeSavoirEtInnovationScientifiqueModeDiffusion=>{
    const myIndex = this.developpementDeSavoirEtInnovationScientifiqueModeDiffusions.findIndex(e => e.id === this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion.id);
    this.developpementDeSavoirEtInnovationScientifiqueModeDiffusions[myIndex] = this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
    this.editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = false;
    this.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = new DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatemodeDiffusion(modeDiffusion: string) {
                      const isPermistted = await this.roleService.isPermitted('ModeDiffusion', 'add');
                       if(isPermistted){
         this.selectedModeDiffusion = new ModeDiffusionVo();
        this.createModeDiffusionDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'add');
                       if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueModeDiffusions(): Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusions;
       }
set developpementDeSavoirEtInnovationScientifiqueModeDiffusions(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.developpementDeSavoirEtInnovationScientifiqueModeDiffusions = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(): DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion(value: DeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionVo) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.selectedDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusion = value;
       }

   get editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog;

       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueModeDiffusionService.editDeveloppementDeSavoirEtInnovationScientifiqueModeDiffusionDialog = value;
       }

       get selectedModeDiffusion(): ModeDiffusionVo {
           return this.modeDiffusionService.selectedModeDiffusion;
       }
      set selectedModeDiffusion(value: ModeDiffusionVo) {
        this.modeDiffusionService.selectedModeDiffusion = value;
       }
       get modeDiffusions(): Array<ModeDiffusionVo> {
           return this.modeDiffusionService.modeDiffusions;
       }
       set modeDiffusions(value: Array<ModeDiffusionVo>) {
        this.modeDiffusionService.modeDiffusions = value;
       }
       get createModeDiffusionDialog(): boolean {
           return this.modeDiffusionService.createModeDiffusionDialog;
       }
      set createModeDiffusionDialog(value: boolean) {
        this.modeDiffusionService.createModeDiffusionDialog= value;
       }
       get selectedDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get createDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
