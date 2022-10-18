import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirExpertiseScientifiqueService} from '../../../../../controller/service/CommunauteSavoirExpertiseScientifique.service';
import {CommunauteSavoirExpertiseScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirExpertiseScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ExpertiseScientifiqueVo} from '../../../../../controller/model/ExpertiseScientifique.model';
import {ExpertiseScientifiqueService} from '../../../../../controller/service/ExpertiseScientifique.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-communaute-savoir-expertise-scientifique-edit-admin',
  templateUrl: './communaute-savoir-expertise-scientifique-edit-admin.component.html',
  styleUrls: ['./communaute-savoir-expertise-scientifique-edit-admin.component.css']
})
export class CommunauteSavoirExpertiseScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirExpertiseScientifiqueService: CommunauteSavoirExpertiseScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private expertiseScientifiqueService: ExpertiseScientifiqueService
 ,       private communauteSavoirService: CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedExpertiseScientifique = new ExpertiseScientifiqueVo();
    this.expertiseScientifiqueService.findAll().subscribe((data) => this.expertiseScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.communauteSavoirExpertiseScientifiqueService.edit().subscribe(communauteSavoirExpertiseScientifique=>{
    const myIndex = this.communauteSavoirExpertiseScientifiques.findIndex(e => e.id === this.selectedCommunauteSavoirExpertiseScientifique.id);
    this.communauteSavoirExpertiseScientifiques[myIndex] = this.selectedCommunauteSavoirExpertiseScientifique;
    this.editCommunauteSavoirExpertiseScientifiqueDialog = false;
    this.selectedCommunauteSavoirExpertiseScientifique = new CommunauteSavoirExpertiseScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateexpertiseScientifique(expertiseScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('ExpertiseScientifique', 'add');
                       if(isPermistted){
         this.selectedExpertiseScientifique = new ExpertiseScientifiqueVo();
        this.createExpertiseScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
// methods

hideEditDialog(){
    this.editCommunauteSavoirExpertiseScientifiqueDialog  = false;
}

// getters and setters

get communauteSavoirExpertiseScientifiques(): Array<CommunauteSavoirExpertiseScientifiqueVo> {
    return this.communauteSavoirExpertiseScientifiqueService.communauteSavoirExpertiseScientifiques;
       }
set communauteSavoirExpertiseScientifiques(value: Array<CommunauteSavoirExpertiseScientifiqueVo>) {
        this.communauteSavoirExpertiseScientifiqueService.communauteSavoirExpertiseScientifiques = value;
       }

 get selectedCommunauteSavoirExpertiseScientifique(): CommunauteSavoirExpertiseScientifiqueVo {
           return this.communauteSavoirExpertiseScientifiqueService.selectedCommunauteSavoirExpertiseScientifique;
       }
    set selectedCommunauteSavoirExpertiseScientifique(value: CommunauteSavoirExpertiseScientifiqueVo) {
        this.communauteSavoirExpertiseScientifiqueService.selectedCommunauteSavoirExpertiseScientifique = value;
       }

   get editCommunauteSavoirExpertiseScientifiqueDialog(): boolean {
           return this.communauteSavoirExpertiseScientifiqueService.editCommunauteSavoirExpertiseScientifiqueDialog;

       }
    set editCommunauteSavoirExpertiseScientifiqueDialog(value: boolean) {
        this.communauteSavoirExpertiseScientifiqueService.editCommunauteSavoirExpertiseScientifiqueDialog = value;
       }

       get selectedExpertiseScientifique(): ExpertiseScientifiqueVo {
           return this.expertiseScientifiqueService.selectedExpertiseScientifique;
       }
      set selectedExpertiseScientifique(value: ExpertiseScientifiqueVo) {
        this.expertiseScientifiqueService.selectedExpertiseScientifique = value;
       }
       get expertiseScientifiques(): Array<ExpertiseScientifiqueVo> {
           return this.expertiseScientifiqueService.expertiseScientifiques;
       }
       set expertiseScientifiques(value: Array<ExpertiseScientifiqueVo>) {
        this.expertiseScientifiqueService.expertiseScientifiques = value;
       }
       get createExpertiseScientifiqueDialog(): boolean {
           return this.expertiseScientifiqueService.createExpertiseScientifiqueDialog;
       }
      set createExpertiseScientifiqueDialog(value: boolean) {
        this.expertiseScientifiqueService.createExpertiseScientifiqueDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
