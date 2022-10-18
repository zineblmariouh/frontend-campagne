import {Component, OnInit} from '@angular/core';
import {StructureIrdService} from '../../../../../controller/service/StructureIrd.service';
import {StructureIrdVo} from '../../../../../controller/model/StructureIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-structure-ird-view-chercheur',
  templateUrl: './structure-ird-view-chercheur.component.html',
  styleUrls: ['./structure-ird-view-chercheur.component.css']
})
export class StructureIrdViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private structureIrdService: StructureIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewStructureIrdDialog  = false;
}

// getters and setters

get structureIrds(): Array<StructureIrdVo> {
    return this.structureIrdService.structureIrds;
       }
set structureIrds(value: Array<StructureIrdVo>) {
        this.structureIrdService.structureIrds = value;
       }

 get selectedStructureIrd():StructureIrdVo {
           return this.structureIrdService.selectedStructureIrd;
       }
    set selectedStructureIrd(value: StructureIrdVo) {
        this.structureIrdService.selectedStructureIrd = value;
       }

   get viewStructureIrdDialog():boolean {
           return this.structureIrdService.viewStructureIrdDialog;

       }
    set viewStructureIrdDialog(value: boolean) {
        this.structureIrdService.viewStructureIrdDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
