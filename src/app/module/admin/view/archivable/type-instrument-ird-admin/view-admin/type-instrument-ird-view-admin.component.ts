import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-instrument-ird-view-admin',
  templateUrl: './type-instrument-ird-view-admin.component.html',
  styleUrls: ['./type-instrument-ird-view-admin.component.css']
})
export class TypeInstrumentIrdViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstrumentIrdService: TypeInstrumentIrdService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeInstrumentIrdDialog  = false;
}

// getters and setters

get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
    return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }

 get selectedTypeInstrumentIrd():TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
    set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }

   get viewTypeInstrumentIrdDialog():boolean {
           return this.typeInstrumentIrdService.viewTypeInstrumentIrdDialog;

       }
    set viewTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.viewTypeInstrumentIrdDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
