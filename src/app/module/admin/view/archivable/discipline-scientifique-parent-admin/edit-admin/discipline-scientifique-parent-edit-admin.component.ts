import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueParentService} from '../../../../../controller/service/DisciplineScientifiqueParent.service';
import {DisciplineScientifiqueParentVo} from '../../../../../controller/model/DisciplineScientifiqueParent.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-discipline-scientifique-parent-edit-admin',
  templateUrl: './discipline-scientifique-parent-edit-admin.component.html',
  styleUrls: ['./discipline-scientifique-parent-edit-admin.component.css']
})
export class DisciplineScientifiqueParentEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueParentService: DisciplineScientifiqueParentService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
) {
}

// methods
ngOnInit(): void {
}

public edit(){
this.editWithShowOption(false);
}
public editWithShowOption(showList: boolean){
            this.selectedDisciplineScientifiqueParent.dateArchivage = DateUtils.toDate(this.selectedDisciplineScientifiqueParent.dateArchivage);
            this.selectedDisciplineScientifiqueParent.dateCreation = DateUtils.toDate(this.selectedDisciplineScientifiqueParent.dateCreation);
    this.disciplineScientifiqueParentService.edit().subscribe(disciplineScientifiqueParent=>{
    const myIndex = this.disciplineScientifiqueParents.findIndex(e => e.id === this.selectedDisciplineScientifiqueParent.id);
    this.disciplineScientifiqueParents[myIndex] = this.selectedDisciplineScientifiqueParent;
    this.editDisciplineScientifiqueParentDialog = false;
    this.selectedDisciplineScientifiqueParent = new DisciplineScientifiqueParentVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editDisciplineScientifiqueParentDialog  = false;
}

// getters and setters

get disciplineScientifiqueParents(): Array<DisciplineScientifiqueParentVo> {
    return this.disciplineScientifiqueParentService.disciplineScientifiqueParents;
       }
set disciplineScientifiqueParents(value: Array<DisciplineScientifiqueParentVo>) {
        this.disciplineScientifiqueParentService.disciplineScientifiqueParents = value;
       }

 get selectedDisciplineScientifiqueParent(): DisciplineScientifiqueParentVo {
           return this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent;
       }
    set selectedDisciplineScientifiqueParent(value: DisciplineScientifiqueParentVo) {
        this.disciplineScientifiqueParentService.selectedDisciplineScientifiqueParent = value;
       }

   get editDisciplineScientifiqueParentDialog(): boolean {
           return this.disciplineScientifiqueParentService.editDisciplineScientifiqueParentDialog;

       }
    set editDisciplineScientifiqueParentDialog(value: boolean) {
        this.disciplineScientifiqueParentService.editDisciplineScientifiqueParentDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
