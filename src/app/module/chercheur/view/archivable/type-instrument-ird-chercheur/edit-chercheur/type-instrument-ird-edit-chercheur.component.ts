import {Component, OnInit} from '@angular/core';
import {TypeInstrumentIrdService} from '../../../../../controller/service/TypeInstrumentIrd.service';
import {TypeInstrumentIrdVo} from '../../../../../controller/model/TypeInstrumentIrd.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-instrument-ird-edit-chercheur',
  templateUrl: './type-instrument-ird-edit-chercheur.component.html',
  styleUrls: ['./type-instrument-ird-edit-chercheur.component.css']
})
export class TypeInstrumentIrdEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstrumentIrdService: TypeInstrumentIrdService
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
            this.selectedTypeInstrumentIrd.dateArchivage = DateUtils.toDate(this.selectedTypeInstrumentIrd.dateArchivage);
            this.selectedTypeInstrumentIrd.dateCreation = DateUtils.toDate(this.selectedTypeInstrumentIrd.dateCreation);
    this.typeInstrumentIrdService.edit().subscribe(typeInstrumentIrd=>{
    const myIndex = this.typeInstrumentIrds.findIndex(e => e.id === this.selectedTypeInstrumentIrd.id);
    this.typeInstrumentIrds[myIndex] = this.selectedTypeInstrumentIrd;
    this.editTypeInstrumentIrdDialog = false;
    this.selectedTypeInstrumentIrd = new TypeInstrumentIrdVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeInstrumentIrdDialog  = false;
}

// getters and setters

get typeInstrumentIrds(): Array<TypeInstrumentIrdVo> {
    return this.typeInstrumentIrdService.typeInstrumentIrds;
       }
set typeInstrumentIrds(value: Array<TypeInstrumentIrdVo>) {
        this.typeInstrumentIrdService.typeInstrumentIrds = value;
       }

 get selectedTypeInstrumentIrd(): TypeInstrumentIrdVo {
           return this.typeInstrumentIrdService.selectedTypeInstrumentIrd;
       }
    set selectedTypeInstrumentIrd(value: TypeInstrumentIrdVo) {
        this.typeInstrumentIrdService.selectedTypeInstrumentIrd = value;
       }

   get editTypeInstrumentIrdDialog(): boolean {
           return this.typeInstrumentIrdService.editTypeInstrumentIrdDialog;

       }
    set editTypeInstrumentIrdDialog(value: boolean) {
        this.typeInstrumentIrdService.editTypeInstrumentIrdDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
