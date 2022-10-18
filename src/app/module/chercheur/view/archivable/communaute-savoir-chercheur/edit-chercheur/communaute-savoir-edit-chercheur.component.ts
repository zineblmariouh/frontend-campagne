import {Component, OnInit} from '@angular/core';
import {CommunauteSavoirService} from '../../../../../controller/service/CommunauteSavoir.service';
import {CommunauteSavoirVo} from '../../../../../controller/model/CommunauteSavoir.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DateUtils} from '../../../../../utils/DateUtils';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-communaute-savoir-edit-chercheur',
  templateUrl: './communaute-savoir-edit-chercheur.component.html',
  styleUrls: ['./communaute-savoir-edit-chercheur.component.css']
})
export class CommunauteSavoirEditChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private communauteSavoirService: CommunauteSavoirService
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
            this.selectedCommunauteSavoir.dateArchivage = DateUtils.toDate(this.selectedCommunauteSavoir.dateArchivage);
            this.selectedCommunauteSavoir.dateCreation = DateUtils.toDate(this.selectedCommunauteSavoir.dateCreation);
    this.communauteSavoirService.edit().subscribe(communauteSavoir=>{
    const myIndex = this.communauteSavoirs.findIndex(e => e.id === this.selectedCommunauteSavoir.id);
    this.communauteSavoirs[myIndex] = this.selectedCommunauteSavoir;
    this.editCommunauteSavoirDialog = false;
    this.selectedCommunauteSavoir = new CommunauteSavoirVo();


    }, error => {
        console.log(error);
    });

}

// methods

hideEditDialog(){
    this.editCommunauteSavoirDialog  = false;
}

// getters and setters

get communauteSavoirs(): Array<CommunauteSavoirVo> {
    return this.communauteSavoirService.communauteSavoirs;
       }
set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this.communauteSavoirService.communauteSavoirs = value;
       }

 get selectedCommunauteSavoir(): CommunauteSavoirVo {
           return this.communauteSavoirService.selectedCommunauteSavoir;
       }
    set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this.communauteSavoirService.selectedCommunauteSavoir = value;
       }

   get editCommunauteSavoirDialog(): boolean {
           return this.communauteSavoirService.editCommunauteSavoirDialog;

       }
    set editCommunauteSavoirDialog(value: boolean) {
        this.communauteSavoirService.editCommunauteSavoirDialog = value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
