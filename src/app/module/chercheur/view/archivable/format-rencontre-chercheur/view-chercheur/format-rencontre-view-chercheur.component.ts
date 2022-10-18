import {Component, OnInit} from '@angular/core';
import {FormatRencontreService} from '../../../../../controller/service/FormatRencontre.service';
import {FormatRencontreVo} from '../../../../../controller/model/FormatRencontre.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-format-rencontre-view-chercheur',
  templateUrl: './format-rencontre-view-chercheur.component.html',
  styleUrls: ['./format-rencontre-view-chercheur.component.css']
})
export class FormatRencontreViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private formatRencontreService: FormatRencontreService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewFormatRencontreDialog  = false;
}

// getters and setters

get formatRencontres(): Array<FormatRencontreVo> {
    return this.formatRencontreService.formatRencontres;
       }
set formatRencontres(value: Array<FormatRencontreVo>) {
        this.formatRencontreService.formatRencontres = value;
       }

 get selectedFormatRencontre():FormatRencontreVo {
           return this.formatRencontreService.selectedFormatRencontre;
       }
    set selectedFormatRencontre(value: FormatRencontreVo) {
        this.formatRencontreService.selectedFormatRencontre = value;
       }

   get viewFormatRencontreDialog():boolean {
           return this.formatRencontreService.viewFormatRencontreDialog;

       }
    set viewFormatRencontreDialog(value: boolean) {
        this.formatRencontreService.viewFormatRencontreDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
