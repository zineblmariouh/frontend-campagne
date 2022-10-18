import {Component, OnInit} from '@angular/core';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifiquePays.service';
import {DeveloppementDeSavoirEtInnovationScientifiquePaysVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-developpement-de-savoir-et-innovation-scientifique-pays-edit-admin',
  templateUrl: './developpement-de-savoir-et-innovation-scientifique-pays-edit-admin.component.html',
  styleUrls: ['./developpement-de-savoir-et-innovation-scientifique-pays-edit-admin.component.css']
})
export class DeveloppementDeSavoirEtInnovationScientifiquePaysEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private developpementDeSavoirEtInnovationScientifiquePaysService: DeveloppementDeSavoirEtInnovationScientifiquePaysService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.developpementDeSavoirEtInnovationScientifiquePaysService.edit().subscribe(developpementDeSavoirEtInnovationScientifiquePays=>{
    const myIndex = this.developpementDeSavoirEtInnovationScientifiquePayss.findIndex(e => e.id === this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays.id);
    this.developpementDeSavoirEtInnovationScientifiquePayss[myIndex] = this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays;
    this.editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = false;
    this.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = new DeveloppementDeSavoirEtInnovationScientifiquePaysVo();


    }, error => {
        console.log(error);
    });

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
// methods

hideEditDialog(){
    this.editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog  = false;
}

// getters and setters

get developpementDeSavoirEtInnovationScientifiquePayss(): Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo> {
    return this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePayss;
       }
set developpementDeSavoirEtInnovationScientifiquePayss(value: Array<DeveloppementDeSavoirEtInnovationScientifiquePaysVo>) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.developpementDeSavoirEtInnovationScientifiquePayss = value;
       }

 get selectedDeveloppementDeSavoirEtInnovationScientifiquePays(): DeveloppementDeSavoirEtInnovationScientifiquePaysVo {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.selectedDeveloppementDeSavoirEtInnovationScientifiquePays;
       }
    set selectedDeveloppementDeSavoirEtInnovationScientifiquePays(value: DeveloppementDeSavoirEtInnovationScientifiquePaysVo) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.selectedDeveloppementDeSavoirEtInnovationScientifiquePays = value;
       }

   get editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiquePaysService.editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog;

       }
    set editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiquePaysService.editDeveloppementDeSavoirEtInnovationScientifiquePaysDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
