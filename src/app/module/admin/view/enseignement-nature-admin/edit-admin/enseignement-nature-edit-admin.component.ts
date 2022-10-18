import {Component, OnInit} from '@angular/core';
import {EnseignementNatureService} from '../../../../../controller/service/EnseignementNature.service';
import {EnseignementNatureVo} from '../../../../../controller/model/EnseignementNature.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {NatureEnseignementVo} from '../../../../../controller/model/NatureEnseignement.model';
import {NatureEnseignementService} from '../../../../../controller/service/NatureEnseignement.service';

@Component({
  selector: 'app-enseignement-nature-edit-admin',
  templateUrl: './enseignement-nature-edit-admin.component.html',
  styleUrls: ['./enseignement-nature-edit-admin.component.css']
})
export class EnseignementNatureEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private enseignementNatureService: EnseignementNatureService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enseignementService: EnseignementService
 ,       private natureEnseignementService: NatureEnseignementService
) {
}

// methods
ngOnInit(): void {
    this.selectedNatureEnseignement = new NatureEnseignementVo();
    this.natureEnseignementService.findAll().subscribe((data) => this.natureEnseignements = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.enseignementNatureService.edit().subscribe(enseignementNature=>{
    const myIndex = this.enseignementNatures.findIndex(e => e.id === this.selectedEnseignementNature.id);
    this.enseignementNatures[myIndex] = this.selectedEnseignementNature;
    this.editEnseignementNatureDialog = false;
    this.selectedEnseignementNature = new EnseignementNatureVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatenatureEnseignement(natureEnseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('NatureEnseignement', 'add');
                       if(isPermistted){
         this.selectedNatureEnseignement = new NatureEnseignementVo();
        this.createNatureEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreateenseignement(enseignement: string) {
                      const isPermistted = await this.roleService.isPermitted('Enseignement', 'add');
                       if(isPermistted){
         this.selectedEnseignement = new EnseignementVo();
        this.createEnseignementDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editEnseignementNatureDialog  = false;
}

// getters and setters

get enseignementNatures(): Array<EnseignementNatureVo> {
    return this.enseignementNatureService.enseignementNatures;
       }
set enseignementNatures(value: Array<EnseignementNatureVo>) {
        this.enseignementNatureService.enseignementNatures = value;
       }

 get selectedEnseignementNature(): EnseignementNatureVo {
           return this.enseignementNatureService.selectedEnseignementNature;
       }
    set selectedEnseignementNature(value: EnseignementNatureVo) {
        this.enseignementNatureService.selectedEnseignementNature = value;
       }

   get editEnseignementNatureDialog(): boolean {
           return this.enseignementNatureService.editEnseignementNatureDialog;

       }
    set editEnseignementNatureDialog(value: boolean) {
        this.enseignementNatureService.editEnseignementNatureDialog = value;
       }

       get selectedNatureEnseignement(): NatureEnseignementVo {
           return this.natureEnseignementService.selectedNatureEnseignement;
       }
      set selectedNatureEnseignement(value: NatureEnseignementVo) {
        this.natureEnseignementService.selectedNatureEnseignement = value;
       }
       get natureEnseignements(): Array<NatureEnseignementVo> {
           return this.natureEnseignementService.natureEnseignements;
       }
       set natureEnseignements(value: Array<NatureEnseignementVo>) {
        this.natureEnseignementService.natureEnseignements = value;
       }
       get createNatureEnseignementDialog(): boolean {
           return this.natureEnseignementService.createNatureEnseignementDialog;
       }
      set createNatureEnseignementDialog(value: boolean) {
        this.natureEnseignementService.createNatureEnseignementDialog= value;
       }
       get selectedEnseignement(): EnseignementVo {
           return this.enseignementService.selectedEnseignement;
       }
      set selectedEnseignement(value: EnseignementVo) {
        this.enseignementService.selectedEnseignement = value;
       }
       get enseignements(): Array<EnseignementVo> {
           return this.enseignementService.enseignements;
       }
       set enseignements(value: Array<EnseignementVo>) {
        this.enseignementService.enseignements = value;
       }
       get createEnseignementDialog(): boolean {
           return this.enseignementService.createEnseignementDialog;
       }
      set createEnseignementDialog(value: boolean) {
        this.enseignementService.createEnseignementDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
