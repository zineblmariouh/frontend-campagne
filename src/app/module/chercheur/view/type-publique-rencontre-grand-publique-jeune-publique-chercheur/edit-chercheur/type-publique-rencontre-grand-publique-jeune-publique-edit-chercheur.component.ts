import {Component, OnInit} from '@angular/core';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/TypePubliqueRencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';

@Component({
  selector: 'app-type-publique-rencontre-grand-publique-jeune-publique-edit-chercheur',
  templateUrl: './type-publique-rencontre-grand-publique-jeune-publique-edit-chercheur.component.html',
  styleUrls: ['./type-publique-rencontre-grand-publique-jeune-publique-edit-chercheur.component.css']
})
export class TypePubliqueRencontreGrandPubliqueJeunePubliqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typePubliqueRencontreGrandPubliqueJeunePubliqueService: TypePubliqueRencontreGrandPubliqueJeunePubliqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreGrandPubliqueJeunePubliqueService: RencontreGrandPubliqueJeunePubliqueService
 ,       private typePubliqueService: TypePubliqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedTypePublique = new TypePubliqueVo();
    this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.edit().subscribe(typePubliqueRencontreGrandPubliqueJeunePublique=>{
    const myIndex = this.typePubliqueRencontreGrandPubliqueJeunePubliques.findIndex(e => e.id === this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique.id);
    this.typePubliqueRencontreGrandPubliqueJeunePubliques[myIndex] = this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique;
    this.editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = false;
    this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();


    }, error => {
        console.log(error);
    });

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
              public async openCreatetypePublique(typePublique: string) {
                      const isPermistted = await this.roleService.isPermitted('TypePublique', 'add');
                       if(isPermistted){
         this.selectedTypePublique = new TypePubliqueVo();
        this.createTypePubliqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog  = false;
}

// getters and setters

get typePubliqueRencontreGrandPubliqueJeunePubliques(): Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
    return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliques;
       }
set typePubliqueRencontreGrandPubliqueJeunePubliques(value: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedTypePubliqueRencontreGrandPubliqueJeunePublique(): TypePubliqueRencontreGrandPubliqueJeunePubliqueVo {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.selectedTypePubliqueRencontreGrandPubliqueJeunePublique;
       }
    set selectedTypePubliqueRencontreGrandPubliqueJeunePublique(value: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = value;
       }

   get editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = value;
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
       get selectedTypePublique(): TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
      set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
       }
       get typePubliques(): Array<TypePubliqueVo> {
           return this.typePubliqueService.typePubliques;
       }
       set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }
       get createTypePubliqueDialog(): boolean {
           return this.typePubliqueService.createTypePubliqueDialog;
       }
      set createTypePubliqueDialog(value: boolean) {
        this.typePubliqueService.createTypePubliqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
