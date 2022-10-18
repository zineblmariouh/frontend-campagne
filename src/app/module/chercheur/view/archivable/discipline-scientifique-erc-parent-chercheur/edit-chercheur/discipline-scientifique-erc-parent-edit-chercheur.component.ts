import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueErcParentService} from '../../../../../controller/service/DisciplineScientifiqueErcParent.service';
import {DisciplineScientifiqueErcParentVo} from '../../../../../controller/model/DisciplineScientifiqueErcParent.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-discipline-scientifique-erc-parent-edit-chercheur',
  templateUrl: './discipline-scientifique-erc-parent-edit-chercheur.component.html',
  styleUrls: ['./discipline-scientifique-erc-parent-edit-chercheur.component.css']
})
export class DisciplineScientifiqueErcParentEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private disciplineScientifiqueErcParentService: DisciplineScientifiqueErcParentService
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
            this.selectedDisciplineScientifiqueErcParent.dateArchivage = DateUtils.toDate(this.selectedDisciplineScientifiqueErcParent.dateArchivage);
            this.selectedDisciplineScientifiqueErcParent.dateCreation = DateUtils.toDate(this.selectedDisciplineScientifiqueErcParent.dateCreation);
    this.disciplineScientifiqueErcParentService.edit().subscribe(disciplineScientifiqueErcParent=>{
    const myIndex = this.disciplineScientifiqueErcParents.findIndex(e => e.id === this.selectedDisciplineScientifiqueErcParent.id);
    this.disciplineScientifiqueErcParents[myIndex] = this.selectedDisciplineScientifiqueErcParent;
    this.editDisciplineScientifiqueErcParentDialog = false;
    this.selectedDisciplineScientifiqueErcParent = new DisciplineScientifiqueErcParentVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editDisciplineScientifiqueErcParentDialog  = false;
}

// getters and setters

get disciplineScientifiqueErcParents(): Array<DisciplineScientifiqueErcParentVo> {
    return this.disciplineScientifiqueErcParentService.disciplineScientifiqueErcParents;
       }
set disciplineScientifiqueErcParents(value: Array<DisciplineScientifiqueErcParentVo>) {
        this.disciplineScientifiqueErcParentService.disciplineScientifiqueErcParents = value;
       }

 get selectedDisciplineScientifiqueErcParent(): DisciplineScientifiqueErcParentVo {
           return this.disciplineScientifiqueErcParentService.selectedDisciplineScientifiqueErcParent;
       }
    set selectedDisciplineScientifiqueErcParent(value: DisciplineScientifiqueErcParentVo) {
        this.disciplineScientifiqueErcParentService.selectedDisciplineScientifiqueErcParent = value;
       }

   get editDisciplineScientifiqueErcParentDialog(): boolean {
           return this.disciplineScientifiqueErcParentService.editDisciplineScientifiqueErcParentDialog;

       }
    set editDisciplineScientifiqueErcParentDialog(value: boolean) {
        this.disciplineScientifiqueErcParentService.editDisciplineScientifiqueErcParentDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
