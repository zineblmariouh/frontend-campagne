import {Component, OnInit} from '@angular/core';
import {TypeOutilPedagogiqueService} from '../../../../../controller/service/TypeOutilPedagogique.service';
import {TypeOutilPedagogiqueVo} from '../../../../../controller/model/TypeOutilPedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeOutilVo} from '../../../../../controller/model/TypeOutil.model';
import {TypeOutilService} from '../../../../../controller/service/TypeOutil.service';
import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';

@Component({
  selector: 'app-type-outil-pedagogique-edit-chercheur',
  templateUrl: './type-outil-pedagogique-edit-chercheur.component.html',
  styleUrls: ['./type-outil-pedagogique-edit-chercheur.component.css']
})
export class TypeOutilPedagogiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeOutilPedagogiqueService: TypeOutilPedagogiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeOutilService: TypeOutilService
 ,       private outilPedagogiqueService: OutilPedagogiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeOutil = new TypeOutilVo();
    this.typeOutilService.findAll().subscribe((data) => this.typeOutils = data);
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typeOutilPedagogiqueService.edit().subscribe(typeOutilPedagogique=>{
    const myIndex = this.typeOutilPedagogiques.findIndex(e => e.id === this.selectedTypeOutilPedagogique.id);
    this.typeOutilPedagogiques[myIndex] = this.selectedTypeOutilPedagogique;
    this.editTypeOutilPedagogiqueDialog = false;
    this.selectedTypeOutilPedagogique = new TypeOutilPedagogiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeOutil(typeOutil: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeOutil', 'add');
                       if(isPermistted){
         this.selectedTypeOutil = new TypeOutilVo();
        this.createTypeOutilDialog = true;
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
    this.editTypeOutilPedagogiqueDialog  = false;
}

// getters and setters

get typeOutilPedagogiques(): Array<TypeOutilPedagogiqueVo> {
    return this.typeOutilPedagogiqueService.typeOutilPedagogiques;
       }
set typeOutilPedagogiques(value: Array<TypeOutilPedagogiqueVo>) {
        this.typeOutilPedagogiqueService.typeOutilPedagogiques = value;
       }

 get selectedTypeOutilPedagogique(): TypeOutilPedagogiqueVo {
           return this.typeOutilPedagogiqueService.selectedTypeOutilPedagogique;
       }
    set selectedTypeOutilPedagogique(value: TypeOutilPedagogiqueVo) {
        this.typeOutilPedagogiqueService.selectedTypeOutilPedagogique = value;
       }

   get editTypeOutilPedagogiqueDialog(): boolean {
           return this.typeOutilPedagogiqueService.editTypeOutilPedagogiqueDialog;

       }
    set editTypeOutilPedagogiqueDialog(value: boolean) {
        this.typeOutilPedagogiqueService.editTypeOutilPedagogiqueDialog = value;
       }

       get selectedTypeOutil(): TypeOutilVo {
           return this.typeOutilService.selectedTypeOutil;
       }
      set selectedTypeOutil(value: TypeOutilVo) {
        this.typeOutilService.selectedTypeOutil = value;
       }
       get typeOutils(): Array<TypeOutilVo> {
           return this.typeOutilService.typeOutils;
       }
       set typeOutils(value: Array<TypeOutilVo>) {
        this.typeOutilService.typeOutils = value;
       }
       get createTypeOutilDialog(): boolean {
           return this.typeOutilService.createTypeOutilDialog;
       }
      set createTypeOutilDialog(value: boolean) {
        this.typeOutilService.createTypeOutilDialog= value;
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
