import {Component, OnInit, Input} from '@angular/core';
import {PubliqueCibleService} from '../../../../../controller/service/PubliqueCible.service';
import {PubliqueCibleVo} from '../../../../../controller/model/PubliqueCible.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-publique-cible-create-admin',
  templateUrl: './publique-cible-create-admin.component.html',
  styleUrls: ['./publique-cible-create-admin.component.css']
})
export class PubliqueCibleCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validPubliqueCibleLibelle = true;




constructor(private datePipe: DatePipe, private publiqueCibleService: PubliqueCibleService
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
    this.validPubliqueCibleLibelle = value;
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
     this.publiqueCibleService.save().subscribe(publiqueCible=>{
       this.publiqueCibles.push({...publiqueCible});
       this.createPubliqueCibleDialog = false;
       this.submitted = false;
       this.selectedPubliqueCible = new PubliqueCibleVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validatePubliqueCibleLibelle();

    }

private validatePubliqueCibleLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedPubliqueCible.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validPubliqueCibleLibelle = false;
        } else {
            this.validPubliqueCibleLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createPubliqueCibleDialog  = false;
    this.setValidation(true);
}

// getters and setters

get publiqueCibles(): Array<PubliqueCibleVo> {
    return this.publiqueCibleService.publiqueCibles;
       }
set publiqueCibles(value: Array<PubliqueCibleVo>) {
        this.publiqueCibleService.publiqueCibles = value;
       }

 get selectedPubliqueCible():PubliqueCibleVo {
           return this.publiqueCibleService.selectedPubliqueCible;
       }
    set selectedPubliqueCible(value: PubliqueCibleVo) {
        this.publiqueCibleService.selectedPubliqueCible = value;
       }

   get createPubliqueCibleDialog(): boolean {
           return this.publiqueCibleService.createPubliqueCibleDialog;

       }
    set createPubliqueCibleDialog(value: boolean) {
        this.publiqueCibleService.createPubliqueCibleDialog= value;
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

    get validPubliqueCibleLibelle(): boolean {
    return this._validPubliqueCibleLibelle;
    }

    set validPubliqueCibleLibelle(value: boolean) {
    this._validPubliqueCibleLibelle = value;
    }


}
