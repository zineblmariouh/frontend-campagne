import {Component, OnInit} from '@angular/core';
import {TypeReclamationService} from '../../../../../controller/service/TypeReclamation.service';
import {TypeReclamationVo} from '../../../../../controller/model/TypeReclamation.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-reclamation-view-chercheur',
  templateUrl: './type-reclamation-view-chercheur.component.html',
  styleUrls: ['./type-reclamation-view-chercheur.component.css']
})
export class TypeReclamationViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeReclamationService: TypeReclamationService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeReclamationDialog  = false;
}

// getters and setters

get typeReclamations(): Array<TypeReclamationVo> {
    return this.typeReclamationService.typeReclamations;
       }
set typeReclamations(value: Array<TypeReclamationVo>) {
        this.typeReclamationService.typeReclamations = value;
       }

 get selectedTypeReclamation():TypeReclamationVo {
           return this.typeReclamationService.selectedTypeReclamation;
       }
    set selectedTypeReclamation(value: TypeReclamationVo) {
        this.typeReclamationService.selectedTypeReclamation = value;
       }

   get viewTypeReclamationDialog():boolean {
           return this.typeReclamationService.viewTypeReclamationDialog;

       }
    set viewTypeReclamationDialog(value: boolean) {
        this.typeReclamationService.viewTypeReclamationDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
