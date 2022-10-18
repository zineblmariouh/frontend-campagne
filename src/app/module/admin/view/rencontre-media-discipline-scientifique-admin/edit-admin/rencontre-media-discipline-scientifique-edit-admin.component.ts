import {Component, OnInit} from '@angular/core';
import {RencontreMediaDisciplineScientifiqueService} from '../../../../../controller/service/RencontreMediaDisciplineScientifique.service';
import {RencontreMediaDisciplineScientifiqueVo} from '../../../../../controller/model/RencontreMediaDisciplineScientifique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';

import {RencontreMediaVo} from '../../../../../controller/model/RencontreMedia.model';
import {RencontreMediaService} from '../../../../../controller/service/RencontreMedia.service';
import {DisciplineScientifiqueVo} from '../../../../../controller/model/DisciplineScientifique.model';
import {DisciplineScientifiqueService} from '../../../../../controller/service/DisciplineScientifique.service';

@Component({
  selector: 'app-rencontre-media-discipline-scientifique-edit-admin',
  templateUrl: './rencontre-media-discipline-scientifique-edit-admin.component.html',
  styleUrls: ['./rencontre-media-discipline-scientifique-edit-admin.component.css']
})
export class RencontreMediaDisciplineScientifiqueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private rencontreMediaDisciplineScientifiqueService: RencontreMediaDisciplineScientifiqueService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 ,       private rencontreMediaService: RencontreMediaService
 ,       private disciplineScientifiqueService: DisciplineScientifiqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedRencontreMedia = new RencontreMediaVo();
    this.rencontreMediaService.findAll().subscribe((data) => this.rencontreMedias = data);
    this.selectedDisciplineScientifique = new DisciplineScientifiqueVo();
    this.disciplineScientifiqueService.findAll().subscribe((data) => this.disciplineScientifiques = data);
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
    this.rencontreMediaDisciplineScientifiqueService.edit().subscribe(rencontreMediaDisciplineScientifique=>{
    const myIndex = this.rencontreMediaDisciplineScientifiques.findIndex(e => e.id === this.selectedRencontreMediaDisciplineScientifique.id);
    this.rencontreMediaDisciplineScientifiques[myIndex] = this.selectedRencontreMediaDisciplineScientifique;
    this.editRencontreMediaDisciplineScientifiqueDialog = false;
    this.selectedRencontreMediaDisciplineScientifique = new RencontreMediaDisciplineScientifiqueVo();


    }, error => {
        console.log(error);
    });

}

              public async openCreaterencontreMedia(rencontreMedia: string) {
                      const isPermistted = await this.roleService.isPermitted('RencontreMedia', 'add');
                       if(isPermistted){
         this.selectedRencontreMedia = new RencontreMediaVo();
        this.createRencontreMediaDialog = true;
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
    this.editRencontreMediaDisciplineScientifiqueDialog  = false;
}

// getters and setters

get rencontreMediaDisciplineScientifiques(): Array<RencontreMediaDisciplineScientifiqueVo> {
    return this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiques;
       }
set rencontreMediaDisciplineScientifiques(value: Array<RencontreMediaDisciplineScientifiqueVo>) {
        this.rencontreMediaDisciplineScientifiqueService.rencontreMediaDisciplineScientifiques = value;
       }

 get selectedRencontreMediaDisciplineScientifique(): RencontreMediaDisciplineScientifiqueVo {
           return this.rencontreMediaDisciplineScientifiqueService.selectedRencontreMediaDisciplineScientifique;
       }
    set selectedRencontreMediaDisciplineScientifique(value: RencontreMediaDisciplineScientifiqueVo) {
        this.rencontreMediaDisciplineScientifiqueService.selectedRencontreMediaDisciplineScientifique = value;
       }

   get editRencontreMediaDisciplineScientifiqueDialog(): boolean {
           return this.rencontreMediaDisciplineScientifiqueService.editRencontreMediaDisciplineScientifiqueDialog;

       }
    set editRencontreMediaDisciplineScientifiqueDialog(value: boolean) {
        this.rencontreMediaDisciplineScientifiqueService.editRencontreMediaDisciplineScientifiqueDialog = value;
       }

       get selectedRencontreMedia(): RencontreMediaVo {
           return this.rencontreMediaService.selectedRencontreMedia;
       }
      set selectedRencontreMedia(value: RencontreMediaVo) {
        this.rencontreMediaService.selectedRencontreMedia = value;
       }
       get rencontreMedias(): Array<RencontreMediaVo> {
           return this.rencontreMediaService.rencontreMedias;
       }
       set rencontreMedias(value: Array<RencontreMediaVo>) {
        this.rencontreMediaService.rencontreMedias = value;
       }
       get createRencontreMediaDialog(): boolean {
           return this.rencontreMediaService.createRencontreMediaDialog;
       }
      set createRencontreMediaDialog(value: boolean) {
        this.rencontreMediaService.createRencontreMediaDialog= value;
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
