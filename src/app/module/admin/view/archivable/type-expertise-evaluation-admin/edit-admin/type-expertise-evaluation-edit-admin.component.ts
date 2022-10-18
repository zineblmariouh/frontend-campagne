import {Component, OnInit} from '@angular/core';
import {TypeExpertiseEvaluationService} from '../../../../../controller/service/TypeExpertiseEvaluation.service';
import {TypeExpertiseEvaluationVo} from '../../../../../controller/model/TypeExpertiseEvaluation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-expertise-evaluation-edit-admin',
  templateUrl: './type-expertise-evaluation-edit-admin.component.html',
  styleUrls: ['./type-expertise-evaluation-edit-admin.component.css']
})
export class TypeExpertiseEvaluationEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeExpertiseEvaluationService: TypeExpertiseEvaluationService
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
            this.selectedTypeExpertiseEvaluation.dateArchivage = DateUtils.toDate(this.selectedTypeExpertiseEvaluation.dateArchivage);
            this.selectedTypeExpertiseEvaluation.dateCreation = DateUtils.toDate(this.selectedTypeExpertiseEvaluation.dateCreation);
    this.typeExpertiseEvaluationService.edit().subscribe(typeExpertiseEvaluation=>{
    const myIndex = this.typeExpertiseEvaluations.findIndex(e => e.id === this.selectedTypeExpertiseEvaluation.id);
    this.typeExpertiseEvaluations[myIndex] = this.selectedTypeExpertiseEvaluation;
    this.editTypeExpertiseEvaluationDialog = false;
    this.selectedTypeExpertiseEvaluation = new TypeExpertiseEvaluationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeExpertiseEvaluationDialog  = false;
}

// getters and setters

get typeExpertiseEvaluations(): Array<TypeExpertiseEvaluationVo> {
    return this.typeExpertiseEvaluationService.typeExpertiseEvaluations;
       }
set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this.typeExpertiseEvaluationService.typeExpertiseEvaluations = value;
       }

 get selectedTypeExpertiseEvaluation(): TypeExpertiseEvaluationVo {
           return this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation;
       }
    set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this.typeExpertiseEvaluationService.selectedTypeExpertiseEvaluation = value;
       }

   get editTypeExpertiseEvaluationDialog(): boolean {
           return this.typeExpertiseEvaluationService.editTypeExpertiseEvaluationDialog;

       }
    set editTypeExpertiseEvaluationDialog(value: boolean) {
        this.typeExpertiseEvaluationService.editTypeExpertiseEvaluationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
