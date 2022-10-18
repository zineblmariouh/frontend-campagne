import {Component, OnInit} from '@angular/core';
import {NiveauResponsabilitePedagogiqueService} from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-niveau-responsabilite-pedagogique-edit-chercheur',
  templateUrl: './niveau-responsabilite-pedagogique-edit-chercheur.component.html',
  styleUrls: ['./niveau-responsabilite-pedagogique-edit-chercheur.component.css']
})
export class NiveauResponsabilitePedagogiqueEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService
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
    this.niveauResponsabilitePedagogiqueService.edit().subscribe(niveauResponsabilitePedagogique=>{
    const myIndex = this.niveauResponsabilitePedagogiques.findIndex(e => e.id === this.selectedNiveauResponsabilitePedagogique.id);
    this.niveauResponsabilitePedagogiques[myIndex] = this.selectedNiveauResponsabilitePedagogique;
    this.editNiveauResponsabilitePedagogiqueDialog = false;
    this.selectedNiveauResponsabilitePedagogique = new NiveauResponsabilitePedagogiqueVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editNiveauResponsabilitePedagogiqueDialog  = false;
}

// getters and setters

get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
    return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }

 get selectedNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
    set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }

   get editNiveauResponsabilitePedagogiqueDialog(): boolean {
           return this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog;

       }
    set editNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.editNiveauResponsabilitePedagogiqueDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
