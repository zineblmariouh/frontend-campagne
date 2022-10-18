import {Component, OnInit, Input} from '@angular/core';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-format-rencontre-create-admin',
  templateUrl: './format-rencontre-create-admin.component.html',
  styleUrls: ['./format-rencontre-create-admin.component.css']
})
export class FormatRencontreCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validFormatRencontreLibelle = true;




constructor(private datePipe: DatePipe, private formatRencontreService: FormatRencontreService
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
    this.validFormatRencontreLibelle = value;
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
     this.formatRencontreService.save().subscribe(formatRencontre=>{
       this.formatRencontres.push({...formatRencontre});
       this.createFormatRencontreDialog = false;
       this.submitted = false;
       this.selectedFormatRencontre = new FormatRencontreVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateFormatRencontreLibelle();

    }

private validateFormatRencontreLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedFormatRencontre.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validFormatRencontreLibelle = false;
        } else {
            this.validFormatRencontreLibelle = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createFormatRencontreDialog  = false;
    this.setValidation(true);
}

// getters and setters

get formatRencontres(): Array<FormatRencontreVo> {
    return this.formatRencontreService.formatRencontres;
       }
set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }

 get selectedFormatRencontre():FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
    set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }

   get createFormatRencontreDialog(): boolean {
           return this.formatRencontreService.createFormatRencontreDialog;

       }
    set createFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.createFormatRencontreDialog= value;
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

    get validFormatRencontreLibelle(): boolean {
    return this._validFormatRencontreLibelle;
    }

    set validFormatRencontreLibelle(value: boolean) {
    this._validFormatRencontreLibelle = value;
    }


}
