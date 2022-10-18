import {Component, OnInit} from '@angular/core';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-expertise-evaluation-view-admin',
  templateUrl: './type-expertise-evaluation-view-admin.component.html',
  styleUrls: ['./type-expertise-evaluation-view-admin.component.css']
})
export class TypeExpertiseEvaluationViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeExpertiseEvaluationService: TypeExpertiseEvaluationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeExpertiseEvaluationDialog  = false;
}

// getters and setters

get typeExpertiseEvaluations(): Array<TypeExpertiseEvaluationVo> {
    return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }

 get selectedTypeExpertiseEvaluation():TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
    set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }

   get viewTypeExpertiseEvaluationDialog():boolean {
           return this.typeExpertiseEvaluationService.viewTypeExpertiseEvaluationDialog;

       }
    set viewTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.viewTypeExpertiseEvaluationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
