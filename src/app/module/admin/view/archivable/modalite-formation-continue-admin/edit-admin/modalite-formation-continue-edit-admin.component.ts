import {Component, OnInit} from '@angular/core';
import {ModaliteFormationContinueService} from '../../../../../controller/service/ModaliteFormationContinue.service';
import {ModaliteFormationContinueVo} from '../../../../../controller/model/ModaliteFormationContinue.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-modalite-formation-continue-edit-admin',
  templateUrl: './modalite-formation-continue-edit-admin.component.html',
  styleUrls: ['./modalite-formation-continue-edit-admin.component.css']
})
export class ModaliteFormationContinueEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private modaliteFormationContinueService: ModaliteFormationContinueService
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
            this.selectedModaliteFormationContinue.dateArchivage = DateUtils.toDate(this.selectedModaliteFormationContinue.dateArchivage);
            this.selectedModaliteFormationContinue.dateCreation = DateUtils.toDate(this.selectedModaliteFormationContinue.dateCreation);
    this.modaliteFormationContinueService.edit().subscribe(modaliteFormationContinue=>{
    const myIndex = this.modaliteFormationContinues.findIndex(e => e.id === this.selectedModaliteFormationContinue.id);
    this.modaliteFormationContinues[myIndex] = this.selectedModaliteFormationContinue;
    this.editModaliteFormationContinueDialog = false;
    this.selectedModaliteFormationContinue = new ModaliteFormationContinueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editModaliteFormationContinueDialog  = false;
}

// getters and setters

get modaliteFormationContinues(): Array<ModaliteFormationContinueVo> {
    return this.modaliteFormationContinueService.modaliteFormationContinues;
       }
set modaliteFormationContinues(value: Array<ModaliteFormationContinueVo>) {
        this.modaliteFormationContinueService.modaliteFormationContinues = value;
       }

 get selectedModaliteFormationContinue(): ModaliteFormationContinueVo {
           return this.modaliteFormationContinueService.selectedModaliteFormationContinue;
       }
    set selectedModaliteFormationContinue(value: ModaliteFormationContinueVo) {
        this.modaliteFormationContinueService.selectedModaliteFormationContinue = value;
       }

   get editModaliteFormationContinueDialog(): boolean {
           return this.modaliteFormationContinueService.editModaliteFormationContinueDialog;

       }
    set editModaliteFormationContinueDialog(value: boolean) {
        this.modaliteFormationContinueService.editModaliteFormationContinueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
