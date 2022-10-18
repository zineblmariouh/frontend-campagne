import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueLangueService} from '../../../../../controller/service/OutilPedagogiqueLangue.service';
import {OutilPedagogiqueLangueVo} from '../../../../../controller/model/OutilPedagogiqueLangue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {LangueVo} from '../../../../../controller/model/Langue.model';
import {LangueService} from '../../../../../controller/service/Langue.service';

@Component({
  selector: 'app-outil-pedagogique-langue-view-chercheur',
  templateUrl: './outil-pedagogique-langue-view-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-langue-view-chercheur.component.css']
})
export class OutilPedagogiqueLangueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueLangueService: OutilPedagogiqueLangueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private outilPedagogiqueService :OutilPedagogiqueService
    ,private langueService :LangueService
) {
}

// methods
ngOnInit(): void {
    this.selectedLangue = new LangueVo();
    this.langueService.findAll().subscribe((data) => this.langues = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

hideViewDialog(){
    this.viewOutilPedagogiqueLangueDialog  = false;
}

// getters and setters

get outilPedagogiqueLangues(): Array<OutilPedagogiqueLangueVo> {
    return this.outilPedagogiqueLangueService.outilPedagogiqueLangues;
       }
set outilPedagogiqueLangues(value: Array<OutilPedagogiqueLangueVo>) {
        this.outilPedagogiqueLangueService.outilPedagogiqueLangues = value;
       }

 get selectedOutilPedagogiqueLangue():OutilPedagogiqueLangueVo {
           return this.outilPedagogiqueLangueService.selectedOutilPedagogiqueLangue;
       }
    set selectedOutilPedagogiqueLangue(value: OutilPedagogiqueLangueVo) {
        this.outilPedagogiqueLangueService.selectedOutilPedagogiqueLangue = value;
       }

   get viewOutilPedagogiqueLangueDialog():boolean {
           return this.outilPedagogiqueLangueService.viewOutilPedagogiqueLangueDialog;

       }
    set viewOutilPedagogiqueLangueDialog(value: boolean) {
        this.outilPedagogiqueLangueService.viewOutilPedagogiqueLangueDialog= value;
       }

       get selectedLangue():LangueVo {
           return this.langueService.selectedLangue;
       }
      set selectedLangue(value: LangueVo) {
        this.langueService.selectedLangue = value;
       }
       get langues():Array<LangueVo> {
           return this.langueService.langues;
       }
       set langues(value: Array<LangueVo>) {
        this.langueService.langues = value;
       }
       get editLangueDialog():boolean {
           return this.langueService.editLangueDialog;
       }
      set editLangueDialog(value: boolean) {
        this.langueService.editLangueDialog= value;
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

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
