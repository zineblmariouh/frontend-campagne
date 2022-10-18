import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiquePaysService} from '../../../../../controller/service/EvenementColloqueScienntifiquePays.service';
import {EvenementColloqueScienntifiquePaysVo} from '../../../../../controller/model/EvenementColloqueScienntifiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-pays-edit-chercheur',
  templateUrl: './evenement-colloque-scienntifique-pays-edit-chercheur.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-pays-edit-chercheur.component.css']
})
export class EvenementColloqueScienntifiquePaysEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private evenementColloqueScienntifiquePaysService: EvenementColloqueScienntifiquePaysService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private evenementColloqueScienntifiqueService: EvenementColloqueScienntifiqueService
 ,       private paysService: PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.evenementColloqueScienntifiquePaysService.edit().subscribe(evenementColloqueScienntifiquePays=>{
    const myIndex = this.evenementColloqueScienntifiquePayss.findIndex(e => e.id === this.selectedEvenementColloqueScienntifiquePays.id);
    this.evenementColloqueScienntifiquePayss[myIndex] = this.selectedEvenementColloqueScienntifiquePays;
    this.editEvenementColloqueScienntifiquePaysDialog = false;
    this.selectedEvenementColloqueScienntifiquePays = new EvenementColloqueScienntifiquePaysVo();


    }, error => {
        console.log(error);
    });

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
    this.editEvenementColloqueScienntifiquePaysDialog  = false;
}

// getters and setters

get evenementColloqueScienntifiquePayss(): Array<EvenementColloqueScienntifiquePaysVo> {
    return this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePayss;
       }
set evenementColloqueScienntifiquePayss(value: Array<EvenementColloqueScienntifiquePaysVo>) {
        this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePayss = value;
       }

 get selectedEvenementColloqueScienntifiquePays(): EvenementColloqueScienntifiquePaysVo {
           return this.evenementColloqueScienntifiquePaysService.selectedEvenementColloqueScienntifiquePays;
       }
    set selectedEvenementColloqueScienntifiquePays(value: EvenementColloqueScienntifiquePaysVo) {
        this.evenementColloqueScienntifiquePaysService.selectedEvenementColloqueScienntifiquePays = value;
       }

   get editEvenementColloqueScienntifiquePaysDialog(): boolean {
           return this.evenementColloqueScienntifiquePaysService.editEvenementColloqueScienntifiquePaysDialog;

       }
    set editEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this.evenementColloqueScienntifiquePaysService.editEvenementColloqueScienntifiquePaysDialog = value;
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
