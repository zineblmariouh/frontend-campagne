import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueTypeInstrumentIrdService} from '../../../../../controller/service/OutilPedagogiqueTypeInstrumentIrd.service';
import {OutilPedagogiqueTypeInstrumentIrdVo} from '../../../../../controller/model/OutilPedagogiqueTypeInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-outil-pedagogique-type-instrument-ird-edit-chercheur',
  templateUrl: './outil-pedagogique-type-instrument-ird-edit-chercheur.component.html',
  styleUrls: ['./outil-pedagogique-type-instrument-ird-edit-chercheur.component.css']
})
export class OutilPedagogiqueTypeInstrumentIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueTypeInstrumentIrdService: OutilPedagogiqueTypeInstrumentIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private outilPedagogiqueService: OutilPedagogiqueService
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.outilPedagogiqueTypeInstrumentIrdService.edit().subscribe(outilPedagogiqueTypeInstrumentIrd=>{
    const myIndex = this.outilPedagogiqueTypeInstrumentIrds.findIndex(e => e.id === this.selectedOutilPedagogiqueTypeInstrumentIrd.id);
    this.outilPedagogiqueTypeInstrumentIrds[myIndex] = this.selectedOutilPedagogiqueTypeInstrumentIrd;
    this.editOutilPedagogiqueTypeInstrumentIrdDialog = false;
    this.selectedOutilPedagogiqueTypeInstrumentIrd = new OutilPedagogiqueTypeInstrumentIrdVo();


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
// methods

hideEditDialog(){
    this.editOutilPedagogiqueTypeInstrumentIrdDialog  = false;
}

// getters and setters

get outilPedagogiqueTypeInstrumentIrds(): Array<OutilPedagogiqueTypeInstrumentIrdVo> {
    return this.outilPedagogiqueTypeInstrumentIrdService.outilPedagogiqueTypeInstrumentIrds;
       }
set outilPedagogiqueTypeInstrumentIrds(value: Array<OutilPedagogiqueTypeInstrumentIrdVo>) {
        this.outilPedagogiqueTypeInstrumentIrdService.outilPedagogiqueTypeInstrumentIrds = value;
       }

 get selectedOutilPedagogiqueTypeInstrumentIrd(): OutilPedagogiqueTypeInstrumentIrdVo {
           return this.outilPedagogiqueTypeInstrumentIrdService.selectedOutilPedagogiqueTypeInstrumentIrd;
       }
    set selectedOutilPedagogiqueTypeInstrumentIrd(value: OutilPedagogiqueTypeInstrumentIrdVo) {
        this.outilPedagogiqueTypeInstrumentIrdService.selectedOutilPedagogiqueTypeInstrumentIrd = value;
       }

   get editOutilPedagogiqueTypeInstrumentIrdDialog(): boolean {
           return this.outilPedagogiqueTypeInstrumentIrdService.editOutilPedagogiqueTypeInstrumentIrdDialog;

       }
    set editOutilPedagogiqueTypeInstrumentIrdDialog(value: boolean) {
        this.outilPedagogiqueTypeInstrumentIrdService.editOutilPedagogiqueTypeInstrumentIrdDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
