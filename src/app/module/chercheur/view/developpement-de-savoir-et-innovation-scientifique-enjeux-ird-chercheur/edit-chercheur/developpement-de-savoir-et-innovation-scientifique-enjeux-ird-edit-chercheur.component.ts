import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-enjeux-ird-edit-chercheur',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-enjeux-ird-edit-chercheur.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-enjeux-ird-edit-chercheur.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.edit().subscribe(developpementDeSavoirEtInnovationScientifiqueEnjeuxIrd=>{
    const myIndex = this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds.findIndex(e => e.id === this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd.id);
    this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds[myIndex] = this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
    this.editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = false;
    this.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = new DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
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
    this.editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(): Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo> {
    return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds;
       }
set developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrds = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(): DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd(value: DeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdVo) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.selectedDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrd = value;
       }

   get editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog;

       }
    set editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueEnjeuxIrdService.editDeveloppementDeSavoirEtInnovationScientifiqueEnjeuxIrdDialog = value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
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
