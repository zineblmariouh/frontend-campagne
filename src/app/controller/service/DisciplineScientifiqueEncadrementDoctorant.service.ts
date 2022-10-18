import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DisciplineScientifiqueEncadrementDoctorantVo} from '../model/DisciplineScientifiqueEncadrementDoctorant.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';
import {EncadrementDoctorantVo} from '../model/EncadrementDoctorant.model';


@Injectable({
  providedIn: 'root'
})
export class DisciplineScientifiqueEncadrementDoctorantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/disciplineScientifiqueEncadrementDoctorant/';
        })
    }
     private _disciplineScientifiqueEncadrementDoctorants: Array<DisciplineScientifiqueEncadrementDoctorantVo> ;
     private _selectedDisciplineScientifiqueEncadrementDoctorant: DisciplineScientifiqueEncadrementDoctorantVo;
     private _disciplineScientifiqueEncadrementDoctorantSelections: Array<DisciplineScientifiqueEncadrementDoctorantVo>;
     private _createDisciplineScientifiqueEncadrementDoctorantDialog: boolean;
     private _editDisciplineScientifiqueEncadrementDoctorantDialog: boolean;
     private _viewDisciplineScientifiqueEncadrementDoctorantDialog: boolean;
     public editDisciplineScientifiqueEncadrementDoctorant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDisciplineScientifiqueEncadrementDoctorant:DisciplineScientifiqueEncadrementDoctorantVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DisciplineScientifiqueEncadrementDoctorantVo>>(this.API);
    }

    public save(): Observable<DisciplineScientifiqueEncadrementDoctorantVo> {
         return this.http.post<DisciplineScientifiqueEncadrementDoctorantVo>(this.API, this.selectedDisciplineScientifiqueEncadrementDoctorant);
    }

    delete(disciplineScientifiqueEncadrementDoctorant: DisciplineScientifiqueEncadrementDoctorantVo) {
         return this.http.delete<number>(this.API + 'id/' + disciplineScientifiqueEncadrementDoctorant.id);
    }


    public edit(): Observable<DisciplineScientifiqueEncadrementDoctorantVo> {
        return this.http.put<DisciplineScientifiqueEncadrementDoctorantVo>(this.API, this.selectedDisciplineScientifiqueEncadrementDoctorant);
    }


     public findByCriteria(disciplineScientifiqueEncadrementDoctorant:DisciplineScientifiqueEncadrementDoctorantVo):Observable<Array<DisciplineScientifiqueEncadrementDoctorantVo>>{
           return this.http.post<Array<DisciplineScientifiqueEncadrementDoctorantVo>>(this.API +'search', disciplineScientifiqueEncadrementDoctorant);
    }

   public findByIdWithAssociatedList(disciplineScientifiqueEncadrementDoctorant:DisciplineScientifiqueEncadrementDoctorantVo):Observable<DisciplineScientifiqueEncadrementDoctorantVo>{
         return this.http.get<DisciplineScientifiqueEncadrementDoctorantVo>(this.API + 'detail/id/' +disciplineScientifiqueEncadrementDoctorant.id);
    }

    // getters and setters


    get disciplineScientifiqueEncadrementDoctorants(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
    if(this._disciplineScientifiqueEncadrementDoctorants==null){
    this._disciplineScientifiqueEncadrementDoctorants=new Array<DisciplineScientifiqueEncadrementDoctorantVo>();
    }
return this._disciplineScientifiqueEncadrementDoctorants;
       }

    set disciplineScientifiqueEncadrementDoctorants(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
        this._disciplineScientifiqueEncadrementDoctorants = value;
       }

    get selectedDisciplineScientifiqueEncadrementDoctorant(): DisciplineScientifiqueEncadrementDoctorantVo {
    if(this._selectedDisciplineScientifiqueEncadrementDoctorant==null){
    this._selectedDisciplineScientifiqueEncadrementDoctorant=new DisciplineScientifiqueEncadrementDoctorantVo();
    }
           return this._selectedDisciplineScientifiqueEncadrementDoctorant;
       }

    set selectedDisciplineScientifiqueEncadrementDoctorant(value: DisciplineScientifiqueEncadrementDoctorantVo) {
        this._selectedDisciplineScientifiqueEncadrementDoctorant = value;
       }

    get disciplineScientifiqueEncadrementDoctorantSelections(): Array<DisciplineScientifiqueEncadrementDoctorantVo> {
    if(this._disciplineScientifiqueEncadrementDoctorantSelections==null){
    this._disciplineScientifiqueEncadrementDoctorantSelections=new Array<DisciplineScientifiqueEncadrementDoctorantVo>();
    }
        return this._disciplineScientifiqueEncadrementDoctorantSelections;
       }


    set disciplineScientifiqueEncadrementDoctorantSelections(value: Array<DisciplineScientifiqueEncadrementDoctorantVo>) {
        this._disciplineScientifiqueEncadrementDoctorantSelections = value;
       }

    get createDisciplineScientifiqueEncadrementDoctorantDialog(): boolean {
        return this._createDisciplineScientifiqueEncadrementDoctorantDialog;
       }

    set createDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this._createDisciplineScientifiqueEncadrementDoctorantDialog = value;
       }

    get editDisciplineScientifiqueEncadrementDoctorantDialog(): boolean {
        return this._editDisciplineScientifiqueEncadrementDoctorantDialog;
       }

    set editDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this._editDisciplineScientifiqueEncadrementDoctorantDialog = value;
       }

    get viewDisciplineScientifiqueEncadrementDoctorantDialog(): boolean {
        return this._viewDisciplineScientifiqueEncadrementDoctorantDialog;
       }

    set viewDisciplineScientifiqueEncadrementDoctorantDialog(value: boolean) {
        this._viewDisciplineScientifiqueEncadrementDoctorantDialog = value;
       }

     get searchDisciplineScientifiqueEncadrementDoctorant(): DisciplineScientifiqueEncadrementDoctorantVo {
     if(this._searchDisciplineScientifiqueEncadrementDoctorant==null){
    this._searchDisciplineScientifiqueEncadrementDoctorant=new DisciplineScientifiqueEncadrementDoctorantVo();
    }
        return this._searchDisciplineScientifiqueEncadrementDoctorant;
    }

    set searchDisciplineScientifiqueEncadrementDoctorant(value: DisciplineScientifiqueEncadrementDoctorantVo) {
        this._searchDisciplineScientifiqueEncadrementDoctorant = value;
       }

}
