import {Component, OnInit} from '@angular/core';
import {MasterInternationalService} from '../../../../../controller/service/MasterInternational.service';
import {MasterInternationalVo} from '../../../../../controller/model/MasterInternational.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-master-international-edit-admin',
  templateUrl: './master-international-edit-admin.component.html',
  styleUrls: ['./master-international-edit-admin.component.css']
})
export class MasterInternationalEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private masterInternationalService: MasterInternationalService
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
            this.selectedMasterInternational.dateArchivage = DateUtils.toDate(this.selectedMasterInternational.dateArchivage);
            this.selectedMasterInternational.dateCreation = DateUtils.toDate(this.selectedMasterInternational.dateCreation);
    this.masterInternationalService.edit().subscribe(masterInternational=>{
    const myIndex = this.masterInternationals.findIndex(e => e.id === this.selectedMasterInternational.id);
    this.masterInternationals[myIndex] = this.selectedMasterInternational;
    this.editMasterInternationalDialog = false;
    this.selectedMasterInternational = new MasterInternationalVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editMasterInternationalDialog  = false;
}

// getters and setters

get masterInternationals(): Array<MasterInternationalVo> {
    return this.masterInternationalService.masterInternationals;
       }
set masterInternationals(value: Array<MasterInternationalVo>) {
        this.masterInternationalService.masterInternationals = value;
       }

 get selectedMasterInternational(): MasterInternationalVo {
           return this.masterInternationalService.selectedMasterInternational;
       }
    set selectedMasterInternational(value: MasterInternationalVo) {
        this.masterInternationalService.selectedMasterInternational = value;
       }

   get editMasterInternationalDialog(): boolean {
           return this.masterInternationalService.editMasterInternationalDialog;

       }
    set editMasterInternationalDialog(value: boolean) {
        this.masterInternationalService.editMasterInternationalDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
