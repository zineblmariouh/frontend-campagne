import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeUtilisateurSavoirConcuVo} from '../model/TypeUtilisateurSavoirConcu.model';
import {TypeUtilisateurVo} from '../model/TypeUtilisateur.model';
import {DeveloppementDeSavoirEtInnovationScientifiqueVo} from '../model/DeveloppementDeSavoirEtInnovationScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class TypeUtilisateurSavoirConcuService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeUtilisateurSavoirConcu/';
        })
    }
     private _typeUtilisateurSavoirConcus: Array<TypeUtilisateurSavoirConcuVo> ;
     private _selectedTypeUtilisateurSavoirConcu: TypeUtilisateurSavoirConcuVo;
     private _typeUtilisateurSavoirConcuSelections: Array<TypeUtilisateurSavoirConcuVo>;
     private _createTypeUtilisateurSavoirConcuDialog: boolean;
     private _editTypeUtilisateurSavoirConcuDialog: boolean;
     private _viewTypeUtilisateurSavoirConcuDialog: boolean;
     public editTypeUtilisateurSavoirConcu$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeUtilisateurSavoirConcu:TypeUtilisateurSavoirConcuVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeUtilisateurSavoirConcuVo>>(this.API);
    }

    public save(): Observable<TypeUtilisateurSavoirConcuVo> {
         return this.http.post<TypeUtilisateurSavoirConcuVo>(this.API, this.selectedTypeUtilisateurSavoirConcu);
    }

    delete(typeUtilisateurSavoirConcu: TypeUtilisateurSavoirConcuVo) {
         return this.http.delete<number>(this.API + 'id/' + typeUtilisateurSavoirConcu.id);
    }


    public edit(): Observable<TypeUtilisateurSavoirConcuVo> {
        return this.http.put<TypeUtilisateurSavoirConcuVo>(this.API, this.selectedTypeUtilisateurSavoirConcu);
    }


     public findByCriteria(typeUtilisateurSavoirConcu:TypeUtilisateurSavoirConcuVo):Observable<Array<TypeUtilisateurSavoirConcuVo>>{
           return this.http.post<Array<TypeUtilisateurSavoirConcuVo>>(this.API +'search', typeUtilisateurSavoirConcu);
    }

   public findByIdWithAssociatedList(typeUtilisateurSavoirConcu:TypeUtilisateurSavoirConcuVo):Observable<TypeUtilisateurSavoirConcuVo>{
         return this.http.get<TypeUtilisateurSavoirConcuVo>(this.API + 'detail/id/' +typeUtilisateurSavoirConcu.id);
    }

    // getters and setters


    get typeUtilisateurSavoirConcus(): Array<TypeUtilisateurSavoirConcuVo> {
    if(this._typeUtilisateurSavoirConcus==null){
    this._typeUtilisateurSavoirConcus=new Array<TypeUtilisateurSavoirConcuVo>();
    }
return this._typeUtilisateurSavoirConcus;
       }

    set typeUtilisateurSavoirConcus(value: Array<TypeUtilisateurSavoirConcuVo>) {
        this._typeUtilisateurSavoirConcus = value;
       }

    get selectedTypeUtilisateurSavoirConcu(): TypeUtilisateurSavoirConcuVo {
    if(this._selectedTypeUtilisateurSavoirConcu==null){
    this._selectedTypeUtilisateurSavoirConcu=new TypeUtilisateurSavoirConcuVo();
    }
           return this._selectedTypeUtilisateurSavoirConcu;
       }

    set selectedTypeUtilisateurSavoirConcu(value: TypeUtilisateurSavoirConcuVo) {
        this._selectedTypeUtilisateurSavoirConcu = value;
       }

    get typeUtilisateurSavoirConcuSelections(): Array<TypeUtilisateurSavoirConcuVo> {
    if(this._typeUtilisateurSavoirConcuSelections==null){
    this._typeUtilisateurSavoirConcuSelections=new Array<TypeUtilisateurSavoirConcuVo>();
    }
        return this._typeUtilisateurSavoirConcuSelections;
       }


    set typeUtilisateurSavoirConcuSelections(value: Array<TypeUtilisateurSavoirConcuVo>) {
        this._typeUtilisateurSavoirConcuSelections = value;
       }

    get createTypeUtilisateurSavoirConcuDialog(): boolean {
        return this._createTypeUtilisateurSavoirConcuDialog;
       }

    set createTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this._createTypeUtilisateurSavoirConcuDialog = value;
       }

    get editTypeUtilisateurSavoirConcuDialog(): boolean {
        return this._editTypeUtilisateurSavoirConcuDialog;
       }

    set editTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this._editTypeUtilisateurSavoirConcuDialog = value;
       }

    get viewTypeUtilisateurSavoirConcuDialog(): boolean {
        return this._viewTypeUtilisateurSavoirConcuDialog;
       }

    set viewTypeUtilisateurSavoirConcuDialog(value: boolean) {
        this._viewTypeUtilisateurSavoirConcuDialog = value;
       }

     get searchTypeUtilisateurSavoirConcu(): TypeUtilisateurSavoirConcuVo {
     if(this._searchTypeUtilisateurSavoirConcu==null){
    this._searchTypeUtilisateurSavoirConcu=new TypeUtilisateurSavoirConcuVo();
    }
        return this._searchTypeUtilisateurSavoirConcu;
    }

    set searchTypeUtilisateurSavoirConcu(value: TypeUtilisateurSavoirConcuVo) {
        this._searchTypeUtilisateurSavoirConcu = value;
       }

}
