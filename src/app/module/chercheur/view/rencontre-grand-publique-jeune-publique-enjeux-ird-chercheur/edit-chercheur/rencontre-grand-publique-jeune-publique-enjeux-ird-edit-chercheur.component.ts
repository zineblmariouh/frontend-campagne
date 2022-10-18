import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.service';
import {RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueEnjeuxIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {EnjeuxIrdVo} from '../../../../../controller/model/EnjeuxIrd.model';
import {EnjeuxIrdService} from '../../../../../controller/service/EnjeuxIrd.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-enjeux-ird-edit-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-enjeux-ird-edit-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-enjeux-ird-edit-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueEnjeuxIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
 ,       private enjeuxIrdService: EnjeuxIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedEnjeuxIrd = new EnjeuxIrdVo();
    this.enjeuxIrdService.findAll().subscribe((data) => this.enjeuxIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.edit().subscribe(rencontreGrandPubliqueJeunePubliqueEnjeuxIrd=>{
    const myIndex = this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds.findIndex(e => e.id === this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd.id);
    this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds[myIndex] = this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd;
    this.editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = false;
    this.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = new RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo();


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
              public async openCreaterencontreGrandPubliqueJeunePublique(rencontreGrandPubliqueJeunePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreGrandPubliqueJeunePublique', 'add');
                       if(isPermistted){
         this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
        this.createRencontreGrandPubliqueJeunePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(): Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds;
       }
set rencontreGrandPubliqueJeunePubliqueEnjeuxIrds(value: Array<RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.rencontreGrandPubliqueJeunePubliqueEnjeuxIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(): RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd(value: RencontreGrandPubliqueJeunePubliqueEnjeuxIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.selectedRencontreGrandPubliqueJeunePubliqueEnjeuxIrd = value;
       }

   get editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog;

       }
    set editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueEnjeuxIrdService.editRencontreGrandPubliqueJeunePubliqueEnjeuxIrdDialog = value;
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
       get selectedRencontreGrandPubliqueJeunePublique(): RencontreGrandPubliqueJeunePubliqueVo {
           return this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique;
       }
      set selectedRencontreGrandPubliqueJeunePublique(value: RencontreGrandPubliqueJeunePubliqueVo) {
        this.rencontreGrandPubliqueJeunePubliqueService.selectedRencontreGrandPubliqueJeunePublique = value;
       }
       get rencontreGrandPubliqueJeunePubliques(): Array<RencontreGrandPubliqueJeunePubliqueVo> {
           return this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques;
       }
       set rencontreGrandPubliqueJeunePubliques(value: Array<RencontreGrandPubliqueJeunePubliqueVo>) {
        this.rencontreGrandPubliqueJeunePubliqueService.rencontreGrandPubliqueJeunePubliques = value;
       }
       get createRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog;
       }
      set createRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueService.createRencontreGrandPubliqueJeunePubliqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
