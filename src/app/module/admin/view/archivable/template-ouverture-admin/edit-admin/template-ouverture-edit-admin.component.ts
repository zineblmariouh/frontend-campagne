import {Component, OnInit} from '@angular/core';
import {TemplateOuvertureService} from '../../../../../controller/service/TemplateOuverture.service';
import {TemplateOuvertureVo} from '../../../../../controller/model/TemplateOuverture.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-template-ouverture-edit-admin',
  templateUrl: './template-ouverture-edit-admin.component.html',
  styleUrls: ['./template-ouverture-edit-admin.component.css']
})
export class TemplateOuvertureEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private templateOuvertureService: TemplateOuvertureService
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
            this.selectedTemplateOuverture.dateArchivage = DateUtils.toDate(this.selectedTemplateOuverture.dateArchivage);
            this.selectedTemplateOuverture.dateCreation = DateUtils.toDate(this.selectedTemplateOuverture.dateCreation);
    this.templateOuvertureService.edit().subscribe(templateOuverture=>{
    const myIndex = this.templateOuvertures.findIndex(e => e.id === this.selectedTemplateOuverture.id);
    this.templateOuvertures[myIndex] = this.selectedTemplateOuverture;
    this.editTemplateOuvertureDialog = false;
    this.selectedTemplateOuverture = new TemplateOuvertureVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTemplateOuvertureDialog  = false;
}

// getters and setters

get templateOuvertures(): Array<TemplateOuvertureVo> {
    return this.templateOuvertureService.templateOuvertures;
       }
set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this.templateOuvertureService.templateOuvertures = value;
       }

 get selectedTemplateOuverture(): TemplateOuvertureVo {
           return this.templateOuvertureService.selectedTemplateOuverture;
       }
    set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this.templateOuvertureService.selectedTemplateOuverture = value;
       }

   get editTemplateOuvertureDialog(): boolean {
           return this.templateOuvertureService.editTemplateOuvertureDialog;

       }
    set editTemplateOuvertureDialog(value: boolean) {
        this.templateOuvertureService.editTemplateOuvertureDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
