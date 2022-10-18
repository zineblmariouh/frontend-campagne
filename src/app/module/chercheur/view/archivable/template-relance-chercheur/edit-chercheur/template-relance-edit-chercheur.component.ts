import {Component, OnInit} from '@angular/core';
import {TemplateRelanceService} from '../../../../../controller/service/TemplateRelance.service';
import {TemplateRelanceVo} from '../../../../../controller/model/TemplateRelance.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-template-relance-edit-chercheur',
  templateUrl: './template-relance-edit-chercheur.component.html',
  styleUrls: ['./template-relance-edit-chercheur.component.css']
})
export class TemplateRelanceEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateRelanceService: TemplateRelanceService
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
            this.selectedTemplateRelance.dateArchivage = DateUtils.toDate(this.selectedTemplateRelance.dateArchivage);
            this.selectedTemplateRelance.dateCreation = DateUtils.toDate(this.selectedTemplateRelance.dateCreation);
    this.templateRelanceService.edit().subscribe(templateRelance=>{
    const myIndex = this.templateRelances.findIndex(e => e.id === this.selectedTemplateRelance.id);
    this.templateRelances[myIndex] = this.selectedTemplateRelance;
    this.editTemplateRelanceDialog = false;
    this.selectedTemplateRelance = new TemplateRelanceVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTemplateRelanceDialog  = false;
}

// getters and setters

get templateRelances(): Array<TemplateRelanceVo> {
    return this.templateRelanceService.templateRelances;
       }
set templateRelances(value: Array<TemplateRelanceVo>) {
        this.templateRelanceService.templateRelances = value;
       }

 get selectedTemplateRelance(): TemplateRelanceVo {
           return this.templateRelanceService.selectedTemplateRelance;
       }
    set selectedTemplateRelance(value: TemplateRelanceVo) {
        this.templateRelanceService.selectedTemplateRelance = value;
       }

   get editTemplateRelanceDialog(): boolean {
           return this.templateRelanceService.editTemplateRelanceDialog;

       }
    set editTemplateRelanceDialog(value: boolean) {
        this.templateRelanceService.editTemplateRelanceDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
