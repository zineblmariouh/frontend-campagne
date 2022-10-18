import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DisciplineScientifiqueEvenementColloqueScientifiqueVo} from '../model/DisciplineScientifiqueEvenementColloqueScientifique.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';
import {EvenementColloqueScienntifiqueVo} from '../model/EvenementColloqueScienntifique.model';


@Injectable({
  providedIn: 'root'
})
export class DisciplineScientifiqueEvenementColloqueScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/disciplineScientifiqueEvenementColloqueScientifique/';
        })
    }
     private _disciplineScientifiqueEvenementColloqueScientifiques: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> ;
     private _selectedDisciplineScientifiqueEvenementColloqueScientifique: DisciplineScientifiqueEvenementColloqueScientifiqueVo;
     private _disciplineScientifiqueEvenementColloqueScientifiqueSelections: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>;
     private _createDisciplineScientifiqueEvenementColloqueScientifiqueDialog: boolean;
     private _editDisciplineScientifiqueEvenementColloqueScientifiqueDialog: boolean;
     private _viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog: boolean;
     public editDisciplineScientifiqueEvenementColloqueScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDisciplineScientifiqueEvenementColloqueScientifique:DisciplineScientifiqueEvenementColloqueScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>>(this.API);
    }

    public save(): Observable<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
         return this.http.post<DisciplineScientifiqueEvenementColloqueScientifiqueVo>(this.API, this.selectedDisciplineScientifiqueEvenementColloqueScientifique);
    }

    delete(disciplineScientifiqueEvenementColloqueScientifique: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + disciplineScientifiqueEvenementColloqueScientifique.id);
    }


    public edit(): Observable<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
        return this.http.put<DisciplineScientifiqueEvenementColloqueScientifiqueVo>(this.API, this.selectedDisciplineScientifiqueEvenementColloqueScientifique);
    }


     public findByCriteria(disciplineScientifiqueEvenementColloqueScientifique:DisciplineScientifiqueEvenementColloqueScientifiqueVo):Observable<Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>>{
           return this.http.post<Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>>(this.API +'search', disciplineScientifiqueEvenementColloqueScientifique);
    }

   public findByIdWithAssociatedList(disciplineScientifiqueEvenementColloqueScientifique:DisciplineScientifiqueEvenementColloqueScientifiqueVo):Observable<DisciplineScientifiqueEvenementColloqueScientifiqueVo>{
         return this.http.get<DisciplineScientifiqueEvenementColloqueScientifiqueVo>(this.API + 'detail/id/' +disciplineScientifiqueEvenementColloqueScientifique.id);
    }

    // getters and setters


    get disciplineScientifiqueEvenementColloqueScientifiques(): Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
    if(this._disciplineScientifiqueEvenementColloqueScientifiques==null){
    this._disciplineScientifiqueEvenementColloqueScientifiques=new Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>();
    }
return this._disciplineScientifiqueEvenementColloqueScientifiques;
       }

    set disciplineScientifiqueEvenementColloqueScientifiques(value: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>) {
        this._disciplineScientifiqueEvenementColloqueScientifiques = value;
       }

    get selectedDisciplineScientifiqueEvenementColloqueScientifique(): DisciplineScientifiqueEvenementColloqueScientifiqueVo {
    if(this._selectedDisciplineScientifiqueEvenementColloqueScientifique==null){
    this._selectedDisciplineScientifiqueEvenementColloqueScientifique=new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
    }
           return this._selectedDisciplineScientifiqueEvenementColloqueScientifique;
       }

    set selectedDisciplineScientifiqueEvenementColloqueScientifique(value: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {
        this._selectedDisciplineScientifiqueEvenementColloqueScientifique = value;
       }

    get disciplineScientifiqueEvenementColloqueScientifiqueSelections(): Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo> {
    if(this._disciplineScientifiqueEvenementColloqueScientifiqueSelections==null){
    this._disciplineScientifiqueEvenementColloqueScientifiqueSelections=new Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>();
    }
        return this._disciplineScientifiqueEvenementColloqueScientifiqueSelections;
       }


    set disciplineScientifiqueEvenementColloqueScientifiqueSelections(value: Array<DisciplineScientifiqueEvenementColloqueScientifiqueVo>) {
        this._disciplineScientifiqueEvenementColloqueScientifiqueSelections = value;
       }

    get createDisciplineScientifiqueEvenementColloqueScientifiqueDialog(): boolean {
        return this._createDisciplineScientifiqueEvenementColloqueScientifiqueDialog;
       }

    set createDisciplineScientifiqueEvenementColloqueScientifiqueDialog(value: boolean) {
        this._createDisciplineScientifiqueEvenementColloqueScientifiqueDialog = value;
       }

    get editDisciplineScientifiqueEvenementColloqueScientifiqueDialog(): boolean {
        return this._editDisciplineScientifiqueEvenementColloqueScientifiqueDialog;
       }

    set editDisciplineScientifiqueEvenementColloqueScientifiqueDialog(value: boolean) {
        this._editDisciplineScientifiqueEvenementColloqueScientifiqueDialog = value;
       }

    get viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog(): boolean {
        return this._viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog;
       }

    set viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog(value: boolean) {
        this._viewDisciplineScientifiqueEvenementColloqueScientifiqueDialog = value;
       }

     get searchDisciplineScientifiqueEvenementColloqueScientifique(): DisciplineScientifiqueEvenementColloqueScientifiqueVo {
     if(this._searchDisciplineScientifiqueEvenementColloqueScientifique==null){
    this._searchDisciplineScientifiqueEvenementColloqueScientifique=new DisciplineScientifiqueEvenementColloqueScientifiqueVo();
    }
        return this._searchDisciplineScientifiqueEvenementColloqueScientifique;
    }

    set searchDisciplineScientifiqueEvenementColloqueScientifique(value: DisciplineScientifiqueEvenementColloqueScientifiqueVo) {
        this._searchDisciplineScientifiqueEvenementColloqueScientifique = value;
       }

}
