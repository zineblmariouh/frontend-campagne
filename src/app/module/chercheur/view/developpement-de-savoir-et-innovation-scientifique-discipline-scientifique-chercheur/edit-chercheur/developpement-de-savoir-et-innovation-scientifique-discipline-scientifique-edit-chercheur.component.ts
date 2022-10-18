import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-edit-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-edit-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-discipline-scientifique-edit-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private communauteSavoirService: CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.edit().subscribe(developpementDeSavoirEtInnovationScientifiqueDisciplineScientifique=>{
    const myIndex = this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques.findIndex(e => e.id === this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique.id);
    this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques[myIndex] = this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
    this.editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = false;
    this.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
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
    this.editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques;
       }
set developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiques = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifique = value;
       }

   get editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog;

       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueService.editDeveloppementDeSavoirEtInnovationScientifiqueDisciplineScientifiqueDialog = value;
       }

       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
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
