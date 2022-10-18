import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DisciplineScientifiqueConsultanceScientifiquePonctuelleVo} from '../model/DisciplineScientifiqueConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class DisciplineScientifiqueConsultanceScientifiquePonctuelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/disciplineScientifiqueConsultanceScientifiquePonctuelle/';
        })
    }
     private _disciplineScientifiqueConsultanceScientifiquePonctuelles: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> ;
     private _selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo;
     private _disciplineScientifiqueConsultanceScientifiquePonctuelleSelections: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>;
     private _createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog: boolean;
     private _editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog: boolean;
     private _viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog: boolean;
     public editDisciplineScientifiqueConsultanceScientifiquePonctuelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDisciplineScientifiqueConsultanceScientifiquePonctuelle:DisciplineScientifiqueConsultanceScientifiquePonctuelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>>(this.API);
    }

    public save(): Observable<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
         return this.http.post<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>(this.API, this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle);
    }

    delete(disciplineScientifiqueConsultanceScientifiquePonctuelle: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
         return this.http.delete<number>(this.API + 'id/' + disciplineScientifiqueConsultanceScientifiquePonctuelle.id);
    }


    public edit(): Observable<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
        return this.http.put<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>(this.API, this.selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle);
    }


     public findByCriteria(disciplineScientifiqueConsultanceScientifiquePonctuelle:DisciplineScientifiqueConsultanceScientifiquePonctuelleVo):Observable<Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>>{
           return this.http.post<Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>>(this.API +'search', disciplineScientifiqueConsultanceScientifiquePonctuelle);
    }

   public findByIdWithAssociatedList(disciplineScientifiqueConsultanceScientifiquePonctuelle:DisciplineScientifiqueConsultanceScientifiquePonctuelleVo):Observable<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>{
         return this.http.get<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>(this.API + 'detail/id/' +disciplineScientifiqueConsultanceScientifiquePonctuelle.id);
    }

    // getters and setters


    get disciplineScientifiqueConsultanceScientifiquePonctuelles(): Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
    if(this._disciplineScientifiqueConsultanceScientifiquePonctuelles==null){
    this._disciplineScientifiqueConsultanceScientifiquePonctuelles=new Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>();
    }
return this._disciplineScientifiqueConsultanceScientifiquePonctuelles;
       }

    set disciplineScientifiqueConsultanceScientifiquePonctuelles(value: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>) {
        this._disciplineScientifiqueConsultanceScientifiquePonctuelles = value;
       }

    get selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle(): DisciplineScientifiqueConsultanceScientifiquePonctuelleVo {
    if(this._selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle==null){
    this._selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle=new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();
    }
           return this._selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle;
       }

    set selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle(value: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
        this._selectedDisciplineScientifiqueConsultanceScientifiquePonctuelle = value;
       }

    get disciplineScientifiqueConsultanceScientifiquePonctuelleSelections(): Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo> {
    if(this._disciplineScientifiqueConsultanceScientifiquePonctuelleSelections==null){
    this._disciplineScientifiqueConsultanceScientifiquePonctuelleSelections=new Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>();
    }
        return this._disciplineScientifiqueConsultanceScientifiquePonctuelleSelections;
       }


    set disciplineScientifiqueConsultanceScientifiquePonctuelleSelections(value: Array<DisciplineScientifiqueConsultanceScientifiquePonctuelleVo>) {
        this._disciplineScientifiqueConsultanceScientifiquePonctuelleSelections = value;
       }

    get createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;
       }

    set createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._createDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = value;
       }

    get editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;
       }

    set editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._editDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = value;
       }

    get viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog;
       }

    set viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._viewDisciplineScientifiqueConsultanceScientifiquePonctuelleDialog = value;
       }

     get searchDisciplineScientifiqueConsultanceScientifiquePonctuelle(): DisciplineScientifiqueConsultanceScientifiquePonctuelleVo {
     if(this._searchDisciplineScientifiqueConsultanceScientifiquePonctuelle==null){
    this._searchDisciplineScientifiqueConsultanceScientifiquePonctuelle=new DisciplineScientifiqueConsultanceScientifiquePonctuelleVo();
    }
        return this._searchDisciplineScientifiqueConsultanceScientifiquePonctuelle;
    }

    set searchDisciplineScientifiqueConsultanceScientifiquePonctuelle(value: DisciplineScientifiqueConsultanceScientifiquePonctuelleVo) {
        this._searchDisciplineScientifiqueConsultanceScientifiquePonctuelle = value;
       }

}
