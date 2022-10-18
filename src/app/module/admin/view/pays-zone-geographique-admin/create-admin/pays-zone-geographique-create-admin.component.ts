import {Component, OnInit, Input} from '@angular/core';
import {PaysZoneGeographiqueService} from '../../../../../controller/service/PaysZoneGeographique.service';
import {PaysZoneGeographiqueVo} from '../../../../../controller/model/PaysZoneGeographique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {PaysVo} from '../../../../../controller/model/Pays.model';
import {PaysService} from '../../../../../controller/service/Pays.service';
import {ZoneGeographiqueVo} from '../../../../../controller/model/ZoneGeographique.model';
import {ZoneGeographiqueService} from '../../../../../controller/service/ZoneGeographique.service';
@Component({
  selector: 'app-pays-zone-geographique-create-admin',
  templateUrl: './pays-zone-geographique-create-admin.component.html',
  styleUrls: ['./pays-zone-geographique-create-admin.component.css']
})
export class PaysZoneGeographiqueCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validPaysLibelle = true;
    _validPaysCode = true;
    _validZoneGeographiqueLibelle = true;
    _validZoneGeographiqueCode = true;



constructor(private datePipe: DatePipe, private paysZoneGeographiqueService: PaysZoneGeographiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private paysService :PaysService
,       private zoneGeographiqueService :ZoneGeographiqueService
) {

}


// methods
ngOnInit(): void {

    this.selectedPays = new PaysVo();
    this.paysService.findAll().subscribe((data) => this.payss = data);
    this.selectedZoneGeographique = new ZoneGeographiqueVo();
    this.zoneGeographiqueService.findAll().subscribe((data) => this.zoneGeographiques = data);
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
     this.paysZoneGeographiqueService.save().subscribe(paysZoneGeographique=>{
       this.paysZoneGeographiques.push({...paysZoneGeographique});
       this.createPaysZoneGeographiqueDialog = false;
       this.submitted = false;
       this.selectedPaysZoneGeographique = new PaysZoneGeographiqueVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatezoneGeographique(zoneGeographique: string) {
                      const isPermistted = await this.roleService.isPermitted('ZoneGeographique', 'add');
                       if(isPermistted){
         this.selectedZoneGeographique = new ZoneGeographiqueVo();
        this.createZoneGeographiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatepays(pays: string) {
                      const isPermistted = await this.roleService.isPermitted('Pays', 'add');
                       if(isPermistted){
         this.selectedPays = new PaysVo();
        this.createPaysDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createPaysZoneGeographiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get paysZoneGeographiques(): Array<PaysZoneGeographiqueVo> {
    return this.paysZoneGeographiqueService.paysZoneGeographiques;
       }
set paysZoneGeographiques(value: Array<PaysZoneGeographiqueVo>) {
        this.paysZoneGeographiqueService.paysZoneGeographiques = value;
       }

 get selectedPaysZoneGeographique():PaysZoneGeographiqueVo {
           return this.paysZoneGeographiqueService.selectedPaysZoneGeographique;
       }
    set selectedPaysZoneGeographique(value: PaysZoneGeographiqueVo) {
        this.paysZoneGeographiqueService.selectedPaysZoneGeographique = value;
       }

   get createPaysZoneGeographiqueDialog(): boolean {
           return this.paysZoneGeographiqueService.createPaysZoneGeographiqueDialog;

       }
    set createPaysZoneGeographiqueDialog(value: boolean) {
        this.paysZoneGeographiqueService.createPaysZoneGeographiqueDialog= value;
       }

       get selectedZoneGeographique(): ZoneGeographiqueVo {
           return this.zoneGeographiqueService.selectedZoneGeographique;
       }
      set selectedZoneGeographique(value: ZoneGeographiqueVo) {
        this.zoneGeographiqueService.selectedZoneGeographique = value;
       }
       get zoneGeographiques(): Array<ZoneGeographiqueVo> {
           return this.zoneGeographiqueService.zoneGeographiques;
       }
       set zoneGeographiques(value: Array<ZoneGeographiqueVo>) {
        this.zoneGeographiqueService.zoneGeographiques = value;
       }
       get createZoneGeographiqueDialog(): boolean {
           return this.zoneGeographiqueService.createZoneGeographiqueDialog;
       }
      set createZoneGeographiqueDialog(value: boolean) {
        this.zoneGeographiqueService.createZoneGeographiqueDialog= value;
       }
       get selectedPays(): PaysVo {
           return this.paysService.selectedPays;
       }
      set selectedPays(value: PaysVo) {
        this.paysService.selectedPays = value;
       }
       get payss(): Array<PaysVo> {
           return this.paysService.payss;
       }
       set payss(value: Array<PaysVo>) {
        this.paysService.payss = value;
       }
       get createPaysDialog(): boolean {
           return this.paysService.createPaysDialog;
       }
      set createPaysDialog(value: boolean) {
        this.paysService.createPaysDialog= value;
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


    get validPaysLibelle(): boolean {
    return this._validPaysLibelle;
    }

    set validPaysLibelle(value: boolean) {
    this._validPaysLibelle = value;
    }
    get validPaysCode(): boolean {
    return this._validPaysCode;
    }

    set validPaysCode(value: boolean) {
    this._validPaysCode = value;
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
