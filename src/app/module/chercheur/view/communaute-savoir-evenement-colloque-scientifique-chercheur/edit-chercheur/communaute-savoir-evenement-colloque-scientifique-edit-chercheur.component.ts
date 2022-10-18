import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirEvenementColloqueScientifiqueService} from '../../../../../controller/service/CommunauteSavoirEvenementColloqueScientifique.service';
import {CommunauteSavoirEvenementColloqueScientifiqueVo} from '../../../../../controller/model/CommunauteSavoirEvenementColloqueScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-communaute-savoir-evenement-colloque-scientifique-edit-chercheur',
  templateUrl: './communaute-savoir-evenement-colloque-scientifique-edit-chercheur.component.html',
  styleUrls: ['./communaute-savoir-evenement-colloque-scientifique-edit-chercheur.component.css']
})
export class CommunauteSavoirEvenementColloqueScientifiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirEvenementColloqueScientifiqueService: CommunauteSavoirEvenementColloqueScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
 ,       private communauteSavoirService: CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.communauteSavoirEvenementColloqueScientifiqueService.edit().subscribe(communauteSavoirEvenementColloqueScientifique=>{
    const myIndex = this.communauteSavoirEvenementColloqueScientifiques.findIndex(e => e.id === this.selectedCommunauteSavoirEvenementColloqueScientifique.id);
    this.communauteSavoirEvenementColloqueScientifiques[myIndex] = this.selectedCommunauteSavoirEvenementColloqueScientifique;
    this.editCommunauteSavoirEvenementColloqueScientifiqueDialog = false;
    this.selectedCommunauteSavoirEvenementColloqueScientifique = new CommunauteSavoirEvenementColloqueScientifiqueVo();


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
              public async openCreateevenementColloqueScienntifique(evenementColloqueScienntifique: string) {
                      const isPermistted = await this.roleService.isPermitted('EvenementColloqueScienntifique', 'add');
                       if(isPermistted){
         this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
        this.createEvenementColloqueScienntifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editCommunauteSavoirEvenementColloqueScientifiqueDialog  = false;
}

// getters and setters

get communauteSavoirEvenementColloqueScientifiques(): Array<CommunauteSavoirEvenementColloqueScientifiqueVo> {
    return this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiques;
       }
set communauteSavoirEvenementColloqueScientifiques(value: Array<CommunauteSavoirEvenementColloqueScientifiqueVo>) {
        this.communauteSavoirEvenementColloqueScientifiqueService.communauteSavoirEvenementColloqueScientifiques = value;
       }

 get selectedCommunauteSavoirEvenementColloqueScientifique(): CommunauteSavoirEvenementColloqueScientifiqueVo {
           return this.communauteSavoirEvenementColloqueScientifiqueService.selectedCommunauteSavoirEvenementColloqueScientifique;
       }
    set selectedCommunauteSavoirEvenementColloqueScientifique(value: CommunauteSavoirEvenementColloqueScientifiqueVo) {
        this.communauteSavoirEvenementColloqueScientifiqueService.selectedCommunauteSavoirEvenementColloqueScientifique = value;
       }

   get editCommunauteSavoirEvenementColloqueScientifiqueDialog(): boolean {
           return this.communauteSavoirEvenementColloqueScientifiqueService.editCommunauteSavoirEvenementColloqueScientifiqueDialog;

       }
    set editCommunauteSavoirEvenementColloqueScientifiqueDialog(value: boolean) {
        this.communauteSavoirEvenementColloqueScientifiqueService.editCommunauteSavoirEvenementColloqueScientifiqueDialog = value;
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
       get selectedEvenementColloqueScienntifique(): EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
      set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }
       get evenementColloqueScienntifiques(): Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
       set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }
       get createEvenementColloqueScienntifiqueDialog(): boolean {
           return this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog;
       }
      set createEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.createEvenementColloqueScienntifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
