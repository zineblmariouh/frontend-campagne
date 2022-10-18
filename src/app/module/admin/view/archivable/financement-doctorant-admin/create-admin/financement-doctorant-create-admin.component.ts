import {Component, OnInit, Input} from '@angular/core';
import {FinancementDoctorantService} from '../../../../../controller/service/FinancementDoctorant.service';
import {FinancementDoctorantVo} from '../../../../../controller/model/FinancementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-financement-doctorant-create-admin',
  templateUrl: './financement-doctorant-create-admin.component.html',
  styleUrls: ['./financement-doctorant-create-admin.component.css']
})
export class FinancementDoctorantCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validFinancementDoctorantLibelle = true;
   _validFinancementDoctorantCode = true;




constructor(private datePipe: DatePipe, private financementDoctorantService: FinancementDoctorantService
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
    this.validFinancementDoctorantLibelle = value;
    this.validFinancementDoctorantCode = value;
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
     this.financementDoctorantService.save().subscribe(financementDoctorant=>{
       this.financementDoctorants.push({...financementDoctorant});
       this.createFinancementDoctorantDialog = false;
       this.submitted = false;
       this.selectedFinancementDoctorant = new FinancementDoctorantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateFinancementDoctorantLibelle();
this.validateFinancementDoctorantCode();

    }

private validateFinancementDoctorantLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedFinancementDoctorant.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validFinancementDoctorantLibelle = false;
        } else {
            this.validFinancementDoctorantLibelle = true;
        }
    }
private validateFinancementDoctorantCode(){
        if (this.stringUtilService.isEmpty(this.selectedFinancementDoctorant.code)) {
            this.errorMessages.push('Code non valide');
            this.validFinancementDoctorantCode = false;
        } else {
            this.validFinancementDoctorantCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createFinancementDoctorantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get financementDoctorants(): Array<FinancementDoctorantVo> {
    return this.financementDoctorantService.financementDoctorants;
       }
set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this.financementDoctorantService.financementDoctorants = value;
       }

 get selectedFinancementDoctorant():FinancementDoctorantVo {
           return this.financementDoctorantService.selectedFinancementDoctorant;
       }
    set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this.financementDoctorantService.selectedFinancementDoctorant = value;
       }

   get createFinancementDoctorantDialog(): boolean {
           return this.financementDoctorantService.createFinancementDoctorantDialog;

       }
    set createFinancementDoctorantDialog(value: boolean) {
        this.financementDoctorantService.createFinancementDoctorantDialog= value;
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

    get validFinancementDoctorantLibelle(): boolean {
    return this._validFinancementDoctorantLibelle;
    }

    set validFinancementDoctorantLibelle(value: boolean) {
    this._validFinancementDoctorantLibelle = value;
    }
    get validFinancementDoctorantCode(): boolean {
    return this._validFinancementDoctorantCode;
    }

    set validFinancementDoctorantCode(value: boolean) {
    this._validFinancementDoctorantCode = value;
    }


}
