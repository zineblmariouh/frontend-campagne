import {Component, OnInit} from '@angular/core';
import {OutilPedagogiquePaysConceptionService} from '../../../../../controller/service/OutilPedagogiquePaysConception.service';
import {OutilPedagogiquePaysConceptionVo} from '../../../../../controller/model/OutilPedagogiquePaysConception.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';

@Component({
  selector: 'app-outil-pedagogique-pays-conception-view-chercheur',
  templateUrl: './outil-pedagogique-pays-conception-view-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-pays-conception-view-chercheur.component.css']
})
export class OutilPedagogiquePaysConceptionViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiquePaysConceptionService: OutilPedagogiquePaysConceptionService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private outilPedagogiqueService :OutilPedagogiqueService
    ,private paysService :PaysService
) {
}

// methods
ngOnInit(): void {
    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

hideViewDialog(){
    this.viewOutilPedagogiquePaysConceptionDialog  = false;
}

// getters and setters

get outilPedagogiquePaysConceptions(): Array<OutilPedagogiquePaysConceptionVo> {
    return this.outilPedagogiquePaysConceptionService.outilPedagogiquePaysConceptions;
       }
set outilPedagogiquePaysConceptions(value: Array<OutilPedagogiquePaysConceptionVo>) {
        this.outilPedagogiquePaysConceptionService.outilPedagogiquePaysConceptions = value;
       }

 get selectedOutilPedagogiquePaysConception():OutilPedagogiquePaysConceptionVo {
           return this.outilPedagogiquePaysConceptionService.selectedOutilPedagogiquePaysConception;
       }
    set selectedOutilPedagogiquePaysConception(value: OutilPedagogiquePaysConceptionVo) {
        this.outilPedagogiquePaysConceptionService.selectedOutilPedagogiquePaysConception = value;
       }

   get viewOutilPedagogiquePaysConceptionDialog():boolean {
           return this.outilPedagogiquePaysConceptionService.viewOutilPedagogiquePaysConceptionDialog;

       }
    set viewOutilPedagogiquePaysConceptionDialog(value: boolean) {
        this.outilPedagogiquePaysConceptionService.viewOutilPedagogiquePaysConceptionDialog= value;
       }

       get selectedOutilPedagogique():OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques():Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get editOutilPedagogiqueDialog():boolean {
           return this.outilPedagogiqueService.editOutilPedagogiqueDialog;
       }
      set editOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.editOutilPedagogiqueDialog= value;
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
