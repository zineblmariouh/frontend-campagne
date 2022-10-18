import {Component, OnInit} from '@angular/core';
import {ResponsabiliteDirectionEncadrementEtudiantService} from '../../../../../controller/service/ResponsabiliteDirectionEncadrementEtudiant.service';
import {ResponsabiliteDirectionEncadrementEtudiantVo} from '../../../../../controller/model/ResponsabiliteDirectionEncadrementEtudiant.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-responsabilite-direction-encadrement-etudiant-edit-chercheur',
  templateUrl: './responsabilite-direction-encadrement-etudiant-edit-chercheur.component.html',
  styleUrls: ['./responsabilite-direction-encadrement-etudiant-edit-chercheur.component.css']
})
export class ResponsabiliteDirectionEncadrementEtudiantEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private responsabiliteDirectionEncadrementEtudiantService: ResponsabiliteDirectionEncadrementEtudiantService
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
            this.selectedResponsabiliteDirectionEncadrementEtudiant.dateArchivage = DateUtils.toDate(this.selectedResponsabiliteDirectionEncadrementEtudiant.dateArchivage);
            this.selectedResponsabiliteDirectionEncadrementEtudiant.dateCreation = DateUtils.toDate(this.selectedResponsabiliteDirectionEncadrementEtudiant.dateCreation);
    this.responsabiliteDirectionEncadrementEtudiantService.edit().subscribe(responsabiliteDirectionEncadrementEtudiant=>{
    const myIndex = this.responsabiliteDirectionEncadrementEtudiants.findIndex(e => e.id === this.selectedResponsabiliteDirectionEncadrementEtudiant.id);
    this.responsabiliteDirectionEncadrementEtudiants[myIndex] = this.selectedResponsabiliteDirectionEncadrementEtudiant;
    this.editResponsabiliteDirectionEncadrementEtudiantDialog = false;
    this.selectedResponsabiliteDirectionEncadrementEtudiant = new ResponsabiliteDirectionEncadrementEtudiantVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editResponsabiliteDirectionEncadrementEtudiantDialog  = false;
}

// getters and setters

get responsabiliteDirectionEncadrementEtudiants(): Array<ResponsabiliteDirectionEncadrementEtudiantVo> {
    return this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants;
       }
set responsabiliteDirectionEncadrementEtudiants(value: Array<ResponsabiliteDirectionEncadrementEtudiantVo>) {
        this.responsabiliteDirectionEncadrementEtudiantService.responsabiliteDirectionEncadrementEtudiants = value;
       }

 get selectedResponsabiliteDirectionEncadrementEtudiant(): ResponsabiliteDirectionEncadrementEtudiantVo {
           return this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant;
       }
    set selectedResponsabiliteDirectionEncadrementEtudiant(value: ResponsabiliteDirectionEncadrementEtudiantVo) {
        this.responsabiliteDirectionEncadrementEtudiantService.selectedResponsabiliteDirectionEncadrementEtudiant = value;
       }

   get editResponsabiliteDirectionEncadrementEtudiantDialog(): boolean {
           return this.responsabiliteDirectionEncadrementEtudiantService.editResponsabiliteDirectionEncadrementEtudiantDialog;

       }
    set editResponsabiliteDirectionEncadrementEtudiantDialog(value: boolean) {
        this.responsabiliteDirectionEncadrementEtudiantService.editResponsabiliteDirectionEncadrementEtudiantDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
