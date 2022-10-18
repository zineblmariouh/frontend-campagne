import {Component, OnInit} from '@angular/core';
import {DisciplineScientifiqueErcService} from '../../../../../controller/service/DisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcVo} from '../../../../../controller/model/DisciplineScientifiqueErc.model';
import {RoleService} from '../../../../../controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

import {KeyWordDisciplineScientifiqueErcVo} from '../../../../../controller/model/KeyWordDisciplineScientifiqueErc.model';
import {KeyWordDisciplineScientifiqueErcService} from '../../../../../controller/service/KeyWordDisciplineScientifiqueErc.service';
import {DisciplineScientifiqueErcParentVo} from '../../../../../controller/model/DisciplineScientifiqueErcParent.model';
import {DisciplineScientifiqueErcParentService} from '../../../../../controller/service/DisciplineScientifiqueErcParent.service';
import {KeyWordVo} from '../../../../../controller/model/KeyWord.model';
import {KeyWordService} from '../../../../../controller/service/KeyWord.service';

@Component({
  selector: 'app-discipline-scientifique-erc-view-admin',
  templateUrl: './discipline-scientifique-erc-view-admin.component.html',
  styleUrls: ['./discipline-scientifique-erc-view-admin.component.css']
})
export class DisciplineScientifiqueErcViewAdminComponent implements OnInit {

        selectedKeyWordDisciplineScientifiqueErcs: KeyWordDisciplineScientifiqueErcVo = new KeyWordDisciplineScientifiqueErcVo();
        keyWordDisciplineScientifiqueErcsListe: Array<KeyWordDisciplineScientifiqueErcVo> = [];

        myKeyWords: Array<KeyWordVo> = [];


constructor(private datePipe: DatePipe, private disciplineScientifiqueErcService: DisciplineScientifiqueErcService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private keyWordDisciplineScientifiqueErcService :KeyWordDisciplineScientifiqueErcService
    ,private disciplineScientifiqueErcParentService :DisciplineScientifiqueErcParentService
    ,private keyWordService :KeyWordService
) {
}

// methods
ngOnInit(): void {
                this.selectedKeyWordDisciplineScientifiqueErcs.keyWordVo = new KeyWordVo();
                this.keyWordService.findAll().subscribe((data) => this.keyWords = data);
    this.selectedDisciplineScientifiqueErcParent = new DisciplineScientifiqueErcParentVo();
    this.disciplineScientifiqueErcParentService.findAll().subscribe((data) => this.disciplineScientifiqueErcParents = data);
}

hideViewDialog(){
    this.viewDisciplineScientifiqueErcDialog  = false;
}

// getters and setters

get disciplineScientifiqueErcs(): Array<DisciplineScientifiqueErcVo> {
    return this.disciplineScientifiqueErcService.disciplineScientifiqueErcs;
       }
set disciplineScientifiqueErcs(value: Array<DisciplineScientifiqueErcVo>) {
        this.disciplineScientifiqueErcService.disciplineScientifiqueErcs = value;
       }

 get selectedDisciplineScientifiqueErc():DisciplineScientifiqueErcVo {
           return this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc;
       }
    set selectedDisciplineScientifiqueErc(value: DisciplineScientifiqueErcVo) {
        this.disciplineScientifiqueErcService.selectedDisciplineScientifiqueErc = value;
       }

   get viewDisciplineScientifiqueErcDialog():boolean {
           return this.disciplineScientifiqueErcService.viewDisciplineScientifiqueErcDialog;

       }
    set viewDisciplineScientifiqueErcDialog(value: boolean) {
        this.disciplineScientifiqueErcService.viewDisciplineScientifiqueErcDialog= value;
       }

       get selectedDisciplineScientifiqueErcParent():DisciplineScientifiqueErcParentVo {
           return this.disciplineScientifiqueErcParentService.selectedDisciplineScientifiqueErcParent;
       }
      set selectedDisciplineScientifiqueErcParent(value: DisciplineScientifiqueErcParentVo) {
        this.disciplineScientifiqueErcParentService.selectedDisciplineScientifiqueErcParent = value;
       }
       get disciplineScientifiqueErcParents():Array<DisciplineScientifiqueErcParentVo> {
           return this.disciplineScientifiqueErcParentService.disciplineScientifiqueErcParents;
       }
       set disciplineScientifiqueErcParents(value: Array<DisciplineScientifiqueErcParentVo>) {
        this.disciplineScientifiqueErcParentService.disciplineScientifiqueErcParents = value;
       }
       get editDisciplineScientifiqueErcParentDialog():boolean {
           return this.disciplineScientifiqueErcParentService.editDisciplineScientifiqueErcParentDialog;
       }
      set editDisciplineScientifiqueErcParentDialog(value: boolean) {
        this.disciplineScientifiqueErcParentService.editDisciplineScientifiqueErcParentDialog= value;
       }
       get selectedKeyWord():KeyWordVo {
           return this.keyWordService.selectedKeyWord;
       }
      set selectedKeyWord(value: KeyWordVo) {
        this.keyWordService.selectedKeyWord = value;
       }
       get keyWords():Array<KeyWordVo> {
           return this.keyWordService.keyWords;
       }
       set keyWords(value: Array<KeyWordVo>) {
        this.keyWordService.keyWords = value;
       }
       get editKeyWordDialog():boolean {
           return this.keyWordService.editKeyWordDialog;
       }
      set editKeyWordDialog(value: boolean) {
        this.keyWordService.editKeyWordDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
