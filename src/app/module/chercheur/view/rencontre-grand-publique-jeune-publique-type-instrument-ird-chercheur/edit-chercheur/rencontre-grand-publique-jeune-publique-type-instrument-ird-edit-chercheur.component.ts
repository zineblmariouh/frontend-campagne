import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-type-instrument-ird-edit-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-type-instrument-ird-edit-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-type-instrument-ird-edit-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
 ,       private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.edit().subscribe(rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd=>{
    const myIndex = this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds.findIndex(e => e.id === this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd.id);
    this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds[myIndex] = this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd;
    this.editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = false;
    this.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeInstrumentIrd(typeInstrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeInstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
        this.createTypeInstrumentIrdDialog = true;
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
    this.editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds;
       }
set rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(): RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrd = value;
       }

   get editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog;

       }
    set editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdService.editRencontreGrandPubliqueJeunePubliqueTypeInstrumentIrdDialog = value;
       }

       get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
      set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }
       get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
           return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
       set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }
       get createTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.createTypeInstrumentIrdDialog;
       }
      set createTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.createTypeInstrumentIrdDialog= value;
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
