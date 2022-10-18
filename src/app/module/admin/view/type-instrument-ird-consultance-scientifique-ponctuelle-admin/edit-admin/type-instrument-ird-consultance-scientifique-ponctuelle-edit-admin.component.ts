import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/TypeInstrumentIrdConsultanceScientifiquePonctuelle.service';
import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {ConsultanceScientifiquePonctuelleVo} from '../../../../../controller/model/ConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleService} from '../../../../../controller/service/ConsultanceScientifiquePonctuelle.service';

@Component({
  selector: 'app-type-instrument-ird-consultance-scientifique-ponctuelle-edit-admin',
  templateUrl: './type-instrument-ird-consultance-scientifique-ponctuelle-edit-admin.component.html',
  styleUrls: ['./type-instrument-ird-consultance-scientifique-ponctuelle-edit-admin.component.css']
})
export class TypeInstrumentIrdConsultanceScientifiquePonctuelleEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstrumentIrdConsultanceScientifiquePonctuelleService: TypeInstrumentIrdConsultanceScientifiquePonctuelleService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
 ,       private consultanceScientifiquePonctuelleService: ConsultanceScientifiquePonctuelleService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
    this.consultanceScientifiquePonctuelleService.findAll().subscribe((data) => this.consultanceScientifiquePonctuelles = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.edit().subscribe(typeInstrumentIrdConsultanceScientifiquePonctuelle=>{
    const myIndex = this.typeInstrumentIrdConsultanceScientifiquePonctuelles.findIndex(e => e.id === this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle.id);
    this.typeInstrumentIrdConsultanceScientifiquePonctuelles[myIndex] = this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle;
    this.editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = false;
    this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateconsultanceScientifiquePonctuelle(consultanceScientifiquePonctuelle: string) {
                      const isPermistted = await this.roleService.isPermitted('ConsultanceScientifiquePonctuelle', 'add');
                       if(isPermistted){
         this.selectedConsultanceScientifiquePonctuelle = new ConsultanceScientifiquePonctuelleVo();
        this.createConsultanceScientifiquePonctuelleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
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
    this.editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog  = false;
}

// getters and setters

get typeInstrumentIrdConsultanceScientifiquePonctuelles(): Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
    return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.typeInstrumentIrdConsultanceScientifiquePonctuelles;
       }
set typeInstrumentIrdConsultanceScientifiquePonctuelles(value: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.typeInstrumentIrdConsultanceScientifiquePonctuelles = value;
       }

 get selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle(): TypeInstrumentIrdConsultanceScientifiquePonctuelleVo {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle;
       }
    set selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle(value: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

   get editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog;

       }
    set editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.typeInstrumentIrdConsultanceScientifiquePonctuelleService.editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }

       get selectedConsultanceScientifiquePonctuelle(): ConsultanceScientifiquePonctuelleVo {
           return this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle;
       }
      set selectedConsultanceScientifiquePonctuelle(value: ConsultanceScientifiquePonctuelleVo) {
        this.consultanceScientifiquePonctuelleService.selectedConsultanceScientifiquePonctuelle = value;
       }
       get consultanceScientifiquePonctuelles(): Array<ConsultanceScientifiquePonctuelleVo> {
           return this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles;
       }
       set consultanceScientifiquePonctuelles(value: Array<ConsultanceScientifiquePonctuelleVo>) {
        this.consultanceScientifiquePonctuelleService.consultanceScientifiquePonctuelles = value;
       }
       get createConsultanceScientifiquePonctuelleDialog(): boolean {
           return this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog;
       }
      set createConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this.consultanceScientifiquePonctuelleService.createConsultanceScientifiquePonctuelleDialog= value;
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
