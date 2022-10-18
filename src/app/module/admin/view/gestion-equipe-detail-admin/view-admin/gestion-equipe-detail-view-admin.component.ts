import {Component, OnInit} from '@angular/core';
import {GestionEquipeDetailService} from '../../../../../controller/service/GestionEquipeDetail.service';
import {GestionEquipeDetailVo} from '../../../../../controller/model/GestionEquipeDetail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {GestionEquipeVo} from '../../../../../controller/model/GestionEquipe.model';
import {GestionEquipeService} from '../../../../../controller/service/GestionEquipe.service';

@Component({
  selector: 'app-gestion-equipe-detail-view-admin',
  templateUrl: './gestion-equipe-detail-view-admin.component.html',
  styleUrls: ['./gestion-equipe-detail-view-admin.component.css']
})
export class GestionEquipeDetailViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private gestionEquipeDetailService: GestionEquipeDetailService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private gestionEquipeService :GestionEquipeService
) {
}

// methods
ngOnInit(): void {
    this.selectedGestionEquipe = new GestionEquipeVo();
    this.gestionEquipeService.findAll().subscribe((data) => this.gestionEquipes = data);
}

hideViewDialog(){
    this.viewGestionEquipeDetailDialog  = false;
}

// getters and setters

get gestionEquipeDetails(): Array<GestionEquipeDetailVo> {
    return this.gestionEquipeDetailService.gestionEquipeDetails;
       }
set gestionEquipeDetails(value: Array<GestionEquipeDetailVo>) {
        this.gestionEquipeDetailService.gestionEquipeDetails = value;
       }

 get selectedGestionEquipeDetail():GestionEquipeDetailVo {
           return this.gestionEquipeDetailService.selectedGestionEquipeDetail;
       }
    set selectedGestionEquipeDetail(value: GestionEquipeDetailVo) {
        this.gestionEquipeDetailService.selectedGestionEquipeDetail = value;
       }

   get viewGestionEquipeDetailDialog():boolean {
           return this.gestionEquipeDetailService.viewGestionEquipeDetailDialog;

       }
    set viewGestionEquipeDetailDialog(value: boolean) {
        this.gestionEquipeDetailService.viewGestionEquipeDetailDialog= value;
       }

       get selectedGestionEquipe():GestionEquipeVo {
           return this.gestionEquipeService.selectedGestionEquipe;
       }
      set selectedGestionEquipe(value: GestionEquipeVo) {
        this.gestionEquipeService.selectedGestionEquipe = value;
       }
       get gestionEquipes():Array<GestionEquipeVo> {
           return this.gestionEquipeService.gestionEquipes;
       }
       set gestionEquipes(value: Array<GestionEquipeVo>) {
        this.gestionEquipeService.gestionEquipes = value;
       }
       get editGestionEquipeDialog():boolean {
           return this.gestionEquipeService.editGestionEquipeDialog;
       }
      set editGestionEquipeDialog(value: boolean) {
        this.gestionEquipeService.editGestionEquipeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
