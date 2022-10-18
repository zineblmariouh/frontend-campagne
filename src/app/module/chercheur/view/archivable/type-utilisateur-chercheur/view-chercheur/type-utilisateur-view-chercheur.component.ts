import {Component, OnInit} from '@angular/core';
import {TypeUtilisateurService} from '../../../../../controller/service/TypeUtilisateur.service';
import {TypeUtilisateurVo} from '../../../../../controller/model/TypeUtilisateur.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-type-utilisateur-view-chercheur',
  templateUrl: './type-utilisateur-view-chercheur.component.html',
  styleUrls: ['./type-utilisateur-view-chercheur.component.css']
})
export class TypeUtilisateurViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private typeUtilisateurService: TypeUtilisateurService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewTypeUtilisateurDialog  = false;
}

// getters and setters

get typeUtilisateurs(): Array<TypeUtilisateurVo> {
    return this.typeUtilisateurService.typeUtilisateurs;
       }
set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this.typeUtilisateurService.typeUtilisateurs = value;
       }

 get selectedTypeUtilisateur():TypeUtilisateurVo {
           return this.typeUtilisateurService.selectedTypeUtilisateur;
       }
    set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this.typeUtilisateurService.selectedTypeUtilisateur = value;
       }

   get viewTypeUtilisateurDialog():boolean {
           return this.typeUtilisateurService.viewTypeUtilisateurDialog;

       }
    set viewTypeUtilisateurDialog(value: boolean) {
        this.typeUtilisateurService.viewTypeUtilisateurDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
