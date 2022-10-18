import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnseignementDisciplineScientifiqueVo} from '../model/EnseignementDisciplineScientifique.model';
import {EnseignementVo} from '../model/Enseignement.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class EnseignementDisciplineScientifiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enseignementDisciplineScientifique/';
        })
    }
     private _enseignementDisciplineScientifiques: Array<EnseignementDisciplineScientifiqueVo> ;
     private _selectedEnseignementDisciplineScientifique: EnseignementDisciplineScientifiqueVo;
     private _enseignementDisciplineScientifiqueSelections: Array<EnseignementDisciplineScientifiqueVo>;
     private _createEnseignementDisciplineScientifiqueDialog: boolean;
     private _editEnseignementDisciplineScientifiqueDialog: boolean;
     private _viewEnseignementDisciplineScientifiqueDialog: boolean;
     public editEnseignementDisciplineScientifique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnseignementDisciplineScientifique:EnseignementDisciplineScientifiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnseignementDisciplineScientifiqueVo>>(this.API);
    }

    public save(): Observable<EnseignementDisciplineScientifiqueVo> {
         return this.http.post<EnseignementDisciplineScientifiqueVo>(this.API, this.selectedEnseignementDisciplineScientifique);
    }

    delete(enseignementDisciplineScientifique: EnseignementDisciplineScientifiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + enseignementDisciplineScientifique.id);
    }


    public edit(): Observable<EnseignementDisciplineScientifiqueVo> {
        return this.http.put<EnseignementDisciplineScientifiqueVo>(this.API, this.selectedEnseignementDisciplineScientifique);
    }


     public findByCriteria(enseignementDisciplineScientifique:EnseignementDisciplineScientifiqueVo):Observable<Array<EnseignementDisciplineScientifiqueVo>>{
           return this.http.post<Array<EnseignementDisciplineScientifiqueVo>>(this.API +'search', enseignementDisciplineScientifique);
    }

   public findByIdWithAssociatedList(enseignementDisciplineScientifique:EnseignementDisciplineScientifiqueVo):Observable<EnseignementDisciplineScientifiqueVo>{
         return this.http.get<EnseignementDisciplineScientifiqueVo>(this.API + 'detail/id/' +enseignementDisciplineScientifique.id);
    }

    // getters and setters


    get enseignementDisciplineScientifiques(): Array<EnseignementDisciplineScientifiqueVo> {
    if(this._enseignementDisciplineScientifiques==null){
    this._enseignementDisciplineScientifiques=new Array<EnseignementDisciplineScientifiqueVo>();
    }
return this._enseignementDisciplineScientifiques;
       }

    set enseignementDisciplineScientifiques(value: Array<EnseignementDisciplineScientifiqueVo>) {
        this._enseignementDisciplineScientifiques = value;
       }

    get selectedEnseignementDisciplineScientifique(): EnseignementDisciplineScientifiqueVo {
    if(this._selectedEnseignementDisciplineScientifique==null){
    this._selectedEnseignementDisciplineScientifique=new EnseignementDisciplineScientifiqueVo();
    }
           return this._selectedEnseignementDisciplineScientifique;
       }

    set selectedEnseignementDisciplineScientifique(value: EnseignementDisciplineScientifiqueVo) {
        this._selectedEnseignementDisciplineScientifique = value;
       }

    get enseignementDisciplineScientifiqueSelections(): Array<EnseignementDisciplineScientifiqueVo> {
    if(this._enseignementDisciplineScientifiqueSelections==null){
    this._enseignementDisciplineScientifiqueSelections=new Array<EnseignementDisciplineScientifiqueVo>();
    }
        return this._enseignementDisciplineScientifiqueSelections;
       }


    set enseignementDisciplineScientifiqueSelections(value: Array<EnseignementDisciplineScientifiqueVo>) {
        this._enseignementDisciplineScientifiqueSelections = value;
       }

    get createEnseignementDisciplineScientifiqueDialog(): boolean {
        return this._createEnseignementDisciplineScientifiqueDialog;
       }

    set createEnseignementDisciplineScientifiqueDialog(value: boolean) {
        this._createEnseignementDisciplineScientifiqueDialog = value;
       }

    get editEnseignementDisciplineScientifiqueDialog(): boolean {
        return this._editEnseignementDisciplineScientifiqueDialog;
       }

    set editEnseignementDisciplineScientifiqueDialog(value: boolean) {
        this._editEnseignementDisciplineScientifiqueDialog = value;
       }

    get viewEnseignementDisciplineScientifiqueDialog(): boolean {
        return this._viewEnseignementDisciplineScientifiqueDialog;
       }

    set viewEnseignementDisciplineScientifiqueDialog(value: boolean) {
        this._viewEnseignementDisciplineScientifiqueDialog = value;
       }

     get searchEnseignementDisciplineScientifique(): EnseignementDisciplineScientifiqueVo {
     if(this._searchEnseignementDisciplineScientifique==null){
    this._searchEnseignementDisciplineScientifique=new EnseignementDisciplineScientifiqueVo();
    }
        return this._searchEnseignementDisciplineScientifique;
    }

    set searchEnseignementDisciplineScientifique(value: EnseignementDisciplineScientifiqueVo) {
        this._searchEnseignementDisciplineScientifique = value;
       }

}
