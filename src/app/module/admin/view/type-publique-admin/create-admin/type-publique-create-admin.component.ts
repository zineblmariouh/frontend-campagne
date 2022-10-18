import {Component, OnInit, Input} from '@angular/core';
import {TypePubliqueService} from '../../../../../controller/service/TypePublique.service';
import {TypePubliqueVo} from '../../../../../controller/model/TypePublique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-publique-create-admin',
  templateUrl: './type-publique-create-admin.component.html',
  styleUrls: ['./type-publique-create-admin.component.css']
})
export class TypePubliqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypePubliqueLibelle = true;
   _validTypePubliqueCode = true;




constructor(private datePipe: DatePipe, private typePubliqueService: TypePubliqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    this.validTypePubliqueLibelle = value;
    this.validTypePubliqueCode = value;
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
     this.typePubliqueService.save().subscribe(typePublique=>{
       this.typePubliques.push({...typePublique});
       this.createTypePubliqueDialog = false;
       this.submitted = false;
       this.selectedTypePublique = new TypePubliqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypePubliqueLibelle();
this.validateTypePubliqueCode();

    }

private validateTypePubliqueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypePublique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypePubliqueLibelle = false;
        } else {
            this.validTypePubliqueLibelle = true;
        }
    }
private validateTypePubliqueCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypePublique.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypePubliqueCode = false;
        } else {
            this.validTypePubliqueCode = true;
        }
    }






//openPopup
// methods

hideCreateDialog(){
    this.createTypePubliqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typePubliques(): Array<TypePubliqueVo> {
    return this.typePubliqueService.typePubliques;
       }
set typePubliques(value: Array<TypePubliqueVo>) {
        this.typePubliqueService.typePubliques = value;
       }

 get selectedTypePublique():TypePubliqueVo {
           return this.typePubliqueService.selectedTypePublique;
       }
    set selectedTypePublique(value: TypePubliqueVo) {
        this.typePubliqueService.selectedTypePublique = value;
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
