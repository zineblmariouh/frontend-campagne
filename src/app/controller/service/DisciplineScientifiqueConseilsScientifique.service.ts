import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DisciplineScientifiqueConseilsScientifiqueVo} from '../model/DisciplineScientifiqueConseilsScientifique.model';
import {ConseilsScientifiqueVo} from '../model/ConseilsScientifique.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class DisciplineScientifiqueConseilsScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/disciplineScientifiqueConseilsScientifique/';
        })
    }
     private _disciplineScientifiqueConseilsScientifiques: Array<DisciplineScientifiqueConseilsScientifiqueVo> ;
     private _selectedDisciplineScientifiqueConseilsScientifique: DisciplineScientifiqueConseilsScientifiqueVo;
     private _disciplineScientifiqueConseilsScientifiqueSelections: Array<DisciplineScientifiqueConseilsScientifiqueVo>;
     private _createDisciplineScientifiqueConseilsScientifiqueDialog: boolean;
     private _editDisciplineScientifiqueConseilsScientifiqueDialog: boolean;
     private _viewDisciplineScientifiqueConseilsScientifiqueDialog: boolean;
     public editDisciplineScientifiqueConseilsScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDisciplineScientifiqueConseilsScientifique:DisciplineScientifiqueConseilsScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DisciplineScientifiqueConseilsScientifiqueVo>>(this.API);
    }

    public save(): Observable<DisciplineScientifiqueConseilsScientifiqueVo> {
         return this.http.post<DisciplineScientifiqueConseilsScientifiqueVo>(this.API, this.selectedDisciplineScientifiqueConseilsScientifique);
    }

    delete(disciplineScientifiqueConseilsScientifique: DisciplineScientifiqueConseilsScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + disciplineScientifiqueConseilsScientifique.id);
    }


    public edit(): Observable<DisciplineScientifiqueConseilsScientifiqueVo> {
        return this.http.put<DisciplineScientifiqueConseilsScientifiqueVo>(this.API, this.selectedDisciplineScientifiqueConseilsScientifique);
    }


     public findByCriteria(disciplineScientifiqueConseilsScientifique:DisciplineScientifiqueConseilsScientifiqueVo):Observable<Array<DisciplineScientifiqueConseilsScientifiqueVo>>{
           return this.http.post<Array<DisciplineScientifiqueConseilsScientifiqueVo>>(this.API +'search', disciplineScientifiqueConseilsScientifique);
    }

   public findByIdWithAssociatedList(disciplineScientifiqueConseilsScientifique:DisciplineScientifiqueConseilsScientifiqueVo):Observable<DisciplineScientifiqueConseilsScientifiqueVo>{
         return this.http.get<DisciplineScientifiqueConseilsScientifiqueVo>(this.API + 'detail/id/' +disciplineScientifiqueConseilsScientifique.id);
    }

    // getters and setters


    get disciplineScientifiqueConseilsScientifiques(): Array<DisciplineScientifiqueConseilsScientifiqueVo> {
    if(this._disciplineScientifiqueConseilsScientifiques==null){
    this._disciplineScientifiqueConseilsScientifiques=new Array<DisciplineScientifiqueConseilsScientifiqueVo>();
    }
return this._disciplineScientifiqueConseilsScientifiques;
       }

    set disciplineScientifiqueConseilsScientifiques(value: Array<DisciplineScientifiqueConseilsScientifiqueVo>) {
        this._disciplineScientifiqueConseilsScientifiques = value;
       }

    get selectedDisciplineScientifiqueConseilsScientifique(): DisciplineScientifiqueConseilsScientifiqueVo {
    if(this._selectedDisciplineScientifiqueConseilsScientifique==null){
    this._selectedDisciplineScientifiqueConseilsScientifique=new DisciplineScientifiqueConseilsScientifiqueVo();
    }
           return this._selectedDisciplineScientifiqueConseilsScientifique;
       }

    set selectedDisciplineScientifiqueConseilsScientifique(value: DisciplineScientifiqueConseilsScientifiqueVo) {
        this._selectedDisciplineScientifiqueConseilsScientifique = value;
       }

    get disciplineScientifiqueConseilsScientifiqueSelections(): Array<DisciplineScientifiqueConseilsScientifiqueVo> {
    if(this._disciplineScientifiqueConseilsScientifiqueSelections==null){
    this._disciplineScientifiqueConseilsScientifiqueSelections=new Array<DisciplineScientifiqueConseilsScientifiqueVo>();
    }
        return this._disciplineScientifiqueConseilsScientifiqueSelections;
       }


    set disciplineScientifiqueConseilsScientifiqueSelections(value: Array<DisciplineScientifiqueConseilsScientifiqueVo>) {
        this._disciplineScientifiqueConseilsScientifiqueSelections = value;
       }

    get createDisciplineScientifiqueConseilsScientifiqueDialog(): boolean {
        return this._createDisciplineScientifiqueConseilsScientifiqueDialog;
       }

    set createDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this._createDisciplineScientifiqueConseilsScientifiqueDialog = value;
       }

    get editDisciplineScientifiqueConseilsScientifiqueDialog(): boolean {
        return this._editDisciplineScientifiqueConseilsScientifiqueDialog;
       }

    set editDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this._editDisciplineScientifiqueConseilsScientifiqueDialog = value;
       }

    get viewDisciplineScientifiqueConseilsScientifiqueDialog(): boolean {
        return this._viewDisciplineScientifiqueConseilsScientifiqueDialog;
       }

    set viewDisciplineScientifiqueConseilsScientifiqueDialog(value: boolean) {
        this._viewDisciplineScientifiqueConseilsScientifiqueDialog = value;
       }

     get searchDisciplineScientifiqueConseilsScientifique(): DisciplineScientifiqueConseilsScientifiqueVo {
     if(this._searchDisciplineScientifiqueConseilsScientifique==null){
    this._searchDisciplineScientifiqueConseilsScientifique=new DisciplineScientifiqueConseilsScientifiqueVo();
    }
        return this._searchDisciplineScientifiqueConseilsScientifique;
    }

    set searchDisciplineScientifiqueConseilsScientifique(value: DisciplineScientifiqueConseilsScientifiqueVo) {
        this._searchDisciplineScientifiqueConseilsScientifique = value;
       }

}
