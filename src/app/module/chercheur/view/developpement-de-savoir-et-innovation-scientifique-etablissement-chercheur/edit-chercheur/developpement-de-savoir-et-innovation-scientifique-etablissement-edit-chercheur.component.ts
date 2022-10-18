import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEtablissement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {EtablissementVo} from '../../../../../controller/model/Etablissement.model';
import {EtablissementService} from '../../../../../controller/service/Etablissement.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-etablissement-edit-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-etablissement-edit-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-etablissement-edit-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEtablissementEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueEtablissementService: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private etablissementService: EtablissementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEtablissement = new EtablissementVo();
    this.etablissementService.findAll().subscribe((data) => this.etablissements = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.edit().subscribe(developpementDeSavoirEtInnovationScientifiqueEtablissement=>{
    const myIndex = this.developpementDeSavoirEtInnovationScientifiqueEtablissements.findIndex(e => e.id === this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement.id);
    this.developpementDeSavoirEtInnovationScientifiqueEtablissements[myIndex] = this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement;
    this.editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = false;
    this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = new DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateetablissement(etablissement: string) {
                      const isPermistted = await this.roleService.isPermitted('Etablissement', 'add');
                       if(isPermistted){
         this.selectedEtablissement = new EtablissementVo();
        this.createEtablissementDialog = true;
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
    this.editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueEtablissements(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissements;
       }
set developpementDeSavoirEtInnovationScientifiqueEtablissements(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.developpementDeSavoirEtInnovationScientifiqueEtablissements = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(): DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement(value: DeveloppementDeSavoirEtInnovationScientifiqueEtablissementVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEtablissement = value;
       }

   get editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog;

       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEtablissementService.editDeveloppementDeSavoirEtInnovationScientifiqueEtablissementDialog = value;
       }

       get selectedEtablissement(): EtablissementVo {
           return this.etablissementService.selectedEtablissement;
       }
      set selectedEtablissement(value: EtablissementVo) {
        this.etablissementService.selectedEtablissement = value;
       }
       get etablissements(): Array<EtablissementVo> {
           return this.etablissementService.etablissements;
       }
       set etablissements(value: Array<EtablissementVo>) {
        this.etablissementService.etablissements = value;
       }
       get createEtablissementDialog(): boolean {
           return this.etablissementService.createEtablissementDialog;
       }
      set createEtablissementDialog(value: boolean) {
        this.etablissementService.createEtablissementDialog= value;
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
