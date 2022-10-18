import {Component, OnInit} from '@angular/core';
import {EntiteAdministrativeService} from '../../../../../controller/service/EntiteAdministrative.service';
import {EntiteAdministrativeVo} from '../../../../../controller/model/EntiteAdministrative.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeEntiteAdministrativeVo} from '../../../../../controller/model/TypeEntiteAdministrative.model';
import {TypeEntiteAdministrativeService} from '../../../../../controller/service/TypeEntiteAdministrative.service';

@Component({
  selector: 'app-entite-administrative-edit-admin',
  templateUrl: './entite-administrative-edit-admin.component.html',
  styleUrls: ['./entite-administrative-edit-admin.component.css']
})
export class EntiteAdministrativeEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private entiteAdministrativeService: EntiteAdministrativeService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeEntiteAdministrativeService: TypeEntiteAdministrativeService
) {
}

// methods
ngOnInit(): void {
    this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
    this.typeEntiteAdministrativeService.findAll().subscribe((data) => this.typeEntiteAdministratives = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedEntiteAdministrative.dateArchivage = DateUtils.toDate(this.selectedEntiteAdministrative.dateArchivage);
            this.selectedEntiteAdministrative.dateCreation = DateUtils.toDate(this.selectedEntiteAdministrative.dateCreation);
    this.entiteAdministrativeService.edit().subscribe(entiteAdministrative=>{
    const myIndex = this.entiteAdministratives.findIndex(e => e.id === this.selectedEntiteAdministrative.id);
    this.entiteAdministratives[myIndex] = this.selectedEntiteAdministrative;
    this.editEntiteAdministrativeDialog = false;
    this.selectedEntiteAdministrative = new EntiteAdministrativeVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeEntiteAdministrative(typeEntiteAdministrative: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEntiteAdministrative', 'add');
                       if(isPermistted){
         this.selectedTypeEntiteAdministrative = new TypeEntiteAdministrativeVo();
        this.createTypeEntiteAdministrativeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEntiteAdministrativeDialog  = false;
}

// getters and setters

get entiteAdministratives(): Array<EntiteAdministrativeVo> {
    return this.entiteAdministrativeService.entiteAdministratives;
       }
set entiteAdministratives(value: Array<EntiteAdministrativeVo>) {
        this.entiteAdministrativeService.entiteAdministratives = value;
       }

 get selectedEntiteAdministrative(): EntiteAdministrativeVo {
           return this.entiteAdministrativeService.selectedEntiteAdministrative;
       }
    set selectedEntiteAdministrative(value: EntiteAdministrativeVo) {
        this.entiteAdministrativeService.selectedEntiteAdministrative = value;
       }

   get editEntiteAdministrativeDialog(): boolean {
           return this.entiteAdministrativeService.editEntiteAdministrativeDialog;

       }
    set editEntiteAdministrativeDialog(value: boolean) {
        this.entiteAdministrativeService.editEntiteAdministrativeDialog = value;
       }

       get selectedTypeEntiteAdministrative(): TypeEntiteAdministrativeVo {
           return this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative;
       }
      set selectedTypeEntiteAdministrative(value: TypeEntiteAdministrativeVo) {
        this.typeEntiteAdministrativeService.selectedTypeEntiteAdministrative = value;
       }
       get typeEntiteAdministratives(): Array<TypeEntiteAdministrativeVo> {
           return this.typeEntiteAdministrativeService.typeEntiteAdministratives;
       }
       set typeEntiteAdministratives(value: Array<TypeEntiteAdministrativeVo>) {
        this.typeEntiteAdministrativeService.typeEntiteAdministratives = value;
       }
       get createTypeEntiteAdministrativeDialog(): boolean {
           return this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog;
       }
      set createTypeEntiteAdministrativeDialog(value: boolean) {
        this.typeEntiteAdministrativeService.createTypeEntiteAdministrativeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
