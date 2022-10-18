import {Component, OnInit} from '@angular/core';
import {TypeInstanceService} from '../../../../../controller/service/TypeInstance.service';
import {TypeInstanceVo} from '../../../../../controller/model/TypeInstance.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-instance-edit-chercheur',
  templateUrl: './type-instance-edit-chercheur.component.html',
  styleUrls: ['./type-instance-edit-chercheur.component.css']
})
export class TypeInstanceEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeInstanceService: TypeInstanceService
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
            this.selectedTypeInstance.dateArchivage = DateUtils.toDate(this.selectedTypeInstance.dateArchivage);
            this.selectedTypeInstance.dateCreation = DateUtils.toDate(this.selectedTypeInstance.dateCreation);
    this.typeInstanceService.edit().subscribe(typeInstance=>{
    const myIndex = this.typeInstances.findIndex(e => e.id === this.selectedTypeInstance.id);
    this.typeInstances[myIndex] = this.selectedTypeInstance;
    this.editTypeInstanceDialog = false;
    this.selectedTypeInstance = new TypeInstanceVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeInstanceDialog  = false;
}

// getters and setters

get typeInstances(): Array<TypeInstanceVo> {
    return this.typeInstanceService.typeInstances;
       }
set typeInstances(value: Array<TypeInstanceVo>) {
        this.typeInstanceService.typeInstances = value;
       }

 get selectedTypeInstance(): TypeInstanceVo {
           return this.typeInstanceService.selectedTypeInstance;
       }
    set selectedTypeInstance(value: TypeInstanceVo) {
        this.typeInstanceService.selectedTypeInstance = value;
       }

   get editTypeInstanceDialog(): boolean {
           return this.typeInstanceService.editTypeInstanceDialog;

       }
    set editTypeInstanceDialog(value: boolean) {
        this.typeInstanceService.editTypeInstanceDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
