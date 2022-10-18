import {Component, OnInit, Input} from '@angular/core';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/TypePubliqueRencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {RencontreGrandPubliqueJeunePubliqueVo} from '../../../../../controller/model/RencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueService} from '../../../../../controller/service/RencontreGrandPubliqueJeunePublique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
@Component({
  selector: 'app-type-publique-rencontre-grand-publique-jeune-publique-create-admin',
  templateUrl: './type-publique-rencontre-grand-publique-jeune-publique-create-admin.component.html',
  styleUrls: ['./type-publique-rencontre-grand-publique-jeune-publique-create-admin.component.css']
})
export class TypePubliqueRencontreGrandPubliqueJeunePubliqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validTypePubliqueLibelle = true;
    _validTypePubliqueCode = true;



constructor(private datePipe: DatePipe, private typePubliqueRencontreGrandPubliqueJeunePubliqueService: TypePubliqueRencontreGrandPubliqueJeunePubliqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private rencontreGrandPubliqueJeunePubliqueService :RencontreGrandPubliqueJeunePubliqueService
,       private typePubliqueService :TypePubliqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedRencontreGrandPubliqueJeunePublique = new RencontreGrandPubliqueJeunePubliqueVo();
    this.rencontreGrandPubliqueJeunePubliqueService.findAll().subscribe((data) => this.rencontreGrandPubliqueJeunePubliques = data);
    this.selectedTypePublique = new TypePubliqueVo();
    this.typePubliqueService.findAll().subscribe((data) => this.typePubliques = data);
}




private setValidation(value : boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.save().subscribe(typePubliqueRencontreGrandPubliqueJeunePublique=>{
       this.typePubliqueRencontreGrandPubliqueJeunePubliques.push({...typePubliqueRencontreGrandPubliqueJeunePublique});
       this.createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = false;
       this.submitted = false;
       this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
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

hideCreateDialog(){
    this.createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typePubliqueRencontreGrandPubliqueJeunePubliques(): Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
    return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliques;
       }
set typePubliqueRencontreGrandPubliqueJeunePubliques(value: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.typePubliqueRencontreGrandPubliqueJeunePubliques = value;
       }

 get selectedTypePubliqueRencontreGrandPubliqueJeunePublique():TypePubliqueRencontreGrandPubliqueJeunePubliqueVo {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.selectedTypePubliqueRencontreGrandPubliqueJeunePublique;
       }
    set selectedTypePubliqueRencontreGrandPubliqueJeunePublique(value: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.selectedTypePubliqueRencontreGrandPubliqueJeunePublique = value;
       }

   get createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
           return this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;

       }
    set createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this.typePubliqueRencontreGrandPubliqueJeunePubliqueService.createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog= value;
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
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


    get validTypePubliqueLibelle(): boolean {
    return this._validTypePubliqueLibelle;
    }

    set validTypePubliqueLibelle(value: boolean) {
    this._validTypePubliqueLibelle = value;
    }
    get validTypePubliqueCode(): boolean {
    return this._validTypePubliqueCode;
    }

    set validTypePubliqueCode(value: boolean) {
    this._validTypePubliqueCode = value;
    }

}
