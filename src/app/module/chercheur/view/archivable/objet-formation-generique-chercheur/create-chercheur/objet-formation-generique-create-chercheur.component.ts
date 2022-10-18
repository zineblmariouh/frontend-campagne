import {Component, OnInit, Input} from '@angular/core';
import {ObjetFormationGeneriqueService} from '../../../../../controller/service/ObjetFormationGenerique.service';
import {ObjetFormationGeneriqueVo} from '../../../../../controller/model/ObjetFormationGenerique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-objet-formation-generique-create-chercheur',
  templateUrl: './objet-formation-generique-create-chercheur.component.html',
  styleUrls: ['./objet-formation-generique-create-chercheur.component.css']
})
export class ObjetFormationGeneriqueCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validObjetFormationGeneriqueLibelle = true;
   _validObjetFormationGeneriqueCode = true;




constructor(private datePipe: DatePipe, private objetFormationGeneriqueService: ObjetFormationGeneriqueService
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
    this.validObjetFormationGeneriqueLibelle = value;
    this.validObjetFormationGeneriqueCode = value;
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
     this.objetFormationGeneriqueService.save().subscribe(objetFormationGenerique=>{
       this.objetFormationGeneriques.push({...objetFormationGenerique});
       this.createObjetFormationGeneriqueDialog = false;
       this.submitted = false;
       this.selectedObjetFormationGenerique = new ObjetFormationGeneriqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateObjetFormationGeneriqueLibelle();
this.validateObjetFormationGeneriqueCode();

    }

private validateObjetFormationGeneriqueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedObjetFormationGenerique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validObjetFormationGeneriqueLibelle = false;
        } else {
            this.validObjetFormationGeneriqueLibelle = true;
        }
    }
private validateObjetFormationGeneriqueCode(){
        if (this.stringUtilService.isEmpty(this.selectedObjetFormationGenerique.code)) {
            this.errorMessages.push('Code non valide');
            this.validObjetFormationGeneriqueCode = false;
        } else {
            this.validObjetFormationGeneriqueCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createObjetFormationGeneriqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get objetFormationGeneriques(): Array<ObjetFormationGeneriqueVo> {
    return this.objetFormationGeneriqueService.objetFormationGeneriques;
       }
set objetFormationGeneriques(value: Array<ObjetFormationGeneriqueVo>) {
        this.objetFormationGeneriqueService.objetFormationGeneriques = value;
       }

 get selectedObjetFormationGenerique():ObjetFormationGeneriqueVo {
           return this.objetFormationGeneriqueService.selectedObjetFormationGenerique;
       }
    set selectedObjetFormationGenerique(value: ObjetFormationGeneriqueVo) {
        this.objetFormationGeneriqueService.selectedObjetFormationGenerique = value;
       }

   get createObjetFormationGeneriqueDialog(): boolean {
           return this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog;

       }
    set createObjetFormationGeneriqueDialog(value: boolean) {
        this.objetFormationGeneriqueService.createObjetFormationGeneriqueDialog= value;
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

    get validObjetFormationGeneriqueLibelle(): boolean {
    return this._validObjetFormationGeneriqueLibelle;
    }

    set validObjetFormationGeneriqueLibelle(value: boolean) {
    this._validObjetFormationGeneriqueLibelle = value;
    }
    get validObjetFormationGeneriqueCode(): boolean {
    return this._validObjetFormationGeneriqueCode;
    }

    set validObjetFormationGeneriqueCode(value: boolean) {
    this._validObjetFormationGeneriqueCode = value;
    }


}
