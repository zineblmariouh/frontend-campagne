import {Component, OnInit} from '@angular/core';
import {TypeParticipationService} from '../../../../../controller/service/TypeParticipation.service';
import {TypeParticipationVo} from '../../../../../controller/model/TypeParticipation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-participation-edit-admin',
  templateUrl: './type-participation-edit-admin.component.html',
  styleUrls: ['./type-participation-edit-admin.component.css']
})
export class TypeParticipationEditAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeParticipationService: TypeParticipationService
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
    this.typeParticipationService.edit().subscribe(typeParticipation=>{
    const myIndex = this.typeParticipations.findIndex(e => e.id === this.selectedTypeParticipation.id);
    this.typeParticipations[myIndex] = this.selectedTypeParticipation;
    this.editTypeParticipationDialog = false;
    this.selectedTypeParticipation = new TypeParticipationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeParticipationDialog  = false;
}

// getters and setters

get typeParticipations(): Array<TypeParticipationVo> {
    return this.typeParticipationService.typeParticipations;
       }
set typeParticipations(value: Array<TypeParticipationVo>) {
        this.typeParticipationService.typeParticipations = value;
       }

 get selectedTypeParticipation(): TypeParticipationVo {
           return this.typeParticipationService.selectedTypeParticipation;
       }
    set selectedTypeParticipation(value: TypeParticipationVo) {
        this.typeParticipationService.selectedTypeParticipation = value;
       }

   get editTypeParticipationDialog(): boolean {
           return this.typeParticipationService.editTypeParticipationDialog;

       }
    set editTypeParticipationDialog(value: boolean) {
        this.typeParticipationService.editTypeParticipationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
