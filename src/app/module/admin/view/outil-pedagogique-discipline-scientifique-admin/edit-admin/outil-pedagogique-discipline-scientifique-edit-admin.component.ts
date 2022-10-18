import {Component, OnInit} from '@angular/core';
import {OutilPedagogiqueDisciplineScientifiqueService} from '../../../../../controller/service/OutilPedagogiqueDisciplineScientifique.service';
import {OutilPedagogiqueDisciplineScientifiqueVo} from '../../../../../controller/model/OutilPedagogiqueDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {OutilPedagogiqueVo} from '../../../../../controller/model/OutilPedagogique.model';
import {OutilPedagogiqueService} from '../../../../../controller/service/OutilPedagogique.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-outil-pedagogique-discipline-scientifique-edit-admin',
  templateUrl: './outil-pedagogique-discipline-scientifique-edit-admin.component.html',
  styleUrls: ['./outil-pedagogique-discipline-scientifique-edit-admin.component.css']
})
export class OutilPedagogiqueDisciplineScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private outilPedagogiqueDisciplineScientifiqueService: OutilPedagogiqueDisciplineScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private outilPedagogiqueService: OutilPedagogiqueService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedOutilPedagogique = new OutilPedagogiqueVo();
    this.outilPedagogiqueService.findAll().subscribe((data) => this.outilPedagogiques = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.outilPedagogiqueDisciplineScientifiqueService.edit().subscribe(outilPedagogiqueDisciplineScientifique=>{
    const myIndex = this.outilPedagogiqueDisciplineScientifiques.findIndex(e => e.id === this.selectedOutilPedagogiqueDisciplineScientifique.id);
    this.outilPedagogiqueDisciplineScientifiques[myIndex] = this.selectedOutilPedagogiqueDisciplineScientifique;
    this.editOutilPedagogiqueDisciplineScientifiqueDialog = false;
    this.selectedOutilPedagogiqueDisciplineScientifique = new OutilPedagogiqueDisciplineScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreateoutilPedagogique(outilPedagogique: string) {
                      const isPermistted = await this.roleService.isPermitted('OutilPedagogique', 'add');
                       if(isPermistted){
         this.selectedOutilPedagogique = new OutilPedagogiqueVo();
        this.createOutilPedagogiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
              public async openCreatedisciplineScientifique(disciplineScientifique: string) {
                      const isPermistted = await this.roleService.isPermitted('DisciplineScientifique', 'add');
                       if(isPermistted){
         this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
        this.createDisciplineScientifiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editOutilPedagogiqueDisciplineScientifiqueDialog  = false;
}

// getters and setters

get outilPedagogiqueDisciplineScientifiques(): Array<OutilPedagogiqueDisciplineScientifiqueVo> {
    return this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiques;
       }
set outilPedagogiqueDisciplineScientifiques(value: Array<OutilPedagogiqueDisciplineScientifiqueVo>) {
        this.outilPedagogiqueDisciplineScientifiqueService.outilPedagogiqueDisciplineScientifiques = value;
       }

 get selectedOutilPedagogiqueDisciplineScientifique(): OutilPedagogiqueDisciplineScientifiqueVo {
           return this.outilPedagogiqueDisciplineScientifiqueService.selectedOutilPedagogiqueDisciplineScientifique;
       }
    set selectedOutilPedagogiqueDisciplineScientifique(value: OutilPedagogiqueDisciplineScientifiqueVo) {
        this.outilPedagogiqueDisciplineScientifiqueService.selectedOutilPedagogiqueDisciplineScientifique = value;
       }

   get editOutilPedagogiqueDisciplineScientifiqueDialog(): boolean {
           return this.outilPedagogiqueDisciplineScientifiqueService.editOutilPedagogiqueDisciplineScientifiqueDialog;

       }
    set editOutilPedagogiqueDisciplineScientifiqueDialog(value: boolean) {
        this.outilPedagogiqueDisciplineScientifiqueService.editOutilPedagogiqueDisciplineScientifiqueDialog = value;
       }

       get selectedOutilPedagogique(): OutilPedagogiqueVo {
           return this.outilPedagogiqueService.selectedOutilPedagogique;
       }
      set selectedOutilPedagogique(value: OutilPedagogiqueVo) {
        this.outilPedagogiqueService.selectedOutilPedagogique = value;
       }
       get outilPedagogiques(): Array<OutilPedagogiqueVo> {
           return this.outilPedagogiqueService.outilPedagogiques;
       }
       set outilPedagogiques(value: Array<OutilPedagogiqueVo>) {
        this.outilPedagogiqueService.outilPedagogiques = value;
       }
       get createOutilPedagogiqueDialog(): boolean {
           return this.outilPedagogiqueService.createOutilPedagogiqueDialog;
       }
      set createOutilPedagogiqueDialog(value: boolean) {
        this.outilPedagogiqueService.createOutilPedagogiqueDialog= value;
       }
       get selectedDisciplineScientifique(): DisciplineScientifiqueVo {
           return this.disciplineScientifiqueService.selectedDisciplineScientifique;
       }
      set selectedDisciplineScientifique(value: DisciplineScientifiqueVo) {
        this.disciplineScientifiqueService.selectedDisciplineScientifique = value;
       }
       get disciplineScientifiques(): Array<DisciplineScientifiqueVo> {
           return this.disciplineScientifiqueService.disciplineScientifiques;
       }
       set disciplineScientifiques(value: Array<DisciplineScientifiqueVo>) {
        this.disciplineScientifiqueService.disciplineScientifiques = value;
       }
       get createDisciplineScientifiqueDialog(): boolean {
           return this.disciplineScientifiqueService.createDisciplineScientifiqueDialog;
       }
      set createDisciplineScientifiqueDialog(value: boolean) {
        this.disciplineScientifiqueService.createDisciplineScientifiqueDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
