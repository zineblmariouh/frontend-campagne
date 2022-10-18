import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnseignementZoneGeographiqueVo} from '../model/EnseignementZoneGeographique.model';
import {EnseignementVo} from '../model/Enseignement.model';
import {ZoneGeographiqueVo} from '../model/ZoneGeographique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class EnseignementZoneGeographiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enseignementZoneGeographique/';
        })
    }
     private _enseignementZoneGeographiques: Array<EnseignementZoneGeographiqueVo> ;
     private _selectedEnseignementZoneGeographique: EnseignementZoneGeographiqueVo;
     private _enseignementZoneGeographiqueSelections: Array<EnseignementZoneGeographiqueVo>;
     private _createEnseignementZoneGeographiqueDialog: boolean;
     private _editEnseignementZoneGeographiqueDialog: boolean;
     private _viewEnseignementZoneGeographiqueDialog: boolean;
     public editEnseignementZoneGeographique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnseignementZoneGeographique:EnseignementZoneGeographiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnseignementZoneGeographiqueVo>>(this.API);
    }

    public save(): Observable<EnseignementZoneGeographiqueVo> {
         return this.http.post<EnseignementZoneGeographiqueVo>(this.API, this.selectedEnseignementZoneGeographique);
    }

    delete(enseignementZoneGeographique: EnseignementZoneGeographiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + enseignementZoneGeographique.id);
    }


    public edit(): Observable<EnseignementZoneGeographiqueVo> {
        return this.http.put<EnseignementZoneGeographiqueVo>(this.API, this.selectedEnseignementZoneGeographique);
    }


     public findByCriteria(enseignementZoneGeographique:EnseignementZoneGeographiqueVo):Observable<Array<EnseignementZoneGeographiqueVo>>{
           return this.http.post<Array<EnseignementZoneGeographiqueVo>>(this.API +'search', enseignementZoneGeographique);
    }

   public findByIdWithAssociatedList(enseignementZoneGeographique:EnseignementZoneGeographiqueVo):Observable<EnseignementZoneGeographiqueVo>{
         return this.http.get<EnseignementZoneGeographiqueVo>(this.API + 'detail/id/' +enseignementZoneGeographique.id);
    }

    // getters and setters


    get enseignementZoneGeographiques(): Array<EnseignementZoneGeographiqueVo> {
    if(this._enseignementZoneGeographiques==null){
    this._enseignementZoneGeographiques=new Array<EnseignementZoneGeographiqueVo>();
    }
return this._enseignementZoneGeographiques;
       }

    set enseignementZoneGeographiques(value: Array<EnseignementZoneGeographiqueVo>) {
        this._enseignementZoneGeographiques = value;
       }

    get selectedEnseignementZoneGeographique(): EnseignementZoneGeographiqueVo {
    if(this._selectedEnseignementZoneGeographique==null){
    this._selectedEnseignementZoneGeographique=new EnseignementZoneGeographiqueVo();
    }
           return this._selectedEnseignementZoneGeographique;
       }

    set selectedEnseignementZoneGeographique(value: EnseignementZoneGeographiqueVo) {
        this._selectedEnseignementZoneGeographique = value;
       }

    get enseignementZoneGeographiqueSelections(): Array<EnseignementZoneGeographiqueVo> {
    if(this._enseignementZoneGeographiqueSelections==null){
    this._enseignementZoneGeographiqueSelections=new Array<EnseignementZoneGeographiqueVo>();
    }
        return this._enseignementZoneGeographiqueSelections;
       }


    set enseignementZoneGeographiqueSelections(value: Array<EnseignementZoneGeographiqueVo>) {
        this._enseignementZoneGeographiqueSelections = value;
       }

    get createEnseignementZoneGeographiqueDialog(): boolean {
        return this._createEnseignementZoneGeographiqueDialog;
       }

    set createEnseignementZoneGeographiqueDialog(value: boolean) {
        this._createEnseignementZoneGeographiqueDialog = value;
       }

    get editEnseignementZoneGeographiqueDialog(): boolean {
        return this._editEnseignementZoneGeographiqueDialog;
       }

    set editEnseignementZoneGeographiqueDialog(value: boolean) {
        this._editEnseignementZoneGeographiqueDialog = value;
       }

    get viewEnseignementZoneGeographiqueDialog(): boolean {
        return this._viewEnseignementZoneGeographiqueDialog;
       }

    set viewEnseignementZoneGeographiqueDialog(value: boolean) {
        this._viewEnseignementZoneGeographiqueDialog = value;
       }

     get searchEnseignementZoneGeographique(): EnseignementZoneGeographiqueVo {
     if(this._searchEnseignementZoneGeographique==null){
    this._searchEnseignementZoneGeographique=new EnseignementZoneGeographiqueVo();
    }
        return this._searchEnseignementZoneGeographique;
    }

    set searchEnseignementZoneGeographique(value: EnseignementZoneGeographiqueVo) {
        this._searchEnseignementZoneGeographique = value;
       }

}
