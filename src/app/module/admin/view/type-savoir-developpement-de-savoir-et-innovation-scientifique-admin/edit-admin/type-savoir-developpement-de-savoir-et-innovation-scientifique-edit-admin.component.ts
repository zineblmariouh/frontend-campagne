import {Component, OnInit} from '@angular/core';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.service';
import {TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/TypeSavoirDeveloppementDeSavoirEtInnovationScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {TypeSavoirVo} from '../../../../../controller/model/TypeSavoir.model';
import {TypeSavoirService} from '../../../../../controller/service/TypeSavoir.service';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../../../../../controller/model/DeveloppementDeSavoirEtInnovationScientifique.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueService} from '../../../../../controller/service/DeveloppementDeSavoirEtInnovationScientifique.service';

@Component({
  selector: 'app-type-savoir-developpement-de-savoir-et-innovation-scientifique-edit-admin',
  templateUrl: './type-savoir-developpement-de-savoir-et-innovation-scientifique-edit-admin.component.html',
  styleUrls: ['./type-savoir-developpement-de-savoir-et-innovation-scientifique-edit-admin.component.css']
})
export class TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private typeSavoirService: TypeSavoirService
 ,       private developpementDeSavoirEtInnovationScientifiqueService: DeveloppementDeSavoirEtInnovationScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
    this.developpementDeSavoirEtInnovationScientifiqueService.findAll().subscribe((data) => this.developpementDeSavoirEtInnovationScientifiques = data);
    this.selectedTypeSavoir = new TypeSavoirVo();
    this.typeSavoirService.findAll().subscribe((data) => this.typeSavoirs = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.edit().subscribe(typeSavoirDeveloppementDeSavoirEtInnovationScientifique=>{
    const myIndex = this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques.findIndex(e => e.id === this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique.id);
    this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques[myIndex] = this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
    this.editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = false;
    this.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = new TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreatetypeSavoir(typeSavoir: string) {
                      const isPermistted = await this.roleService.isPermitted('TypeSavoir', 'add');
                       if(isPermistted){
         this.selectedTypeSavoir = new TypeSavoirVo();
        this.createTypeSavoirDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedeveloppementDeSavoirEtInnovationScientifique(developpementDeSavoirEtInnovationScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DeveloppementDeSavoirEtInnovationScientifique', 'add');
                       if(isPermistted){
         this.selectedDeveloppementDeSavoirEtInnovationScientifique = new DeveloppementDeSavoirEtInnovationScientifiqueVo();
        this.createDeveloppementDeSavoirEtInnovationScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog  = false;
}

// getters and setters

get typeSavoirDeveloppementDeSavoirEtInnovationScientifiques(): Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo> {
    return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques;
       }
set typeSavoirDeveloppementDeSavoirEtInnovationScientifiques(value: Array<TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.typeSavoirDeveloppementDeSavoirEtInnovationScientifiques = value;
       }

 get selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(): TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique;
       }
    set selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique(value: TypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.selectedTypeSavoirDeveloppementDeSavoirEtInnovationScientifique = value;
       }

   get editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog;

       }
    set editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.typeSavoirDeveloppementDeSavoirEtInnovationScientifiqueService.editTypeSavoirDeveloppementDeSavoirEtInnovationScientifiqueDialog = value;
       }

       get selectedTypeSavoir(): TypeSavoirVo {
           return this.typeSavoirService.selectedTypeSavoir;
       }
      set selectedTypeSavoir(value: TypeSavoirVo) {
        this.typeSavoirService.selectedTypeSavoir = value;
       }
       get typeSavoirs(): Array<TypeSavoirVo> {
           return this.typeSavoirService.typeSavoirs;
       }
       set typeSavoirs(value: Array<TypeSavoirVo>) {
        this.typeSavoirService.typeSavoirs = value;
       }
       get createTypeSavoirDialog(): boolean {
           return this.typeSavoirService.createTypeSavoirDialog;
       }
      set createTypeSavoirDialog(value: boolean) {
        this.typeSavoirService.createTypeSavoirDialog= value;
       }
       get selectedDeveloppementDeSavoirEtInnovationScientifique(): DeveloppementDeSavoirEtInnovationScientifiqueVo {
           return this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique;
       }
      set selectedDeveloppementDeSavoirEtInnovationScientifique(value: DeveloppementDeSavoirEtInnovationScientifiqueVo) {
        this.developpementDeSavoirEtInnovationScientifiqueService.selectedDeveloppementDeSavoirEtInnovationScientifique = value;
       }
       get developpementDeSavoirEtInnovationScientifiques(): Array<DeveloppementDeSavoirEtInnovationScientifiqueVo> {
           return this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques;
       }
       set developpementDeSavoirEtInnovationScientifiques(value: Array<DeveloppementDeSavoirEtInnovationScientifiqueVo>) {
        this.developpementDeSavoirEtInnovationScientifiqueService.developpementDeSavoirEtInnovationScientifiques = value;
       }
       get createDeveloppementDeSavoirEtInnovationScientifiqueDialog(): boolean {
           return this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog;
       }
      set createDeveloppementDeSavoirEtInnovationScientifiqueDialog(value: boolean) {
        this.developpementDeSavoirEtInnovationScientifiqueService.createDeveloppementDeSavoirEtInnovationScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
