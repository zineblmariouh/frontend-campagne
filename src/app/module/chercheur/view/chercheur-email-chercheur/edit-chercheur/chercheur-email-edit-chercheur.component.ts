import {Component, OnInit} from '@angular/core';
import {ChercheurEmailService} from '../../../../../controller/service/ChercheurEmail.service';
import {ChercheurEmailVo} from '../../../../../controller/model/ChercheurEmail.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-chercheur-email-edit-chercheur',
  templateUrl: './chercheur-email-edit-chercheur.component.html',
  styleUrls: ['./chercheur-email-edit-chercheur.component.css']
})
export class ChercheurEmailEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private chercheurEmailService: ChercheurEmailService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.chercheurEmailService.edit().subscribe(chercheurEmail=>{
    const myIndex = this.chercheurEmails.findIndex(e => e.id === this.selectedChercheurEmail.id);
    this.chercheurEmails[myIndex] = this.selectedChercheurEmail;
    this.editChercheurEmailDialog = false;
    this.selectedChercheurEmail = new ChercheurEmailVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatechercheur(chercheur: string) {
                      const isPermistted = await this.roleService.isPermitted('Chercheur', 'add');
                       if(isPermistted){
         this.selectedChercheur = new ChercheurVo();
        this.createChercheurDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editChercheurEmailDialog  = false;
}

// getters and setters

get chercheurEmails(): Array<ChercheurEmailVo> {
    return this.chercheurEmailService.chercheurEmails;
       }
set chercheurEmails(value: Array<ChercheurEmailVo>) {
        this.chercheurEmailService.chercheurEmails = value;
       }

 get selectedChercheurEmail(): ChercheurEmailVo {
           return this.chercheurEmailService.selectedChercheurEmail;
       }
    set selectedChercheurEmail(value: ChercheurEmailVo) {
        this.chercheurEmailService.selectedChercheurEmail = value;
       }

   get editChercheurEmailDialog(): boolean {
           return this.chercheurEmailService.editChercheurEmailDialog;

       }
    set editChercheurEmailDialog(value: boolean) {
        this.chercheurEmailService.editChercheurEmailDialog = value;
       }

       get selectedChercheur(): ChercheurVo {
           return this.chercheurService.selectedChercheur;
       }
      set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
       }
       get chercheurs(): Array<ChercheurVo> {
           return this.chercheurService.chercheurs;
       }
       set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
       }
       get createChercheurDialog(): boolean {
           return this.chercheurService.createChercheurDialog;
       }
      set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
