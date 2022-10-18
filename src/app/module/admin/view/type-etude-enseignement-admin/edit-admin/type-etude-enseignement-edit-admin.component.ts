import {Component, OnInit} from '@angular/core';
import {TypeEtudeEnseignementService} from '../../../../../controller/service/TypeEtudeEnseignement.service';
import {TypeEtudeEnseignementVo} from '../../../../../controller/model/TypeEtudeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeEtudeVo} from '../../../../../controller/model/TypeEtude.model';
import {TypeEtudeService} from '../../../../../controller/service/TypeEtude.service';
import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';

@Component({
  selector: 'app-type-etude-enseignement-edit-admin',
  templateUrl: './type-etude-enseignement-edit-admin.component.html',
  styleUrls: ['./type-etude-enseignement-edit-admin.component.css']
})
export class TypeEtudeEnseignementEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeEtudeEnseignementService: TypeEtudeEnseignementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeEtudeService: TypeEtudeService
 ,       private enseignementService: EnseignementService
) {
}

// methods
ngOnInit(): void {
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
    this.selectedTypeEtude = new TypeEtudeVo();
    this.typeEtudeService.findAll().subscribe((data) => this.typeEtudes = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typeEtudeEnseignementService.edit().subscribe(typeEtudeEnseignement=>{
    const myIndex = this.typeEtudeEnseignements.findIndex(e => e.id === this.selectedTypeEtudeEnseignement.id);
    this.typeEtudeEnseignements[myIndex] = this.selectedTypeEtudeEnseignement;
    this.editTypeEtudeEnseignementDialog = false;
    this.selectedTypeEtudeEnseignement = new TypeEtudeEnseignementVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateenseignement(enseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('Enseignement', 'add');
                       if(isPermistted){
         this.selectedEnseignement = new EnseignementVo();
        this.createEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatetypeEtude(typeEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeEtude', 'add');
                       if(isPermistted){
         this.selectedTypeEtude = new TypeEtudeVo();
        this.createTypeEtudeDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editTypeEtudeEnseignementDialog  = false;
}

// getters and setters

get typeEtudeEnseignements(): Array<TypeEtudeEnseignementVo> {
    return this.typeEtudeEnseignementService.typeEtudeEnseignements;
       }
set typeEtudeEnseignements(value: Array<TypeEtudeEnseignementVo>) {
        this.typeEtudeEnseignementService.typeEtudeEnseignements = value;
       }

 get selectedTypeEtudeEnseignement(): TypeEtudeEnseignementVo {
           return this.typeEtudeEnseignementService.selectedTypeEtudeEnseignement;
       }
    set selectedTypeEtudeEnseignement(value: TypeEtudeEnseignementVo) {
        this.typeEtudeEnseignementService.selectedTypeEtudeEnseignement = value;
       }

   get editTypeEtudeEnseignementDialog(): boolean {
           return this.typeEtudeEnseignementService.editTypeEtudeEnseignementDialog;

       }
    set editTypeEtudeEnseignementDialog(value: boolean) {
        this.typeEtudeEnseignementService.editTypeEtudeEnseignementDialog = value;
       }

       get selectedEnseignement(): EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements(): Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get createEnseignementDialog(): boolean {
           return this.enseignementService.createEnseignementDialog;
       }
      set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
       }
       get selectedTypeEtude(): TypeEtudeVo {
           return this.typeEtudeService.selectedTypeEtude;
       }
      set selectedTypeEtude(value: TypeEtudeVo) {
        this.typeEtudeService.selectedTypeEtude = value;
       }
       get typeEtudes(): Array<TypeEtudeVo> {
           return this.typeEtudeService.typeEtudes;
       }
       set typeEtudes(value: Array<TypeEtudeVo>) {
        this.typeEtudeService.typeEtudes = value;
       }
       get createTypeEtudeDialog(): boolean {
           return this.typeEtudeService.createTypeEtudeDialog;
       }
      set createTypeEtudeDialog(value: boolean) {
        this.typeEtudeService.createTypeEtudeDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
