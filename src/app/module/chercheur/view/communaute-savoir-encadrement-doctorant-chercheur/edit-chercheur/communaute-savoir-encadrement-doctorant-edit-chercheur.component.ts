import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirEncadrementDoctorantService} from '../../../../../controller/service/CommunauteSavoirEncadrementDoctorant.service';
import {CommunauteSavoirEncadrementDoctorantVo} from '../../../../../controller/model/CommunauteSavoirEncadrementDoctorant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EncadrementDoctorantVo} from '../../../../../controller/model/EncadrementDoctorant.model';
import {EncadrementDoctorantService} from '../../../../../controller/service/EncadrementDoctorant.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';

@Component({
  selector: 'app-communaute-savoir-encadrement-doctorant-edit-chercheur',
  templateUrl: './communaute-savoir-encadrement-doctorant-edit-chercheur.component.html',
  styleUrls: ['./communaute-savoir-encadrement-doctorant-edit-chercheur.component.css']
})
export class CommunauteSavoirEncadrementDoctorantEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirEncadrementDoctorantService: CommunauteSavoirEncadrementDoctorantService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private encadrementDoctorantService: EncadrementDoctorantService
 ,       private communauteSavoirService: CommunauteSavoirService
) {
}

// methods
ngOnInit(): void {
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();
    this.communauteSavoirService.findAll().subscribe((data) => this.communauteSavoirs = data);
    this.selectedEncadrementDoctorant = new EncadrementDoctorantVo();
    this.encadrementDoctorantService.findAll().subscribe((data) => this.encadrementDoctorants = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.communauteSavoirEncadrementDoctorantService.edit().subscribe(communauteSavoirEncadrementDoctorant=>{
    const myIndex = this.communauteSavoirEncadrementDoctorants.findIndex(e => e.id === this.selectedCommunauteSavoirEncadrementDoctorant.id);
    this.communauteSavoirEncadrementDoctorants[myIndex] = this.selectedCommunauteSavoirEncadrementDoctorant;
    this.editCommunauteSavoirEncadrementDoctorantDialog = false;
    this.selectedCommunauteSavoirEncadrementDoctorant = new CommunauteSavoirEncadrementDoctorantVo();


    }, error => {
        console.log(error);
    });

}

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

hideEditDialog(){
    this.editCommunauteSavoirEncadrementDoctorantDialog  = false;
}

// getters and setters

get communauteSavoirEncadrementDoctorants(): Array<CommunauteSavoirEncadrementDoctorantVo> {
    return this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorants;
       }
set communauteSavoirEncadrementDoctorants(value: Array<CommunauteSavoirEncadrementDoctorantVo>) {
        this.communauteSavoirEncadrementDoctorantService.communauteSavoirEncadrementDoctorants = value;
       }

 get selectedCommunauteSavoirEncadrementDoctorant(): CommunauteSavoirEncadrementDoctorantVo {
           return this.communauteSavoirEncadrementDoctorantService.selectedCommunauteSavoirEncadrementDoctorant;
       }
    set selectedCommunauteSavoirEncadrementDoctorant(value: CommunauteSavoirEncadrementDoctorantVo) {
        this.communauteSavoirEncadrementDoctorantService.selectedCommunauteSavoirEncadrementDoctorant = value;
       }

   get editCommunauteSavoirEncadrementDoctorantDialog(): boolean {
           return this.communauteSavoirEncadrementDoctorantService.editCommunauteSavoirEncadrementDoctorantDialog;

       }
    set editCommunauteSavoirEncadrementDoctorantDialog(value: boolean) {
        this.communauteSavoirEncadrementDoctorantService.editCommunauteSavoirEncadrementDoctorantDialog = value;
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
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
