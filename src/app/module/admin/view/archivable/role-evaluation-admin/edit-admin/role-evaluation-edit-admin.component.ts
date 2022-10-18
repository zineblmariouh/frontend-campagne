import {Component, OnInit} from '@angular/core';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-role-evaluation-edit-admin',
  templateUrl: './role-evaluation-edit-admin.component.html',
  styleUrls: ['./role-evaluation-edit-admin.component.css']
})
export class RoleEvaluationEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private roleEvaluationService: RoleEvaluationService
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
            this.selectedRoleEvaluation.dateArchivage = DateUtils.toDate(this.selectedRoleEvaluation.dateArchivage);
            this.selectedRoleEvaluation.dateCreation = DateUtils.toDate(this.selectedRoleEvaluation.dateCreation);
    this.roleEvaluationService.edit().subscribe(roleEvaluation=>{
    const myIndex = this.roleEvaluations.findIndex(e => e.id === this.selectedRoleEvaluation.id);
    this.roleEvaluations[myIndex] = this.selectedRoleEvaluation;
    this.editRoleEvaluationDialog = false;
    this.selectedRoleEvaluation = new RoleEvaluationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editRoleEvaluationDialog  = false;
}

// getters and setters

get roleEvaluations(): Array<RoleEvaluationVo> {
    return this.roleEvaluationService.roleEvaluations;
       }
set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }

 get selectedRoleEvaluation(): RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
    set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
       }

   get editRoleEvaluationDialog(): boolean {
           return this.roleEvaluationService.editRoleEvaluationDialog;

       }
    set editRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.editRoleEvaluationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
