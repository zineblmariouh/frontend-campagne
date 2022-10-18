import {Component, OnInit} from '@angular/core';
import {EncadrementEtudiantEnjeuxIrdService} from '../../../../../controller/service/EncadrementEtudiantEnjeuxIrd.service';
import {EncadrementEtudiantEnjeuxIrdVo} from '../../../../../controller/model/EncadrementEtudiantEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EncadrementEtudiantVo} from '../../../../../controller/model/EncadrementEtudiant.model';
import {EncadrementEtudiantService} from '../../../../../controller/service/EncadrementEtudiant.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-encadrement-etudiant-enjeux-ird-edit-admin',
  templateUrl: './encadrement-etudiant-enjeux-ird-edit-admin.component.html',
  styleUrls: ['./encadrement-etudiant-enjeux-ird-edit-admin.component.css']
})
export class EncadrementEtudiantEnjeuxIrdEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private encadrementEtudiantEnjeuxIrdService: EncadrementEtudiantEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private encadrementEtudiantService: EncadrementEtudiantService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
    this.encadrementEtudiantService.findAll().subscribe((data) => this.encadrementEtudiants = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.encadrementEtudiantEnjeuxIrdService.edit().subscribe(encadrementEtudiantEnjeuxIrd=>{
    const myIndex = this.encadrementEtudiantEnjeuxIrds.findIndex(e => e.id === this.selectedEncadrementEtudiantEnjeuxIrd.id);
    this.encadrementEtudiantEnjeuxIrds[myIndex] = this.selectedEncadrementEtudiantEnjeuxIrd;
    this.editEncadrementEtudiantEnjeuxIrdDialog = false;
    this.selectedEncadrementEtudiantEnjeuxIrd = new EncadrementEtudiantEnjeuxIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenjeuxIrd(enjeuxIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('EnjeuxIrd', 'add');
                       if(isPermistted){
         this.selectedEnjeuxIrd = new EnjeuxIrdVo();
        this.createEnjeuxIrdDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateencadrementEtudiant(encadrementEtudiant: string) {
                      const isPermistted = await this.roleService.isPermitted('EncadrementEtudiant', 'add');
                       if(isPermistted){
         this.selectedEncadrementEtudiant = new EncadrementEtudiantVo();
        this.createEncadrementEtudiantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEncadrementEtudiantEnjeuxIrdDialog  = false;
}

// getters and setters

get encadrementEtudiantEnjeuxIrds(): Array<EncadrementEtudiantEnjeuxIrdVo> {
    return this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrds;
       }
set encadrementEtudiantEnjeuxIrds(value: Array<EncadrementEtudiantEnjeuxIrdVo>) {
        this.encadrementEtudiantEnjeuxIrdService.encadrementEtudiantEnjeuxIrds = value;
       }

 get selectedEncadrementEtudiantEnjeuxIrd(): EncadrementEtudiantEnjeuxIrdVo {
           return this.encadrementEtudiantEnjeuxIrdService.selectedEncadrementEtudiantEnjeuxIrd;
       }
    set selectedEncadrementEtudiantEnjeuxIrd(value: EncadrementEtudiantEnjeuxIrdVo) {
        this.encadrementEtudiantEnjeuxIrdService.selectedEncadrementEtudiantEnjeuxIrd = value;
       }

   get editEncadrementEtudiantEnjeuxIrdDialog(): boolean {
           return this.encadrementEtudiantEnjeuxIrdService.editEncadrementEtudiantEnjeuxIrdDialog;

       }
    set editEncadrementEtudiantEnjeuxIrdDialog(value: boolean) {
        this.encadrementEtudiantEnjeuxIrdService.editEncadrementEtudiantEnjeuxIrdDialog = value;
       }

       get selectedEnjeuxIrd(): EnjeuxIrdVo {
           return this.enjeuxIrdService.selectedEnjeuxIrd;
       }
      set selectedEnjeuxIrd(value: EnjeuxIrdVo) {
        this.enjeuxIrdService.selectedEnjeuxIrd = value;
       }
       get enjeuxIrds(): Array<EnjeuxIrdVo> {
           return this.enjeuxIrdService.enjeuxIrds;
       }
       set enjeuxIrds(value: Array<EnjeuxIrdVo>) {
        this.enjeuxIrdService.enjeuxIrds = value;
       }
       get createEnjeuxIrdDialog(): boolean {
           return this.enjeuxIrdService.createEnjeuxIrdDialog;
       }
      set createEnjeuxIrdDialog(value: boolean) {
        this.enjeuxIrdService.createEnjeuxIrdDialog= value;
       }
       get selectedEncadrementEtudiant(): EncadrementEtudiantVo {
           return this.encadrementEtudiantService.selectedEncadrementEtudiant;
       }
      set selectedEncadrementEtudiant(value: EncadrementEtudiantVo) {
        this.encadrementEtudiantService.selectedEncadrementEtudiant = value;
       }
       get encadrementEtudiants(): Array<EncadrementEtudiantVo> {
           return this.encadrementEtudiantService.encadrementEtudiants;
       }
       set encadrementEtudiants(value: Array<EncadrementEtudiantVo>) {
        this.encadrementEtudiantService.encadrementEtudiants = value;
       }
       get createEncadrementEtudiantDialog(): boolean {
           return this.encadrementEtudiantService.createEncadrementEtudiantDialog;
       }
      set createEncadrementEtudiantDialog(value: boolean) {
        this.encadrementEtudiantService.createEncadrementEtudiantDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
