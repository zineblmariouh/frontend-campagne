import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeUtilisateurVo} from '../model/TypeUtilisateur.model';


@Injectable({
  providedIn: 'root'
})
export class TypeUtilisateurService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeUtilisateur/';
        })
    }
     private _typeUtilisateurs: Array<TypeUtilisateurVo> ;
     private _selectedTypeUtilisateur: TypeUtilisateurVo;
     private _typeUtilisateurSelections: Array<TypeUtilisateurVo>;
     private _createTypeUtilisateurDialog: boolean;
     private _editTypeUtilisateurDialog: boolean;
     private _viewTypeUtilisateurDialog: boolean;
     public editTypeUtilisateur$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeUtilisateur:TypeUtilisateurVo ;

    // methods
    public archiver(typeUtilisateur: TypeUtilisateurVo): Observable<TypeUtilisateurVo> {
        return this.http.put<TypeUtilisateurVo>(this.API + 'archiver/' ,typeUtilisateur);
    }
    public desarchiver(typeUtilisateur: TypeUtilisateurVo): Observable<TypeUtilisateurVo> {
    return this.http.put<TypeUtilisateurVo>(this.API + 'desarchiver/' ,typeUtilisateur);
    }

    public findAll(){
     return this.http.get<Array<TypeUtilisateurVo>>(this.API);
    }

    public save(): Observable<TypeUtilisateurVo> {
           return this.http.post<TypeUtilisateurVo>(this.API, {...this.selectedTypeUtilisateur,dateCreation: moment(this.selectedTypeUtilisateur.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeUtilisateur: TypeUtilisateurVo) {
         return this.http.delete<number>(this.API + 'id/' + typeUtilisateur.id);
    }


    public edit(): Observable<TypeUtilisateurVo> {
        return this.http.put<TypeUtilisateurVo>(this.API, this.selectedTypeUtilisateur);
    }


     public findByCriteria(typeUtilisateur:TypeUtilisateurVo):Observable<Array<TypeUtilisateurVo>>{
           return this.http.post<Array<TypeUtilisateurVo>>(this.API +'search', typeUtilisateur);
    }

   public findByIdWithAssociatedList(typeUtilisateur:TypeUtilisateurVo):Observable<TypeUtilisateurVo>{
         return this.http.get<TypeUtilisateurVo>(this.API + 'detail/id/' +typeUtilisateur.id);
    }

    // getters and setters


    get typeUtilisateurs(): Array<TypeUtilisateurVo> {
    if(this._typeUtilisateurs==null){
    this._typeUtilisateurs=new Array<TypeUtilisateurVo>();
    }
return this._typeUtilisateurs;
       }

    set typeUtilisateurs(value: Array<TypeUtilisateurVo>) {
        this._typeUtilisateurs = value;
       }

    get selectedTypeUtilisateur(): TypeUtilisateurVo {
    if(this._selectedTypeUtilisateur==null){
    this._selectedTypeUtilisateur=new TypeUtilisateurVo();
    }
           return this._selectedTypeUtilisateur;
       }

    set selectedTypeUtilisateur(value: TypeUtilisateurVo) {
        this._selectedTypeUtilisateur = value;
       }

    get typeUtilisateurSelections(): Array<TypeUtilisateurVo> {
    if(this._typeUtilisateurSelections==null){
    this._typeUtilisateurSelections=new Array<TypeUtilisateurVo>();
    }
        return this._typeUtilisateurSelections;
       }


    set typeUtilisateurSelections(value: Array<TypeUtilisateurVo>) {
        this._typeUtilisateurSelections = value;
       }

    get createTypeUtilisateurDialog(): boolean {
        return this._createTypeUtilisateurDialog;
       }

    set createTypeUtilisateurDialog(value: boolean) {
        this._createTypeUtilisateurDialog = value;
       }

    get editTypeUtilisateurDialog(): boolean {
        return this._editTypeUtilisateurDialog;
       }

    set editTypeUtilisateurDialog(value: boolean) {
        this._editTypeUtilisateurDialog = value;
       }

    get viewTypeUtilisateurDialog(): boolean {
        return this._viewTypeUtilisateurDialog;
       }

    set viewTypeUtilisateurDialog(value: boolean) {
        this._viewTypeUtilisateurDialog = value;
       }

     get searchTypeUtilisateur(): TypeUtilisateurVo {
     if(this._searchTypeUtilisateur==null){
    this._searchTypeUtilisateur=new TypeUtilisateurVo();
    }
        return this._searchTypeUtilisateur;
    }

    set searchTypeUtilisateur(value: TypeUtilisateurVo) {
        this._searchTypeUtilisateur = value;
       }

}
