import {Component, OnInit} from '@angular/core';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.service';
import {RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePubliqueInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-rencontre-grand-publique-jeune-publique-instrument-ird-edit-chercheur',
  templateUrl: './rencontre-grand-publique-jeune-publique-instrument-ird-edit-chercheur.component.html',
  styleUrls: ['./rencontre-grand-publique-jeune-publique-instrument-ird-edit-chercheur.component.css']
})
export class RencontreGrandPubliqueJeunePubliqueInstrumentIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreGrandPubliqueJeunePubliqueInstrumentIrdService: RencontreGrandPubliqueJeunePubliqueInstrumentIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
 ,       private instrumentIrdService: InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.edit().subscribe(rencontreGrandPubliqueJeunePubliqueInstrumentIrd=>{
    const myIndex = this.rencontreGrandPubliqueJeunePubliqueInstrumentIrds.findIndex(e => e.id === this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd.id);
    this.rencontreGrandPubliqueJeunePubliqueInstrumentIrds[myIndex] = this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd;
    this.editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = false;
    this.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = new RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateinstrumentIrd(instrumentIrd: string) {
                      const isPermistted = await this.roleService.isPermitted('InstrumentIrd', 'add');
                       if(isPermistted){
         this.selectedInstrumentIrd = new InstrumentIrdVo();
        this.createInstrumentIrdDialog = true;
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
    this.editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog  = false;
}

// getters and setters

get rencontreGrandPubliqueJeunePubliqueInstrumentIrds(): Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo> {
    return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrds;
       }
set rencontreGrandPubliqueJeunePubliqueInstrumentIrds(value: Array<RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo>) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.rencontreGrandPubliqueJeunePubliqueInstrumentIrds = value;
       }

 get selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd(): RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd;
       }
    set selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd(value: RencontreGrandPubliqueJeunePubliqueInstrumentIrdVo) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.selectedRencontreGrandPubliqueJeunePubliqueInstrumentIrd = value;
       }

   get editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(): boolean {
           return this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog;

       }
    set editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog(value: boolean) {
        this.rencontreGrandPubliqueJeunePubliqueInstrumentIrdService.editRencontreGrandPubliqueJeunePubliqueInstrumentIrdDialog = value;
       }

       get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
      set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }
       get instrumentIrds(): Array<InstrumentIrdVo> {
           return this.instrumentIrdService.instrumentIrds;
       }
       set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }
       get createInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.createInstrumentIrdDialog;
       }
      set createInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.createInstrumentIrdDialog= value;
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
