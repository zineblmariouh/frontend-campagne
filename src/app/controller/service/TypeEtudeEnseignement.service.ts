import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeEtudeEnseignementVo} from '../model/TypeEtudeEnseignement.model';
import {TypeEtudeVo} from '../model/TypeEtude.model';
import {EnseignementVo} from '../model/Enseignement.model';


@Injectable({
  providedIn: 'root'
})
export class TypeEtudeEnseignementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeEtudeEnseignement/';
        })
    }
     private _typeEtudeEnseignements: Array<TypeEtudeEnseignementVo> ;
     private _selectedTypeEtudeEnseignement: TypeEtudeEnseignementVo;
     private _typeEtudeEnseignementSelections: Array<TypeEtudeEnseignementVo>;
     private _createTypeEtudeEnseignementDialog: boolean;
     private _editTypeEtudeEnseignementDialog: boolean;
     private _viewTypeEtudeEnseignementDialog: boolean;
     public editTypeEtudeEnseignement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeEtudeEnseignement:TypeEtudeEnseignementVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeEtudeEnseignementVo>>(this.API);
    }

    public save(): Observable<TypeEtudeEnseignementVo> {
         return this.http.post<TypeEtudeEnseignementVo>(this.API, this.selectedTypeEtudeEnseignement);
    }

    delete(typeEtudeEnseignement: TypeEtudeEnseignementVo) {
         return this.http.delete<number>(this.API + 'id/' + typeEtudeEnseignement.id);
    }


    public edit(): Observable<TypeEtudeEnseignementVo> {
        return this.http.put<TypeEtudeEnseignementVo>(this.API, this.selectedTypeEtudeEnseignement);
    }


     public findByCriteria(typeEtudeEnseignement:TypeEtudeEnseignementVo):Observable<Array<TypeEtudeEnseignementVo>>{
           return this.http.post<Array<TypeEtudeEnseignementVo>>(this.API +'search', typeEtudeEnseignement);
    }

   public findByIdWithAssociatedList(typeEtudeEnseignement:TypeEtudeEnseignementVo):Observable<TypeEtudeEnseignementVo>{
         return this.http.get<TypeEtudeEnseignementVo>(this.API + 'detail/id/' +typeEtudeEnseignement.id);
    }

    // getters and setters


    get typeEtudeEnseignements(): Array<TypeEtudeEnseignementVo> {
    if(this._typeEtudeEnseignements==null){
    this._typeEtudeEnseignements=new Array<TypeEtudeEnseignementVo>();
    }
return this._typeEtudeEnseignements;
       }

    set typeEtudeEnseignements(value: Array<TypeEtudeEnseignementVo>) {
        this._typeEtudeEnseignements = value;
       }

    get selectedTypeEtudeEnseignement(): TypeEtudeEnseignementVo {
    if(this._selectedTypeEtudeEnseignement==null){
    this._selectedTypeEtudeEnseignement=new TypeEtudeEnseignementVo();
    }
           return this._selectedTypeEtudeEnseignement;
       }

    set selectedTypeEtudeEnseignement(value: TypeEtudeEnseignementVo) {
        this._selectedTypeEtudeEnseignement = value;
       }

    get typeEtudeEnseignementSelections(): Array<TypeEtudeEnseignementVo> {
    if(this._typeEtudeEnseignementSelections==null){
    this._typeEtudeEnseignementSelections=new Array<TypeEtudeEnseignementVo>();
    }
        return this._typeEtudeEnseignementSelections;
       }


    set typeEtudeEnseignementSelections(value: Array<TypeEtudeEnseignementVo>) {
        this._typeEtudeEnseignementSelections = value;
       }

    get createTypeEtudeEnseignementDialog(): boolean {
        return this._createTypeEtudeEnseignementDialog;
       }

    set createTypeEtudeEnseignementDialog(value: boolean) {
        this._createTypeEtudeEnseignementDialog = value;
       }

    get editTypeEtudeEnseignementDialog(): boolean {
        return this._editTypeEtudeEnseignementDialog;
       }

    set editTypeEtudeEnseignementDialog(value: boolean) {
        this._editTypeEtudeEnseignementDialog = value;
       }

    get viewTypeEtudeEnseignementDialog(): boolean {
        return this._viewTypeEtudeEnseignementDialog;
       }

    set viewTypeEtudeEnseignementDialog(value: boolean) {
        this._viewTypeEtudeEnseignementDialog = value;
       }

     get searchTypeEtudeEnseignement(): TypeEtudeEnseignementVo {
     if(this._searchTypeEtudeEnseignement==null){
    this._searchTypeEtudeEnseignement=new TypeEtudeEnseignementVo();
    }
        return this._searchTypeEtudeEnseignement;
    }

    set searchTypeEtudeEnseignement(value: TypeEtudeEnseignementVo) {
        this._searchTypeEtudeEnseignement = value;
       }

}
