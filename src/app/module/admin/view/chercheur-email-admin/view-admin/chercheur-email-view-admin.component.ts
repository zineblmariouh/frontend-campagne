import {Component, OnInit} from '@angular/core';
import {ChercheurEmailService} from '../../../../../controller/service/ChercheurEmail.service';
import {ChercheurEmailVo} from '../../../../../controller/model/ChercheurEmail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-chercheur-email-view-admin',
  templateUrl: './chercheur-email-view-admin.component.html',
  styleUrls: ['./chercheur-email-view-admin.component.css']
})
export class ChercheurEmailViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private chercheurEmailService: ChercheurEmailService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private chercheurService :ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

hideViewDialog(){
    this.viewChercheurEmailDialog  = false;
}

// getters and setters

get chercheurEmails(): Array<ChercheurEmailVo> {
    return this.chercheurEmailService.chercheurEmails;
       }
set chercheurEmails(value: Array<ChercheurEmailVo>) {
        this.chercheurEmailService.chercheurEmails = value;
       }

 get selectedChercheurEmail():ChercheurEmailVo {
           return this.chercheurEmailService.selectedChercheurEmail;
       }
    set selectedChercheurEmail(value: ChercheurEmailVo) {
        this.chercheurEmailService.selectedChercheurEmail = value;
       }

   get viewChercheurEmailDialog():boolean {
           return this.chercheurEmailService.viewChercheurEmailDialog;

       }
    set viewChercheurEmailDialog(value: boolean) {
        this.chercheurEmailService.viewChercheurEmailDialog= value;
       }

       get selectedChercheur():ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs():Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get editChercheurDialog():boolean {
           return this.chercheurService.editChercheurDialog;
       }
      set editChercheurDialog(value: boolean) {
        this.chercheurService.editChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
