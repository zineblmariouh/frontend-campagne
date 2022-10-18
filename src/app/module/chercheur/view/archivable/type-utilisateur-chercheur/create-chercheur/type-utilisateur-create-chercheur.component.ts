import {Component, OnInit, Input} from '@angular/core';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-type-utilisateur-create-chercheur',
  templateUrl: './type-utilisateur-create-chercheur.component.html',
  styleUrls: ['./type-utilisateur-create-chercheur.component.css']
})
export class TypeUtilisateurCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validTypeUtilisateurLibelle = true;
   _validTypeUtilisateurCode = true;




constructor(private datePipe: DatePipe, private typeUtilisateurService: TypeUtilisateurService
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
    this.validTypeUtilisateurLibelle = value;
    this.validTypeUtilisateurCode = value;
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
     this.typeUtilisateurService.save().subscribe(typeUtilisateur=>{
       this.typeUtilisateurs.push({...typeUtilisateur});
       this.createTypeUtilisateurDialog = false;
       this.submitted = false;
       this.selectedTypeUtilisateur = new TypeUtilisateurVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateTypeUtilisateurLibelle();
this.validateTypeUtilisateurCode();

    }

private validateTypeUtilisateurLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedTypeUtilisateur.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validTypeUtilisateurLibelle = false;
        } else {
            this.validTypeUtilisateurLibelle = true;
        }
    }
private validateTypeUtilisateurCode(){
        if (this.stringUtilService.isEmpty(this.selectedTypeUtilisateur.code)) {
            this.errorMessages.push('Code non valide');
            this.validTypeUtilisateurCode = false;
        } else {
            this.validTypeUtilisateurCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createTypeUtilisateurDialog  = false;
    this.setValidation(true);
}

// getters and setters

get typeUtilisateurs(): Array<TypeUtilisateurVo> {
    return this.typeUtilisateurService.typeUtilisateurs;
       }
set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
       }

 get selectedTypeUtilisateur():TypeUtilisateurVo {
           return this.typeUtilisateurService.selectedTypeUtilisateur;
       }
    set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
       }

   get createTypeUtilisateurDialog(): boolean {
           return this.typeUtilisateurService.createTypeUtilisateurDialog;

       }
    set createTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.createTypeUtilisateurDialog= value;
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

    get validTypeUtilisateurLibelle(): boolean {
    return this._validTypeUtilisateurLibelle;
    }

    set validTypeUtilisateurLibelle(value: boolean) {
    this._validTypeUtilisateurLibelle = value;
    }
    get validTypeUtilisateurCode(): boolean {
    return this._validTypeUtilisateurCode;
    }

    set validTypeUtilisateurCode(value: boolean) {
    this._validTypeUtilisateurCode = value;
    }


}
