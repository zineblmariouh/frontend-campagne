import {Component, OnInit} from '@angular/core';
import {EvenementColloqueScienntifiquePaysService} from '../../../../../controller/service/EvenementColloqueScienntifiquePays.service';
import {EvenementColloqueScienntifiquePaysVo} from '../../../../../controller/model/EvenementColloqueScienntifiquePays.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {EvenementColloqueScienntifiqueVo} from '../../../../../controller/model/EvenementColloqueScienntifique.model';
import {EvenementColloqueScienntifiqueService} from '../../../../../controller/service/EvenementColloqueScienntifique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-evenement-colloque-scienntifique-pays-view-chercheur',
  templateUrl: './evenement-colloque-scienntifique-pays-view-chercheur.component.html',
  styleUrls: ['./evenement-colloque-scienntifique-pays-view-chercheur.component.css']
})
export class EvenementColloqueScienntifiquePaysViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private evenementColloqueScienntifiquePaysService: EvenementColloqueScienntifiquePaysService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private evenementColloqueScienntifiqueService :EvenementColloqueScienntifiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedEvenementColloqueScienntifique = new EvenementColloqueScienntifiqueVo();
    this.evenementColloqueScienntifiqueService.findAll().subscribe((data) => this.evenementColloqueScienntifiques = data);
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
}

hideViewDialog(){
    this.viewEvenementColloqueScienntifiquePaysDialog  = false;
}

// getters and setters

get evenementColloqueScienntifiquePayss(): Array<EvenementColloqueScienntifiquePaysVo> {
    return this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePayss;
       }
set evenementColloqueScienntifiquePayss(value: Array<EvenementColloqueScienntifiquePaysVo>) {
        this.evenementColloqueScienntifiquePaysService.evenementColloqueScienntifiquePayss = value;
       }

 get selectedEvenementColloqueScienntifiquePays():EvenementColloqueScienntifiquePaysVo {
           return this.evenementColloqueScienntifiquePaysService.selectedEvenementColloqueScienntifiquePays;
       }
    set selectedEvenementColloqueScienntifiquePays(value: EvenementColloqueScienntifiquePaysVo) {
        this.evenementColloqueScienntifiquePaysService.selectedEvenementColloqueScienntifiquePays = value;
       }

   get viewEvenementColloqueScienntifiquePaysDialog():boolean {
           return this.evenementColloqueScienntifiquePaysService.viewEvenementColloqueScienntifiquePaysDialog;

       }
    set viewEvenementColloqueScienntifiquePaysDialog(value: boolean) {
        this.evenementColloqueScienntifiquePaysService.viewEvenementColloqueScienntifiquePaysDialog= value;
       }

       get selectedEvenementColloqueScienntifique():EvenementColloqueScienntifiqueVo {
           return this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique;
       }
      set selectedEvenementColloqueScienntifique(value: EvenementColloqueScienntifiqueVo) {
        this.evenementColloqueScienntifiqueService.selectedEvenementColloqueScienntifique = value;
       }
       get evenementColloqueScienntifiques():Array<EvenementColloqueScienntifiqueVo> {
           return this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques;
       }
       set evenementColloqueScienntifiques(value: Array<EvenementColloqueScienntifiqueVo>) {
        this.evenementColloqueScienntifiqueService.evenementColloqueScienntifiques = value;
       }
       get editEvenementColloqueScienntifiqueDialog():boolean {
           return this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog;
       }
      set editEvenementColloqueScienntifiqueDialog(value: boolean) {
        this.evenementColloqueScienntifiqueService.editEvenementColloqueScienntifiqueDialog= value;
       }
       get selectedPays():PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss():Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get editPaysDialog():boolean {
           return this.paysService.editPaysDialog;
       }
      set editPaysDialog(value: boolean) {
        this.paysService.editPaysDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
