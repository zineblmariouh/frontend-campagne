import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EncadrementEtudiantDisciplineScientifiqueVo} from '../model/EncadrementEtudiantDisciplineScientifique.model';
import {EncadrementEtudiantVo} from '../model/EncadrementEtudiant.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class EncadrementEtudiantDisciplineScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/encadrementEtudiantDisciplineScientifique/';
        })
    }
     private _encadrementEtudiantDisciplineScientifiques: Array<EncadrementEtudiantDisciplineScientifiqueVo> ;
     private _selectedEncadrementEtudiantDisciplineScientifique: EncadrementEtudiantDisciplineScientifiqueVo;
     private _encadrementEtudiantDisciplineScientifiqueSelections: Array<EncadrementEtudiantDisciplineScientifiqueVo>;
     private _createEncadrementEtudiantDisciplineScientifiqueDialog: boolean;
     private _editEncadrementEtudiantDisciplineScientifiqueDialog: boolean;
     private _viewEncadrementEtudiantDisciplineScientifiqueDialog: boolean;
     public editEncadrementEtudiantDisciplineScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEncadrementEtudiantDisciplineScientifique:EncadrementEtudiantDisciplineScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EncadrementEtudiantDisciplineScientifiqueVo>>(this.API);
    }

    public save(): Observable<EncadrementEtudiantDisciplineScientifiqueVo> {
         return this.http.post<EncadrementEtudiantDisciplineScientifiqueVo>(this.API, this.selectedEncadrementEtudiantDisciplineScientifique);
    }

    delete(encadrementEtudiantDisciplineScientifique: EncadrementEtudiantDisciplineScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + encadrementEtudiantDisciplineScientifique.id);
    }


    public edit(): Observable<EncadrementEtudiantDisciplineScientifiqueVo> {
        return this.http.put<EncadrementEtudiantDisciplineScientifiqueVo>(this.API, this.selectedEncadrementEtudiantDisciplineScientifique);
    }


     public findByCriteria(encadrementEtudiantDisciplineScientifique:EncadrementEtudiantDisciplineScientifiqueVo):Observable<Array<EncadrementEtudiantDisciplineScientifiqueVo>>{
           return this.http.post<Array<EncadrementEtudiantDisciplineScientifiqueVo>>(this.API +'search', encadrementEtudiantDisciplineScientifique);
    }

   public findByIdWithAssociatedList(encadrementEtudiantDisciplineScientifique:EncadrementEtudiantDisciplineScientifiqueVo):Observable<EncadrementEtudiantDisciplineScientifiqueVo>{
         return this.http.get<EncadrementEtudiantDisciplineScientifiqueVo>(this.API + 'detail/id/' +encadrementEtudiantDisciplineScientifique.id);
    }

    // getters and setters


    get encadrementEtudiantDisciplineScientifiques(): Array<EncadrementEtudiantDisciplineScientifiqueVo> {
    if(this._encadrementEtudiantDisciplineScientifiques==null){
    this._encadrementEtudiantDisciplineScientifiques=new Array<EncadrementEtudiantDisciplineScientifiqueVo>();
    }
return this._encadrementEtudiantDisciplineScientifiques;
       }

    set encadrementEtudiantDisciplineScientifiques(value: Array<EncadrementEtudiantDisciplineScientifiqueVo>) {
        this._encadrementEtudiantDisciplineScientifiques = value;
       }

    get selectedEncadrementEtudiantDisciplineScientifique(): EncadrementEtudiantDisciplineScientifiqueVo {
    if(this._selectedEncadrementEtudiantDisciplineScientifique==null){
    this._selectedEncadrementEtudiantDisciplineScientifique=new EncadrementEtudiantDisciplineScientifiqueVo();
    }
           return this._selectedEncadrementEtudiantDisciplineScientifique;
       }

    set selectedEncadrementEtudiantDisciplineScientifique(value: EncadrementEtudiantDisciplineScientifiqueVo) {
        this._selectedEncadrementEtudiantDisciplineScientifique = value;
       }

    get encadrementEtudiantDisciplineScientifiqueSelections(): Array<EncadrementEtudiantDisciplineScientifiqueVo> {
    if(this._encadrementEtudiantDisciplineScientifiqueSelections==null){
    this._encadrementEtudiantDisciplineScientifiqueSelections=new Array<EncadrementEtudiantDisciplineScientifiqueVo>();
    }
        return this._encadrementEtudiantDisciplineScientifiqueSelections;
       }


    set encadrementEtudiantDisciplineScientifiqueSelections(value: Array<EncadrementEtudiantDisciplineScientifiqueVo>) {
        this._encadrementEtudiantDisciplineScientifiqueSelections = value;
       }

    get createEncadrementEtudiantDisciplineScientifiqueDialog(): boolean {
        return this._createEncadrementEtudiantDisciplineScientifiqueDialog;
       }

    set createEncadrementEtudiantDisciplineScientifiqueDialog(value: boolean) {
        this._createEncadrementEtudiantDisciplineScientifiqueDialog = value;
       }

    get editEncadrementEtudiantDisciplineScientifiqueDialog(): boolean {
        return this._editEncadrementEtudiantDisciplineScientifiqueDialog;
       }

    set editEncadrementEtudiantDisciplineScientifiqueDialog(value: boolean) {
        this._editEncadrementEtudiantDisciplineScientifiqueDialog = value;
       }

    get viewEncadrementEtudiantDisciplineScientifiqueDialog(): boolean {
        return this._viewEncadrementEtudiantDisciplineScientifiqueDialog;
       }

    set viewEncadrementEtudiantDisciplineScientifiqueDialog(value: boolean) {
        this._viewEncadrementEtudiantDisciplineScientifiqueDialog = value;
       }

     get searchEncadrementEtudiantDisciplineScientifique(): EncadrementEtudiantDisciplineScientifiqueVo {
     if(this._searchEncadrementEtudiantDisciplineScientifique==null){
    this._searchEncadrementEtudiantDisciplineScientifique=new EncadrementEtudiantDisciplineScientifiqueVo();
    }
        return this._searchEncadrementEtudiantDisciplineScientifique;
    }

    set searchEncadrementEtudiantDisciplineScientifique(value: EncadrementEtudiantDisciplineScientifiqueVo) {
        this._searchEncadrementEtudiantDisciplineScientifique = value;
       }

}
