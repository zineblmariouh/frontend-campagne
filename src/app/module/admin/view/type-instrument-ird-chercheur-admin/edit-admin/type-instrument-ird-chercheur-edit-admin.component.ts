import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdChercheurService} from '../../../../../controller/service/TypeInstrumentIrdChercheur.service';
import {TypeInstrumentIrdChercheurVo} from '../../../../../controller/model/TypeInstrumentIrdChercheur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {ChercheurVo} from '../../../../../controller/model/Chercheur.model';
import {ChercheurService} from '../../../../../controller/service/Chercheur.service';

@Component({
  selector: 'app-type-instrument-ird-chercheur-edit-admin',
  templateUrl: './type-instrument-ird-chercheur-edit-admin.component.html',
  styleUrls: ['./type-instrument-ird-chercheur-edit-admin.component.css']
})
export class TypeInstrumentIrdChercheurEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstrumentIrdChercheurService: TypeInstrumentIrdChercheurService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeInstrumentIrdService: TypeInstrumentIrdService
 ,       private chercheurService: ChercheurService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();
    this.typeInstrumentIrdService.findAll().subscribe((data) => this.typeInstrumentIrds = data);
    this.selectedChercheur = new ChercheurVo();
    this.chercheurService.findAll().subscribe((data) => this.chercheurs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typeInstrumentIrdChercheurService.edit().subscribe(typeInstrumentIrdChercheur=>{
    const myIndex = this.typeInstrumentIrdChercheurs.findIndex(e => e.id === this.selectedTypeInstrumentIrdChercheur.id);
    this.typeInstrumentIrdChercheurs[myIndex] = this.selectedTypeInstrumentIrdChercheur;
    this.editTypeInstrumentIrdChercheurDialog = false;
    this.selectedTypeInstrumentIrdChercheur = new TypeInstrumentIrdChercheurVo();


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
    this.editTypeInstrumentIrdChercheurDialog  = false;
}

// getters and setters

get typeInstrumentIrdChercheurs(): Array<TypeInstrumentIrdChercheurVo> {
    return this.typeInstrumentIrdChercheurService.typeInstrumentIrdChercheurs;
       }
set typeInstrumentIrdChercheurs(value: Array<TypeInstrumentIrdChercheurVo>) {
        this.typeInstrumentIrdChercheurService.typeInstrumentIrdChercheurs = value;
       }

 get selectedTypeInstrumentIrdChercheur(): TypeInstrumentIrdChercheurVo {
           return this.typeInstrumentIrdChercheurService.selectedTypeInstrumentIrdChercheur;
       }
    set selectedTypeInstrumentIrdChercheur(value: TypeInstrumentIrdChercheurVo) {
        this.typeInstrumentIrdChercheurService.selectedTypeInstrumentIrdChercheur = value;
       }

   get editTypeInstrumentIrdChercheurDialog(): boolean {
           return this.typeInstrumentIrdChercheurService.editTypeInstrumentIrdChercheurDialog;

       }
    set editTypeInstrumentIrdChercheurDialog(value: boolean) {
        this.typeInstrumentIrdChercheurService.editTypeInstrumentIrdChercheurDialog = value;
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
