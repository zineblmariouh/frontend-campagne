import {Component, OnInit, Input} from '@angular/core';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


@Component({
  selector: 'app-zone-geographique-create-admin',
  templateUrl: './zone-geographique-create-admin.component.html',
  styleUrls: ['./zone-geographique-create-admin.component.css']
})
export class ZoneGeographiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();

   _validZoneGeographiqueLibelle = true;
   _validZoneGeographiqueCode = true;




constructor(private datePipe: DatePipe, private zoneGeographiqueService: ZoneGeographiqueService
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
    this.validZoneGeographiqueLibelle = value;
    this.validZoneGeographiqueCode = value;
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
     this.zoneGeographiqueService.save().subscribe(zoneGeographique=>{
       this.zoneGeographiques.push({...zoneGeographique});
       this.createZoneGeographiqueDialog = false;
       this.submitted = false;
       this.selectedZoneGeographique = new ZoneGeographiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();
this.validateZoneGeographiqueLibelle();
this.validateZoneGeographiqueCode();

    }

private validateZoneGeographiqueLibelle(){
        if (this.stringUtilService.isEmpty(this.selectedZoneGeographique.libelle)) {
            this.errorMessages.push('Libelle non valide');
            this.validZoneGeographiqueLibelle = false;
        } else {
            this.validZoneGeographiqueLibelle = true;
        }
    }
private validateZoneGeographiqueCode(){
        if (this.stringUtilService.isEmpty(this.selectedZoneGeographique.code)) {
            this.errorMessages.push('Code non valide');
            this.validZoneGeographiqueCode = false;
        } else {
            this.validZoneGeographiqueCode = true;
        }
    }












//openPopup
// methods

hideCreateDialog(){
    this.createZoneGeographiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get zoneGeographiques(): Array<ZoneGeographiqueVo> {
    return this.zoneGeographiqueService.zoneGeographiques;
       }
set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }

 get selectedZoneGeographique():ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
    set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }

   get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;

       }
    set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
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

    get validZoneGeographiqueLibelle(): boolean {
    return this._validZoneGeographiqueLibelle;
    }

    set validZoneGeographiqueLibelle(value: boolean) {
    this._validZoneGeographiqueLibelle = value;
    }
    get validZoneGeographiqueCode(): boolean {
    return this._validZoneGeographiqueCode;
    }

    set validZoneGeographiqueCode(value: boolean) {
    this._validZoneGeographiqueCode = value;
    }


}
