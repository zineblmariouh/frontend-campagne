import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NiveauResponsabilitePedagogiqueVo} from '../model/NiveauResponsabilitePedagogique.model';


@Injectable({
  providedIn: 'root'
})
export class NiveauResponsabilitePedagogiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/niveauResponsabilitePedagogique/';
        })
    }
     private _niveauResponsabilitePedagogiques: Array<NiveauResponsabilitePedagogiqueVo> ;
     private _selectedNiveauResponsabilitePedagogique: NiveauResponsabilitePedagogiqueVo;
     private _niveauResponsabilitePedagogiqueSelections: Array<NiveauResponsabilitePedagogiqueVo>;
     private _createNiveauResponsabilitePedagogiqueDialog: boolean;
     private _editNiveauResponsabilitePedagogiqueDialog: boolean;
     private _viewNiveauResponsabilitePedagogiqueDialog: boolean;
     public editNiveauResponsabilitePedagogique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNiveauResponsabilitePedagogique:NiveauResponsabilitePedagogiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<NiveauResponsabilitePedagogiqueVo>>(this.API);
    }

    public save(): Observable<NiveauResponsabilitePedagogiqueVo> {
         return this.http.post<NiveauResponsabilitePedagogiqueVo>(this.API, this.selectedNiveauResponsabilitePedagogique);
    }

    delete(niveauResponsabilitePedagogique: NiveauResponsabilitePedagogiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + niveauResponsabilitePedagogique.id);
    }


    public edit(): Observable<NiveauResponsabilitePedagogiqueVo> {
        return this.http.put<NiveauResponsabilitePedagogiqueVo>(this.API, this.selectedNiveauResponsabilitePedagogique);
    }


     public findByCriteria(niveauResponsabilitePedagogique:NiveauResponsabilitePedagogiqueVo):Observable<Array<NiveauResponsabilitePedagogiqueVo>>{
           return this.http.post<Array<NiveauResponsabilitePedagogiqueVo>>(this.API +'search', niveauResponsabilitePedagogique);
    }

   public findByIdWithAssociatedList(niveauResponsabilitePedagogique:NiveauResponsabilitePedagogiqueVo):Observable<NiveauResponsabilitePedagogiqueVo>{
         return this.http.get<NiveauResponsabilitePedagogiqueVo>(this.API + 'detail/id/' +niveauResponsabilitePedagogique.id);
    }

    // getters and setters


    get niveauResponsabilitePedagogiques(): Array<NiveauResponsabilitePedagogiqueVo> {
    if(this._niveauResponsabilitePedagogiques==null){
    this._niveauResponsabilitePedagogiques=new Array<NiveauResponsabilitePedagogiqueVo>();
    }
return this._niveauResponsabilitePedagogiques;
       }

    set niveauResponsabilitePedagogiques(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this._niveauResponsabilitePedagogiques = value;
       }

    get selectedNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
    if(this._selectedNiveauResponsabilitePedagogique==null){
    this._selectedNiveauResponsabilitePedagogique=new NiveauResponsabilitePedagogiqueVo();
    }
           return this._selectedNiveauResponsabilitePedagogique;
       }

    set selectedNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this._selectedNiveauResponsabilitePedagogique = value;
       }

    get niveauResponsabilitePedagogiqueSelections(): Array<NiveauResponsabilitePedagogiqueVo> {
    if(this._niveauResponsabilitePedagogiqueSelections==null){
    this._niveauResponsabilitePedagogiqueSelections=new Array<NiveauResponsabilitePedagogiqueVo>();
    }
        return this._niveauResponsabilitePedagogiqueSelections;
       }


    set niveauResponsabilitePedagogiqueSelections(value: Array<NiveauResponsabilitePedagogiqueVo>) {
        this._niveauResponsabilitePedagogiqueSelections = value;
       }

    get createNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this._createNiveauResponsabilitePedagogiqueDialog;
       }

    set createNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this._createNiveauResponsabilitePedagogiqueDialog = value;
       }

    get editNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this._editNiveauResponsabilitePedagogiqueDialog;
       }

    set editNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this._editNiveauResponsabilitePedagogiqueDialog = value;
       }

    get viewNiveauResponsabilitePedagogiqueDialog(): boolean {
        return this._viewNiveauResponsabilitePedagogiqueDialog;
       }

    set viewNiveauResponsabilitePedagogiqueDialog(value: boolean) {
        this._viewNiveauResponsabilitePedagogiqueDialog = value;
       }

     get searchNiveauResponsabilitePedagogique(): NiveauResponsabilitePedagogiqueVo {
     if(this._searchNiveauResponsabilitePedagogique==null){
    this._searchNiveauResponsabilitePedagogique=new NiveauResponsabilitePedagogiqueVo();
    }
        return this._searchNiveauResponsabilitePedagogique;
    }

    set searchNiveauResponsabilitePedagogique(value: NiveauResponsabilitePedagogiqueVo) {
        this._searchNiveauResponsabilitePedagogique = value;
       }

}
