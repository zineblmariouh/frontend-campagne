import {Component, OnInit} from '@angular/core';
import {OutilPedagogiquePubliqueCibleService} from '../../../../../controller/service/OutilPedagogiquePubliqueCible.service';
import {OutilPedagogiquePubliqueCibleVo} from '../../../../../controller/model/OutilPedagogiquePubliqueCible.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';

@Component({
  selector: 'app-outil-pedagogique-publique-cible-view-chercheur',
  templateUrl: './outil-pedagogique-publique-cible-view-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-publique-cible-view-chercheur.component.css']
})
export class OutilPedagogiquePubliqueCibleViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiquePubliqueCibleService: OutilPedagogiquePubliqueCibleService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private outilPedagogiqueService :OutilPedagogiqueService
    ,private publiqueCibleService :PubliqueCibleService
) {
}

// methods
ngOnInit(): void {
    this.selectedPubliqueCible = new PubliqueCibleVo();
    this.publiqueCibleService.findAll().subscribe((data) => this.publiqueCibles = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

hideViewDialog(){
    this.viewOutilPedagogiquePubliqueCibleDialog  = false;
}

// getters and setters

get outilPedagogiquePubliqueCibles(): Array<OutilPedagogiquePubliqueCibleVo> {
    return this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibles;
       }
set outilPedagogiquePubliqueCibles(value: Array<OutilPedagogiquePubliqueCibleVo>) {
        this.outilPedagogiquePubliqueCibleService.outilPedagogiquePubliqueCibles = value;
       }

 get selectedOutilPedagogiquePubliqueCible():OutilPedagogiquePubliqueCibleVo {
           return this.outilPedagogiquePubliqueCibleService.selectedOutilPedagogiquePubliqueCible;
       }
    set selectedOutilPedagogiquePubliqueCible(value: OutilPedagogiquePubliqueCibleVo) {
        this.outilPedagogiquePubliqueCibleService.selectedOutilPedagogiquePubliqueCible = value;
       }

   get viewOutilPedagogiquePubliqueCibleDialog():boolean {
           return this.outilPedagogiquePubliqueCibleService.viewOutilPedagogiquePubliqueCibleDialog;

       }
    set viewOutilPedagogiquePubliqueCibleDialog(value: boolean) {
        this.outilPedagogiquePubliqueCibleService.viewOutilPedagogiquePubliqueCibleDialog= value;
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
       get selectedPubliqueCible():PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
      set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }
       get publiqueCibles():Array<PubliqueCibleVo> {
           return this.publiqueCibleService.publiqueCibles;
       }
       set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }
       get editPubliqueCibleDialog():boolean {
           return this.publiqueCibleService.editPubliqueCibleDialog;
       }
      set editPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.editPubliqueCibleDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
