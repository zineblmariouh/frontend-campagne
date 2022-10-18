import {Component, OnInit} from '@angular/core';
import {EnjeuxIrdEncadrementDoctorantService} from '../../../../../controller/service/EnjeuxIrdEncadrementDoctorant.service';
import {EnjeuxIrdEncadrementDoctorantVo} from '../../../../../controller/model/EnjeuxIrdEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';

@Component({
  selector: 'app-enjeux-ird-encadrement-doctorant-edit-chercheur',
  templateUrl: './enjeux-ird-encadrement-doctorant-edit-chercheur.component.html',
  styleUrls: ['./enjeux-ird-encadrement-doctorant-edit-chercheur.component.css']
})
export class EnjeuxIrdEncadrementDoctorantEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private enjeuxIrdEncadrementDoctorantService: EnjeuxIrdEncadrementDoctorantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enjeuxIrdService: EnjeuxIrdService
 ,       private encadrementDoctorantService: EncadrementDoctorantService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
    this.encadrementDoctorantService.findAll().subscribe((data) => this.encadrementDoctorants = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enjeuxIrdEncadrementDoctorantService.edit().subscribe(enjeuxIrdEncadrementDoctorant=>{
    const myIndex = this.enjeuxIrdEncadrementDoctorants.findIndex(e => e.id === this.selectedEnjeuxIrdEncadrementDoctorant.id);
    this.enjeuxIrdEncadrementDoctorants[myIndex] = this.selectedEnjeuxIrdEncadrementDoctorant;
    this.editEnjeuxIrdEncadrementDoctorantDialog = false;
    this.selectedEnjeuxIrdEncadrementDoctorant = new EnjeuxIrdEncadrementDoctorantVo();


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
              public async openCreateencadrementDoctorant(encadrementDoctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'add');
                       if(isPermistted){
         this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
        this.createEncadrementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEnjeuxIrdEncadrementDoctorantDialog  = false;
}

// getters and setters

get enjeuxIrdEncadrementDoctorants(): Array<EnjeuxIrdEncadrementDoctorantVo> {
    return this.enjeuxIrdEncadrementDoctorantService.enjeuxIrdEncadrementDoctorants;
       }
set enjeuxIrdEncadrementDoctorants(value: Array<EnjeuxIrdEncadrementDoctorantVo>) {
        this.enjeuxIrdEncadrementDoctorantService.enjeuxIrdEncadrementDoctorants = value;
       }

 get selectedEnjeuxIrdEncadrementDoctorant(): EnjeuxIrdEncadrementDoctorantVo {
           return this.enjeuxIrdEncadrementDoctorantService.selectedEnjeuxIrdEncadrementDoctorant;
       }
    set selectedEnjeuxIrdEncadrementDoctorant(value: EnjeuxIrdEncadrementDoctorantVo) {
        this.enjeuxIrdEncadrementDoctorantService.selectedEnjeuxIrdEncadrementDoctorant = value;
       }

   get editEnjeuxIrdEncadrementDoctorantDialog(): boolean {
           return this.enjeuxIrdEncadrementDoctorantService.editEnjeuxIrdEncadrementDoctorantDialog;

       }
    set editEnjeuxIrdEncadrementDoctorantDialog(value: boolean) {
        this.enjeuxIrdEncadrementDoctorantService.editEnjeuxIrdEncadrementDoctorantDialog = value;
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
       get selectedEncadrementDoctorant(): EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
      set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }
       get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
           return this.encadrementDoctorantService.encadrementDoctorants;
       }
       set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }
       get createEncadrementDoctorantDialog(): boolean {
           return this.encadrementDoctorantService.createEncadrementDoctorantDialog;
       }
      set createEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.createEncadrementDoctorantDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
