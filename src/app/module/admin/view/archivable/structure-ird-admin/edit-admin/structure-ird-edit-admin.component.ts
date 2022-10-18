import {Component, OnInit} from '@angular/core';
import {StructureIrdService} from '../../../../../controller/service/StructureIrd.service';
import {StructureIrdVo} from '../../../../../controller/model/StructureIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-structure-ird-edit-admin',
  templateUrl: './structure-ird-edit-admin.component.html',
  styleUrls: ['./structure-ird-edit-admin.component.css']
})
export class StructureIrdEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private structureIrdService: StructureIrdService
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
            this.selectedStructureIrd.dateArchivage = DateUtils.toDate(this.selectedStructureIrd.dateArchivage);
            this.selectedStructureIrd.dateCreation = DateUtils.toDate(this.selectedStructureIrd.dateCreation);
    this.structureIrdService.edit().subscribe(structureIrd=>{
    const myIndex = this.structureIrds.findIndex(e => e.id === this.selectedStructureIrd.id);
    this.structureIrds[myIndex] = this.selectedStructureIrd;
    this.editStructureIrdDialog = false;
    this.selectedStructureIrd = new StructureIrdVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editStructureIrdDialog  = false;
}

// getters and setters

get structureIrds(): Array<StructureIrdVo> {
    return this.structureIrdService.structureIrds;
       }
set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }

 get selectedStructureIrd(): StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
    set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }

   get editStructureIrdDialog(): boolean {
           return this.structureIrdService.editStructureIrdDialog;

       }
    set editStructureIrdDialog(value: boolean) {
        this.structureIrdService.editStructureIrdDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
