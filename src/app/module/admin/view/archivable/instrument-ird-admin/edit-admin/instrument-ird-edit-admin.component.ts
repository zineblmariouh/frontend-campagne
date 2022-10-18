import {Component, OnInit} from '@angular/core';
import {InstrumentIrdService} from '../../../../../controller/service/InstrumentIrd.service';
import {InstrumentIrdVo} from '../../../../../controller/model/InstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';

@Component({
  selector: 'app-instrument-ird-edit-admin',
  templateUrl: './instrument-ird-edit-admin.component.html',
  styleUrls: ['./instrument-ird-edit-admin.component.css']
})
export class InstrumentIrdEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private instrumentIrdService: InstrumentIrdService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedInstrumentIrd.dateArchivage = DateUtils.toDate(this.selectedInstrumentIrd.dateArchivage);
            this.selectedInstrumentIrd.dateCreation = DateUtils.toDate(this.selectedInstrumentIrd.dateCreation);
    this.instrumentIrdService.edit().subscribe(instrumentIrd=>{
    const myIndex = this.instrumentIrds.findIndex(e => e.id === this.selectedInstrumentIrd.id);
    this.instrumentIrds[myIndex] = this.selectedInstrumentIrd;
    this.editInstrumentIrdDialog = false;
    this.selectedInstrumentIrd = new InstrumentIrdVo();


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
// methods

hideEditDialog(){
    this.editInstrumentIrdDialog  = false;
}

// getters and setters

get instrumentIrds(): Array<InstrumentIrdVo> {
    return this.instrumentIrdService.instrumentIrds;
       }
set instrumentIrds(value: Array<InstrumentIrdVo>) {
        this.instrumentIrdService.instrumentIrds = value;
       }

 get selectedInstrumentIrd(): InstrumentIrdVo {
           return this.instrumentIrdService.selectedInstrumentIrd;
       }
    set selectedInstrumentIrd(value: InstrumentIrdVo) {
        this.instrumentIrdService.selectedInstrumentIrd = value;
       }

   get editInstrumentIrdDialog(): boolean {
           return this.instrumentIrdService.editInstrumentIrdDialog;

       }
    set editInstrumentIrdDialog(value: boolean) {
        this.instrumentIrdService.editInstrumentIrdDialog = value;
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

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
