import {Component, OnInit, Input} from '@angular/core';
import {CommunauteSavoirEncadrementDoctorantService} from '../../../../../controller/service/CommunauteSavoirEncadrementDoctorant.service';
import {CommunauteSavoirEncadrementDoctorantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from '../../../../../controller/service/StringUtil.service';


import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
@Component({
  selector: 'app-communaute-savoir-encadrement-doctorant-create-admin',
  templateUrl: './communaute-savoir-encadrement-doctorant-create-admin.component.html',
  styleUrls: ['./communaute-savoir-encadrement-doctorant-create-admin.component.css']
})
export class CommunauteSavoirEncadrementDoctorantCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    _validCommunauteSavoirLibelle = true;
    _validCommunauteSavoirCode = true;



constructor(private datePipe: DatePipe, private communauteSavoirEncadrementDoctorantService: CommunauteSavoirEncadrementDoctorantService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private communauteSavoirService :CommunauteSavoirService
,       private encadrementDoctorantService :EncadrementDoctorantService
) {

}


// methods
ngOnInit(): void {

    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
    this.encadrementDoctorantService.findAll().subscribe((data) => this.encadrementDoctorants = data);
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
     this.communauteSavoirEncadrementDoctorantService.save().subscribe(communauteSavoirEncadrementDoctorant=>{
       this.communauteSavoirEncadrementDoctorants.push({...communauteSavoirEncadrementDoctorant});
       this.createCommunauteSavoirEncadrementDoctorantDialog = false;
       this.submitted = false;
       this.selectedCommunauteSavoirEncadrementDoctorant = new CommunauteSavoirEncadrementDoctorantVo();


    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
              public async openCreatecommunauteSavoir(communauteSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('CommunauteSavoir', 'add');
                       if(isPermistted){
         this.selectedCommunauteSavoir = new CommunauteSavoirVo();
        this.createCommunauteSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateencadrementDoctorant(encadrementDoctorant: string) {
                      const isPermistted = await this.roleService.isPermitted('EncadrementDoctorant', 'add');
                       if(isPermistted){
         this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
        this.createEncadrementDoctorantDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideCreateDialog(){
    this.createCommunauteSavoirEncadrementDoctorantDialog  = false;
    this.setValidation(true);
}

// getters and setters

get communauteSavoirEncadrementDoctorants(): Array<CommunauteSavoirEncadrementDoctorantVo> {
    return this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorants;
       }
set communauteSavoirEncadrementDoctorants(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
        this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorants = value;
       }

 get selectedCommunauteSavoirEncadrementDoctorant():CommunauteSavoirEncadrementDoctorantVo {
           return this.communauteSavoirEncadrementDoctorantService.selectedCommunauteSavoirEncadrementDoctorant;
       }
    set selectedCommunauteSavoirEncadrementDoctorant(value: CommunauteSavoirEncadrementDoctorantVo) {
        this.communauteSavoirEncadrementDoctorantService.selectedCommunauteSavoirEncadrementDoctorant = value;
       }

   get createCommunauteSavoirEncadrementDoctorantDialog(): boolean {
           return this.communauteSavoirEncadrementDoctorantService.createCommunauteSavoirEncadrementDoctorantDialog;

       }
    set createCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this.communauteSavoirEncadrementDoctorantService.createCommunauteSavoirEncadrementDoctorantDialog= value;
       }

       get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
      set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }
       get communauteSavoirs(): Array<CommunauteSavoirVo> {
           return this.communauteSavoirService.communauteSavoirs;
       }
       set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }
       get createCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.createCommunauteSavoirDialog;
       }
      set createCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.createCommunauteSavoirDialog= value;
       }
       get selectedEncadrementDoctorant(): EncadrementDoctorantVo {
           return this.encadrementDoctorantService.selectedEncadrementDoctorant;
       }
      set selectedEncadrementDoctorant(value: EncadrementDoctorantVo) {
        this.encadrementDoctorantService.selectedEncadrementDoctorant = value;
       }
       get encadrementDoctorants(): Array<EncadrementDoctorantVo> {
           return this.encadrementDoctorantService.encadrementDoctorants;
       }
       set encadrementDoctorants(value: Array<EncadrementDoctorantVo>) {
        this.encadrementDoctorantService.encadrementDoctorants = value;
       }
       get createEncadrementDoctorantDialog(): boolean {
           return this.encadrementDoctorantService.createEncadrementDoctorantDialog;
       }
      set createEncadrementDoctorantDialog(value: boolean) {
        this.encadrementDoctorantService.createEncadrementDoctorantDialog= value;
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


    get validCommunauteSavoirLibelle(): boolean {
    return this._validCommunauteSavoirLibelle;
    }

    set validCommunauteSavoirLibelle(value: boolean) {
    this._validCommunauteSavoirLibelle = value;
    }
    get validCommunauteSavoirCode(): boolean {
    return this._validCommunauteSavoirCode;
    }

    set validCommunauteSavoirCode(value: boolean) {
    this._validCommunauteSavoirCode = value;
    }

}
