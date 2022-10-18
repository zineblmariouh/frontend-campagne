import {Component, OnInit} from '@angular/core';
import {InstrumentIrdChercheurService} from '../../../../../controller/service/InstrumentIrdChercheur.service';
import {InstrumentIrdChercheurVo} from '../../../../../controller/model/InstrumentIrdChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-instrument-ird-chercheur-edit-admin',
  templateUrl: './instrument-ird-chercheur-edit-admin.component.html',
  styleUrls: ['./instrument-ird-chercheur-edit-admin.component.css']
})
export class InstrumentIrdChercheurEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdChercheurService: InstrumentIrdChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private instrumentIrdService: InstrumentIrdService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.instrumentIrdChercheurService.edit().subscribe(instrumentIrdChercheur=>{
    const myIndex = this.instrumentIrdChercheurs.findIndex(e => e.id === this.selectedInstrumentIrdChercheur.id);
    this.instrumentIrdChercheurs[myIndex] = this.selectedInstrumentIrdChercheur;
    this.editInstrumentIrdChercheurDialog = false;
    this.selectedInstrumentIrdChercheur = new InstrumentIrdChercheurVo();


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
    this.editInstrumentIrdChercheurDialog  = false;
}

// getters and setters

get instrumentIrdChercheurs(): Array<InstrumentIrdChercheurVo> {
    return this.instrumentIrdChercheurService.instrumentIrdChercheurs;
       }
set instrumentIrdChercheurs(value: Array<InstrumentIrdChercheurVo>) {
        this.instrumentIrdChercheurService.instrumentIrdChercheurs = value;
       }

 get selectedInstrumentIrdChercheur(): InstrumentIrdChercheurVo {
           return this.instrumentIrdChercheurService.selectedInstrumentIrdChercheur;
       }
    set selectedInstrumentIrdChercheur(value: InstrumentIrdChercheurVo) {
        this.instrumentIrdChercheurService.selectedInstrumentIrdChercheur = value;
       }

   get editInstrumentIrdChercheurDialog(): boolean {
           return this.instrumentIrdChercheurService.editInstrumentIrdChercheurDialog;

       }
    set editInstrumentIrdChercheurDialog(value: boolean) {
        this.instrumentIrdChercheurService.editInstrumentIrdChercheurDialog = value;
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
