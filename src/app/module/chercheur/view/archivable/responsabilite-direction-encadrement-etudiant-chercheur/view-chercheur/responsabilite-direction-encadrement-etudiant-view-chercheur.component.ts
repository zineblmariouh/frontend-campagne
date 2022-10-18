import {Component, OnInit} from '@angular/core';
import {ResponsabiliteDirectionEncadrementEtudiantService} from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-responsabilite-direction-encadrement-etudiant-view-chercheur',
  templateUrl: './responsabilite-direction-encadrement-etudiant-view-chercheur.component.html',
  styleUrls: ['./responsabilite-direction-encadrement-etudiant-view-chercheur.component.css']
})
export class ResponsabiliteDirectionEncadrementEtudiantViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabiliteDirectionEncadrementEtudiantService: ResponsabiliteDirectionEncadrementEtudiantService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewResponsabiliteDirectionEncadrementEtudiantDialog  = false;
}

// getters and setters

get responsabiliteDirectionEncadrementEtudiants(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
    return this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants;
       }
set responsabiliteDirectionEncadrementEtudiants(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants = value;
       }

 get selectedResponsabiliteDirectionEncadrementEtudiant():ResponsabiliteDirectionEncadrementEtudiantVo {
           return this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant;
       }
    set selectedResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant = value;
       }

   get viewResponsabiliteDirectionEncadrementEtudiantDialog():boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.viewResponsabiliteDirectionEncadrementEtudiantDialog;

       }
    set viewResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.viewResponsabiliteDirectionEncadrementEtudiantDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
