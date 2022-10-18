import {Component, OnInit} from '@angular/core';
import {TemplateClotureService} from '../../../../../controller/service/TemplateCloture.service';
import {TemplateClotureVo} from '../../../../../controller/model/TemplateCloture.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-template-cloture-edit-admin',
  templateUrl: './template-cloture-edit-admin.component.html',
  styleUrls: ['./template-cloture-edit-admin.component.css']
})
export class TemplateClotureEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateClotureService: TemplateClotureService
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
            this.selectedTemplateCloture.dateArchivage = DateUtils.toDate(this.selectedTemplateCloture.dateArchivage);
            this.selectedTemplateCloture.dateCreation = DateUtils.toDate(this.selectedTemplateCloture.dateCreation);
    this.templateClotureService.edit().subscribe(templateCloture=>{
    const myIndex = this.templateClotures.findIndex(e => e.id === this.selectedTemplateCloture.id);
    this.templateClotures[myIndex] = this.selectedTemplateCloture;
    this.editTemplateClotureDialog = false;
    this.selectedTemplateCloture = new TemplateClotureVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTemplateClotureDialog  = false;
}

// getters and setters

get templateClotures(): Array<TemplateClotureVo> {
    return this.templateClotureService.templateClotures;
       }
set templateClotures(value: Array<TemplateClotureVo>) {
        this.templateClotureService.templateClotures = value;
       }

 get selectedTemplateCloture(): TemplateClotureVo {
           return this.templateClotureService.selectedTemplateCloture;
       }
    set selectedTemplateCloture(value: TemplateClotureVo) {
        this.templateClotureService.selectedTemplateCloture = value;
       }

   get editTemplateClotureDialog(): boolean {
           return this.templateClotureService.editTemplateClotureDialog;

       }
    set editTemplateClotureDialog(value: boolean) {
        this.templateClotureService.editTemplateClotureDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
