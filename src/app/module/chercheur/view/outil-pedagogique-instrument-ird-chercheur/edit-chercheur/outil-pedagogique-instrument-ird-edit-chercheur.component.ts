import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueInstrumentIrd.service';
import {OutilPedagogiqueInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';

@Component({
  selector: 'app-outil-pedagogique-instrument-ird-edit-chercheur',
  templateUrl: './outil-pedagogique-instrument-ird-edit-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-instrument-ird-edit-chercheur.component.css']
})
export class OutilPedagogiqueInstrumentIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueInstrumentIrdService: OutilPedagogiqueInstrumentIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private outilPedagogiqueService: OutilPedagogiqueService
 ,       private instrumentIrdService: InstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedInstrumentIrd = new InstrumentIrdVo();
    this.instrumentIrdService.findAll().subscribe((data) => this.instrumentIrds = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.outilPedagogiqueInstrumentIrdService.edit().subscribe(outilPedagogiqueInstrumentIrd=>{
    const myIndex = this.outilPedagogiqueInstrumentIrds.findIndex(e => e.id === this.selectedOutilPedagogiqueInstrumentIrd.id);
    this.outilPedagogiqueInstrumentIrds[myIndex] = this.selectedOutilPedagogiqueInstrumentIrd;
    this.editOutilPedagogiqueInstrumentIrdDialog = false;
    this.selectedOutilPedagogiqueInstrumentIrd = new OutilPedagogiqueInstrumentIrdVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateoutilPedagogique(outilPedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'add');
                       if(isPermistted){
         this.selectedOutilPedagogique = new OutilPedagogiqueVo();
        this.createOutilPedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
// methods

hideEditDialog(){
    this.editOutilPedagogiqueInstrumentIrdDialog  = false;
}

// getters and setters

get outilPedagogiqueInstrumentIrds(): Array<OutilPedagogiqueInstrumentIrdVo> {
    return this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrds;
       }
set outilPedagogiqueInstrumentIrds(value: Array<OutilPedagogiqueInstrumentIrdVo>) {
        this.outilPedagogiqueInstrumentIrdService.outilPedagogiqueInstrumentIrds = value;
       }

 get selectedOutilPedagogiqueInstrumentIrd(): OutilPedagogiqueInstrumentIrdVo {
           return this.outilPedagogiqueInstrumentIrdService.selectedOutilPedagogiqueInstrumentIrd;
       }
    set selectedOutilPedagogiqueInstrumentIrd(value: OutilPedagogiqueInstrumentIrdVo) {
        this.outilPedagogiqueInstrumentIrdService.selectedOutilPedagogiqueInstrumentIrd = value;
       }

   get editOutilPedagogiqueInstrumentIrdDialog(): boolean {
           return this.outilPedagogiqueInstrumentIrdService.editOutilPedagogiqueInstrumentIrdDialog;

       }
    set editOutilPedagogiqueInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueInstrumentIrdService.editOutilPedagogiqueInstrumentIrdDialog = value;
       }

       get selectedOutilPedagogique(): OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques(): Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get createOutilPedagogiqueDialog(): boolean {
           return this.outilPedagogiqueService.createOutilPedagogiqueDialog;
       }
      set createOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.createOutilPedagogiqueDialog= value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
