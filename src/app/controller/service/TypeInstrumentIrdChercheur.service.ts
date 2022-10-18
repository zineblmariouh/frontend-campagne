import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeInstrumentIrdChercheurVo} from '../model/TypeInstrumentIrdChercheur.model';
import {TypeInstrumentIrdVo} from '../model/TypeInstrumentIrd.model';
import {ChercheurVo} from '../model/Chercheur.model';


@Injectable({
  providedIn: 'root'
})
export class TypeInstrumentIrdChercheurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeInstrumentIrdChercheur/';
        })
    }
     private _typeInstrumentIrdChercheurs: Array<TypeInstrumentIrdChercheurVo> ;
     private _selectedTypeInstrumentIrdChercheur: TypeInstrumentIrdChercheurVo;
     private _typeInstrumentIrdChercheurSelections: Array<TypeInstrumentIrdChercheurVo>;
     private _createTypeInstrumentIrdChercheurDialog: boolean;
     private _editTypeInstrumentIrdChercheurDialog: boolean;
     private _viewTypeInstrumentIrdChercheurDialog: boolean;
     public editTypeInstrumentIrdChercheur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeInstrumentIrdChercheur:TypeInstrumentIrdChercheurVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeInstrumentIrdChercheurVo>>(this.API);
    }

    public save(): Observable<TypeInstrumentIrdChercheurVo> {
         return this.http.post<TypeInstrumentIrdChercheurVo>(this.API, this.selectedTypeInstrumentIrdChercheur);
    }

    delete(typeInstrumentIrdChercheur: TypeInstrumentIrdChercheurVo) {
         return this.http.delete<number>(this.API + 'id/' + typeInstrumentIrdChercheur.id);
    }


    public edit(): Observable<TypeInstrumentIrdChercheurVo> {
        return this.http.put<TypeInstrumentIrdChercheurVo>(this.API, this.selectedTypeInstrumentIrdChercheur);
    }


     public findByCriteria(typeInstrumentIrdChercheur:TypeInstrumentIrdChercheurVo):Observable<Array<TypeInstrumentIrdChercheurVo>>{
           return this.http.post<Array<TypeInstrumentIrdChercheurVo>>(this.API +'search', typeInstrumentIrdChercheur);
    }

   public findByIdWithAssociatedList(typeInstrumentIrdChercheur:TypeInstrumentIrdChercheurVo):Observable<TypeInstrumentIrdChercheurVo>{
         return this.http.get<TypeInstrumentIrdChercheurVo>(this.API + 'detail/id/' +typeInstrumentIrdChercheur.id);
    }

    // getters and setters


    get typeInstrumentIrdChercheurs(): Array<TypeInstrumentIrdChercheurVo> {
    if(this._typeInstrumentIrdChercheurs==null){
    this._typeInstrumentIrdChercheurs=new Array<TypeInstrumentIrdChercheurVo>();
    }
return this._typeInstrumentIrdChercheurs;
       }

    set typeInstrumentIrdChercheurs(value: Array<TypeInstrumentIrdChercheurVo>) {
        this._typeInstrumentIrdChercheurs = value;
       }

    get selectedTypeInstrumentIrdChercheur(): TypeInstrumentIrdChercheurVo {
    if(this._selectedTypeInstrumentIrdChercheur==null){
    this._selectedTypeInstrumentIrdChercheur=new TypeInstrumentIrdChercheurVo();
    }
           return this._selectedTypeInstrumentIrdChercheur;
       }

    set selectedTypeInstrumentIrdChercheur(value: TypeInstrumentIrdChercheurVo) {
        this._selectedTypeInstrumentIrdChercheur = value;
       }

    get typeInstrumentIrdChercheurSelections(): Array<TypeInstrumentIrdChercheurVo> {
    if(this._typeInstrumentIrdChercheurSelections==null){
    this._typeInstrumentIrdChercheurSelections=new Array<TypeInstrumentIrdChercheurVo>();
    }
        return this._typeInstrumentIrdChercheurSelections;
       }


    set typeInstrumentIrdChercheurSelections(value: Array<TypeInstrumentIrdChercheurVo>) {
        this._typeInstrumentIrdChercheurSelections = value;
       }

    get createTypeInstrumentIrdChercheurDialog(): boolean {
        return this._createTypeInstrumentIrdChercheurDialog;
       }

    set createTypeInstrumentIrdChercheurDialog(value: boolean) {
        this._createTypeInstrumentIrdChercheurDialog = value;
       }

    get editTypeInstrumentIrdChercheurDialog(): boolean {
        return this._editTypeInstrumentIrdChercheurDialog;
       }

    set editTypeInstrumentIrdChercheurDialog(value: boolean) {
        this._editTypeInstrumentIrdChercheurDialog = value;
       }

    get viewTypeInstrumentIrdChercheurDialog(): boolean {
        return this._viewTypeInstrumentIrdChercheurDialog;
       }

    set viewTypeInstrumentIrdChercheurDialog(value: boolean) {
        this._viewTypeInstrumentIrdChercheurDialog = value;
       }

     get searchTypeInstrumentIrdChercheur(): TypeInstrumentIrdChercheurVo {
     if(this._searchTypeInstrumentIrdChercheur==null){
    this._searchTypeInstrumentIrdChercheur=new TypeInstrumentIrdChercheurVo();
    }
        return this._searchTypeInstrumentIrdChercheur;
    }

    set searchTypeInstrumentIrdChercheur(value: TypeInstrumentIrdChercheurVo) {
        this._searchTypeInstrumentIrdChercheur = value;
       }

}
