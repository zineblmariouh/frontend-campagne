import {Component, OnInit} from '@angular/core';
import {NiveauResponsabilitePedagogiqueService} from '../../../../../controller/service/NiveauResponsabilitePedagogique.service';
import {NiveauResponsabilitePedagogiqueVo} from '../../../../../controller/model/NiveauResponsabilitePedagogique.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-niveau-responsabilite-pedagogique-view-admin',
  templateUrl: './niveau-responsabilite-pedagogique-view-admin.component.html',
  styleUrls: ['./niveau-responsabilite-pedagogique-view-admin.component.css']
})
export class NiveauResponsabilitePedagogiqueViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private niveauResponsabilitePedagogiqueService: NiveauResponsabilitePedagogiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewNiveauResponsabilitePedagogiqueDialog  = false;
}

// getters and setters

get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
    return this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques;
       }
set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this.niveauResponsabilitePedagogiqueService.niveauResponsabilitePedagogiques = value;
       }

 get selectedNiveauResponsabilitePedagogique():NiveauResponsabilitePedagogiqueVo {
           return this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique;
       }
    set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this.niveauResponsabilitePedagogiqueService.selectedNiveauResponsabilitePedagogique = value;
       }

   get viewNiveauResponsabilitePedagogiqueDialog():boolean {
           return this.niveauResponsabilitePedagogiqueService.viewNiveauResponsabilitePedagogiqueDialog;

       }
    set viewNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this.niveauResponsabilitePedagogiqueService.viewNiveauResponsabilitePedagogiqueDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
