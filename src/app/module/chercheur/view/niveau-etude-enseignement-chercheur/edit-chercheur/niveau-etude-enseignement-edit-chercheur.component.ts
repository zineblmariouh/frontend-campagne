import {Component, OnInit} from '@angular/core';
import {NiveauEtudeEnseignementService} from '../../../../../controller/service/NiveauEtudeEnseignement.service';
import {NiveauEtudeEnseignementVo} from '../../../../../controller/model/NiveauEtudeEnseignement.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {EnseignementVo} from '../../../../../controller/model/Enseignement.model';
import {EnseignementService} from '../../../../../controller/service/Enseignement.service';
import {NiveauEtudeVo} from '../../../../../controller/model/NiveauEtude.model';
import {NiveauEtudeService} from '../../../../../controller/service/NiveauEtude.service';

@Component({
  selector: 'app-niveau-etude-enseignement-edit-chercheur',
  templateUrl: './niveau-etude-enseignement-edit-chercheur.component.html',
  styleUrls: ['./niveau-etude-enseignement-edit-chercheur.component.css']
})
export class NiveauEtudeEnseignementEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauEtudeEnseignementService: NiveauEtudeEnseignementService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private enseignementService: EnseignementService
 ,       private niveauEtudeService: NiveauEtudeService
) {
}

// methods
ngOnInit(): void {
    this.selectedNiveauEtude = new NiveauEtudeVo();
    this.niveauEtudeService.findAll().subscribe((data) => this.niveauEtudes = data);
    this.selectedEnseignement = new EnseignementVo();
    this.enseignementService.findAll().subscribe((data) => this.enseignements = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.niveauEtudeEnseignementService.edit().subscribe(niveauEtudeEnseignement=>{
    const myIndex = this.niveauEtudeEnseignements.findIndex(e => e.id === this.selectedNiveauEtudeEnseignement.id);
    this.niveauEtudeEnseignements[myIndex] = this.selectedNiveauEtudeEnseignement;
    this.editNiveauEtudeEnseignementDialog = false;
    this.selectedNiveauEtudeEnseignement = new NiveauEtudeEnseignementVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateniveauEtude(niveauEtude: string) {
                      const isPermistted = await this.roleService.isPermitted('NiveauEtude', 'add');
                       if(isPermistted){
         this.selectedNiveauEtude = new NiveauEtudeVo();
        this.createNiveauEtudeDialog = true;
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
    this.editNiveauEtudeEnseignementDialog  = false;
}

// getters and setters

get niveauEtudeEnseignements(): Array<NiveauEtudeEnseignementVo> {
    return this.niveauEtudeEnseignementService.niveauEtudeEnseignements;
       }
set niveauEtudeEnseignements(value: Array<NiveauEtudeEnseignementVo>) {
        this.niveauEtudeEnseignementService.niveauEtudeEnseignements = value;
       }

 get selectedNiveauEtudeEnseignement(): NiveauEtudeEnseignementVo {
           return this.niveauEtudeEnseignementService.selectedNiveauEtudeEnseignement;
       }
    set selectedNiveauEtudeEnseignement(value: NiveauEtudeEnseignementVo) {
        this.niveauEtudeEnseignementService.selectedNiveauEtudeEnseignement = value;
       }

   get editNiveauEtudeEnseignementDialog(): boolean {
           return this.niveauEtudeEnseignementService.editNiveauEtudeEnseignementDialog;

       }
    set editNiveauEtudeEnseignementDialog(value: boolean) {
        this.niveauEtudeEnseignementService.editNiveauEtudeEnseignementDialog = value;
       }

       get selectedNiveauEtude(): NiveauEtudeVo {
           return this.niveauEtudeService.selectedNiveauEtude;
       }
      set selectedNiveauEtude(value: NiveauEtudeVo) {
        this.niveauEtudeService.selectedNiveauEtude = value;
       }
       get niveauEtudes(): Array<NiveauEtudeVo> {
           return this.niveauEtudeService.niveauEtudes;
       }
       set niveauEtudes(value: Array<NiveauEtudeVo>) {
        this.niveauEtudeService.niveauEtudes = value;
       }
       get createNiveauEtudeDialog(): boolean {
           return this.niveauEtudeService.createNiveauEtudeDialog;
       }
      set createNiveauEtudeDialog(value: boolean) {
        this.niveauEtudeService.createNiveauEtudeDialog= value;
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
