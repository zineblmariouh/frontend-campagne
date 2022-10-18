import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PaysZoneGeographiqueVo} from '../model/PaysZoneGeographique.model';
import {ZoneGeographiqueVo} from '../model/ZoneGeographique.model';
import {PaysVo} from '../model/Pays.model';


@Injectable({
  providedIn: 'root'
})
export class PaysZoneGeographiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/paysZoneGeographique/';
        })
    }
     private _paysZoneGeographiques: Array<PaysZoneGeographiqueVo> ;
     private _selectedPaysZoneGeographique: PaysZoneGeographiqueVo;
     private _paysZoneGeographiqueSelections: Array<PaysZoneGeographiqueVo>;
     private _createPaysZoneGeographiqueDialog: boolean;
     private _editPaysZoneGeographiqueDialog: boolean;
     private _viewPaysZoneGeographiqueDialog: boolean;
     public editPaysZoneGeographique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPaysZoneGeographique:PaysZoneGeographiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PaysZoneGeographiqueVo>>(this.API);
    }

    public save(): Observable<PaysZoneGeographiqueVo> {
         return this.http.post<PaysZoneGeographiqueVo>(this.API, this.selectedPaysZoneGeographique);
    }

    delete(paysZoneGeographique: PaysZoneGeographiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + paysZoneGeographique.id);
    }


    public edit(): Observable<PaysZoneGeographiqueVo> {
        return this.http.put<PaysZoneGeographiqueVo>(this.API, this.selectedPaysZoneGeographique);
    }


     public findByCriteria(paysZoneGeographique:PaysZoneGeographiqueVo):Observable<Array<PaysZoneGeographiqueVo>>{
           return this.http.post<Array<PaysZoneGeographiqueVo>>(this.API +'search', paysZoneGeographique);
    }

   public findByIdWithAssociatedList(paysZoneGeographique:PaysZoneGeographiqueVo):Observable<PaysZoneGeographiqueVo>{
         return this.http.get<PaysZoneGeographiqueVo>(this.API + 'detail/id/' +paysZoneGeographique.id);
    }

    // getters and setters


    get paysZoneGeographiques(): Array<PaysZoneGeographiqueVo> {
    if(this._paysZoneGeographiques==null){
    this._paysZoneGeographiques=new Array<PaysZoneGeographiqueVo>();
    }
return this._paysZoneGeographiques;
       }

    set paysZoneGeographiques(value: Array<PaysZoneGeographiqueVo>) {
        this._paysZoneGeographiques = value;
       }

    get selectedPaysZoneGeographique(): PaysZoneGeographiqueVo {
    if(this._selectedPaysZoneGeographique==null){
    this._selectedPaysZoneGeographique=new PaysZoneGeographiqueVo();
    }
           return this._selectedPaysZoneGeographique;
       }

    set selectedPaysZoneGeographique(value: PaysZoneGeographiqueVo) {
        this._selectedPaysZoneGeographique = value;
       }

    get paysZoneGeographiqueSelections(): Array<PaysZoneGeographiqueVo> {
    if(this._paysZoneGeographiqueSelections==null){
    this._paysZoneGeographiqueSelections=new Array<PaysZoneGeographiqueVo>();
    }
        return this._paysZoneGeographiqueSelections;
       }


    set paysZoneGeographiqueSelections(value: Array<PaysZoneGeographiqueVo>) {
        this._paysZoneGeographiqueSelections = value;
       }

    get createPaysZoneGeographiqueDialog(): boolean {
        return this._createPaysZoneGeographiqueDialog;
       }

    set createPaysZoneGeographiqueDialog(value: boolean) {
        this._createPaysZoneGeographiqueDialog = value;
       }

    get editPaysZoneGeographiqueDialog(): boolean {
        return this._editPaysZoneGeographiqueDialog;
       }

    set editPaysZoneGeographiqueDialog(value: boolean) {
        this._editPaysZoneGeographiqueDialog = value;
       }

    get viewPaysZoneGeographiqueDialog(): boolean {
        return this._viewPaysZoneGeographiqueDialog;
       }

    set viewPaysZoneGeographiqueDialog(value: boolean) {
        this._viewPaysZoneGeographiqueDialog = value;
       }

     get searchPaysZoneGeographique(): PaysZoneGeographiqueVo {
     if(this._searchPaysZoneGeographique==null){
    this._searchPaysZoneGeographique=new PaysZoneGeographiqueVo();
    }
        return this._searchPaysZoneGeographique;
    }

    set searchPaysZoneGeographique(value: PaysZoneGeographiqueVo) {
        this._searchPaysZoneGeographique = value;
       }

}
