import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeOutilPedagogiqueVo} from '../model/TypeOutilPedagogique.model';
import {TypeOutilVo} from '../model/TypeOutil.model';
import {OutilPedagogiqueVo} from '../model/OutilPedagogique.model';


@Injectable({
  providedIn: 'root'
})
export class TypeOutilPedagogiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeOutilPedagogique/';
        })
    }
     private _typeOutilPedagogiques: Array<TypeOutilPedagogiqueVo> ;
     private _selectedTypeOutilPedagogique: TypeOutilPedagogiqueVo;
     private _typeOutilPedagogiqueSelections: Array<TypeOutilPedagogiqueVo>;
     private _createTypeOutilPedagogiqueDialog: boolean;
     private _editTypeOutilPedagogiqueDialog: boolean;
     private _viewTypeOutilPedagogiqueDialog: boolean;
     public editTypeOutilPedagogique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeOutilPedagogique:TypeOutilPedagogiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeOutilPedagogiqueVo>>(this.API);
    }

    public save(): Observable<TypeOutilPedagogiqueVo> {
         return this.http.post<TypeOutilPedagogiqueVo>(this.API, this.selectedTypeOutilPedagogique);
    }

    delete(typeOutilPedagogique: TypeOutilPedagogiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + typeOutilPedagogique.id);
    }


    public edit(): Observable<TypeOutilPedagogiqueVo> {
        return this.http.put<TypeOutilPedagogiqueVo>(this.API, this.selectedTypeOutilPedagogique);
    }


     public findByCriteria(typeOutilPedagogique:TypeOutilPedagogiqueVo):Observable<Array<TypeOutilPedagogiqueVo>>{
           return this.http.post<Array<TypeOutilPedagogiqueVo>>(this.API +'search', typeOutilPedagogique);
    }

   public findByIdWithAssociatedList(typeOutilPedagogique:TypeOutilPedagogiqueVo):Observable<TypeOutilPedagogiqueVo>{
         return this.http.get<TypeOutilPedagogiqueVo>(this.API + 'detail/id/' +typeOutilPedagogique.id);
    }

    // getters and setters


    get typeOutilPedagogiques(): Array<TypeOutilPedagogiqueVo> {
    if(this._typeOutilPedagogiques==null){
    this._typeOutilPedagogiques=new Array<TypeOutilPedagogiqueVo>();
    }
return this._typeOutilPedagogiques;
       }

    set typeOutilPedagogiques(value: Array<TypeOutilPedagogiqueVo>) {
        this._typeOutilPedagogiques = value;
       }

    get selectedTypeOutilPedagogique(): TypeOutilPedagogiqueVo {
    if(this._selectedTypeOutilPedagogique==null){
    this._selectedTypeOutilPedagogique=new TypeOutilPedagogiqueVo();
    }
           return this._selectedTypeOutilPedagogique;
       }

    set selectedTypeOutilPedagogique(value: TypeOutilPedagogiqueVo) {
        this._selectedTypeOutilPedagogique = value;
       }

    get typeOutilPedagogiqueSelections(): Array<TypeOutilPedagogiqueVo> {
    if(this._typeOutilPedagogiqueSelections==null){
    this._typeOutilPedagogiqueSelections=new Array<TypeOutilPedagogiqueVo>();
    }
        return this._typeOutilPedagogiqueSelections;
       }


    set typeOutilPedagogiqueSelections(value: Array<TypeOutilPedagogiqueVo>) {
        this._typeOutilPedagogiqueSelections = value;
       }

    get createTypeOutilPedagogiqueDialog(): boolean {
        return this._createTypeOutilPedagogiqueDialog;
       }

    set createTypeOutilPedagogiqueDialog(value: boolean) {
        this._createTypeOutilPedagogiqueDialog = value;
       }

    get editTypeOutilPedagogiqueDialog(): boolean {
        return this._editTypeOutilPedagogiqueDialog;
       }

    set editTypeOutilPedagogiqueDialog(value: boolean) {
        this._editTypeOutilPedagogiqueDialog = value;
       }

    get viewTypeOutilPedagogiqueDialog(): boolean {
        return this._viewTypeOutilPedagogiqueDialog;
       }

    set viewTypeOutilPedagogiqueDialog(value: boolean) {
        this._viewTypeOutilPedagogiqueDialog = value;
       }

     get searchTypeOutilPedagogique(): TypeOutilPedagogiqueVo {
     if(this._searchTypeOutilPedagogique==null){
    this._searchTypeOutilPedagogique=new TypeOutilPedagogiqueVo();
    }
        return this._searchTypeOutilPedagogique;
    }

    set searchTypeOutilPedagogique(value: TypeOutilPedagogiqueVo) {
        this._searchTypeOutilPedagogique = value;
       }

}
