import {Component, OnInit} from '@angular/core';
import {TypeReclamationService} from '../../../../../controller/service/TypeReclamation.service';
import {TypeReclamationVo} from '../../../../../controller/model/TypeReclamation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-reclamation-edit-chercheur',
  templateUrl: './type-reclamation-edit-chercheur.component.html',
  styleUrls: ['./type-reclamation-edit-chercheur.component.css']
})
export class TypeReclamationEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeReclamationService: TypeReclamationService
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
            this.selectedTypeReclamation.dateArchivage = DateUtils.toDate(this.selectedTypeReclamation.dateArchivage);
            this.selectedTypeReclamation.dateCreation = DateUtils.toDate(this.selectedTypeReclamation.dateCreation);
    this.typeReclamationService.edit().subscribe(typeReclamation=>{
    const myIndex = this.typeReclamations.findIndex(e => e.id === this.selectedTypeReclamation.id);
    this.typeReclamations[myIndex] = this.selectedTypeReclamation;
    this.editTypeReclamationDialog = false;
    this.selectedTypeReclamation = new TypeReclamationVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editTypeReclamationDialog  = false;
}

// getters and setters

get typeReclamations(): Array<TypeReclamationVo> {
    return this.typeReclamationService.typeReclamations;
       }
set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }

 get selectedTypeReclamation(): TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
    set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }

   get editTypeReclamationDialog(): boolean {
           return this.typeReclamationService.editTypeReclamationDialog;

       }
    set editTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.editTypeReclamationDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
