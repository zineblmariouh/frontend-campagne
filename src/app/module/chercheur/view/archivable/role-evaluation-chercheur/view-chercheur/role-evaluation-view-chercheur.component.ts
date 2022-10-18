import {Component, OnInit} from '@angular/core';
import {RoleEvaluationService} from '../../../../../controller/service/RoleEvaluation.service';
import {RoleEvaluationVo} from '../../../../../controller/model/RoleEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-role-evaluation-view-chercheur',
  templateUrl: './role-evaluation-view-chercheur.component.html',
  styleUrls: ['./role-evaluation-view-chercheur.component.css']
})
export class RoleEvaluationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private roleEvaluationService: RoleEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewRoleEvaluationDialog  = false;
}

// getters and setters

get roleEvaluations(): Array<RoleEvaluationVo> {
    return this.roleEvaluationService.roleEvaluations;
       }
set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this.roleEvaluationService.roleEvaluations = value;
       }

 get selectedRoleEvaluation():RoleEvaluationVo {
           return this.roleEvaluationService.selectedRoleEvaluation;
       }
    set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this.roleEvaluationService.selectedRoleEvaluation = value;
       }

   get viewRoleEvaluationDialog():boolean {
           return this.roleEvaluationService.viewRoleEvaluationDialog;

       }
    set viewRoleEvaluationDialog(value: boolean) {
        this.roleEvaluationService.viewRoleEvaluationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
