import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypePubliqueVo} from '../model/TypePublique.model';


@Injectable({
  providedIn: 'root'
})
export class TypePubliqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typePublique/';
        })
    }
     private _typePubliques: Array<TypePubliqueVo> ;
     private _selectedTypePublique: TypePubliqueVo;
     private _typePubliqueSelections: Array<TypePubliqueVo>;
     private _createTypePubliqueDialog: boolean;
     private _editTypePubliqueDialog: boolean;
     private _viewTypePubliqueDialog: boolean;
     public editTypePublique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypePublique:TypePubliqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypePubliqueVo>>(this.API);
    }

    public save(): Observable<TypePubliqueVo> {
         return this.http.post<TypePubliqueVo>(this.API, this.selectedTypePublique);
    }

    delete(typePublique: TypePubliqueVo) {
         return this.http.delete<number>(this.API + 'id/' + typePublique.id);
    }


    public edit(): Observable<TypePubliqueVo> {
        return this.http.put<TypePubliqueVo>(this.API, this.selectedTypePublique);
    }


     public findByCriteria(typePublique:TypePubliqueVo):Observable<Array<TypePubliqueVo>>{
           return this.http.post<Array<TypePubliqueVo>>(this.API +'search', typePublique);
    }

   public findByIdWithAssociatedList(typePublique:TypePubliqueVo):Observable<TypePubliqueVo>{
         return this.http.get<TypePubliqueVo>(this.API + 'detail/id/' +typePublique.id);
    }

    // getters and setters


    get typePubliques(): Array<TypePubliqueVo> {
    if(this._typePubliques==null){
    this._typePubliques=new Array<TypePubliqueVo>();
    }
return this._typePubliques;
       }

    set typePubliques(value: Array<TypePubliqueVo>) {
        this._typePubliques = value;
       }

    get selectedTypePublique(): TypePubliqueVo {
    if(this._selectedTypePublique==null){
    this._selectedTypePublique=new TypePubliqueVo();
    }
           return this._selectedTypePublique;
       }

    set selectedTypePublique(value: TypePubliqueVo) {
        this._selectedTypePublique = value;
       }

    get typePubliqueSelections(): Array<TypePubliqueVo> {
    if(this._typePubliqueSelections==null){
    this._typePubliqueSelections=new Array<TypePubliqueVo>();
    }
        return this._typePubliqueSelections;
       }


    set typePubliqueSelections(value: Array<TypePubliqueVo>) {
        this._typePubliqueSelections = value;
       }

    get createTypePubliqueDialog(): boolean {
        return this._createTypePubliqueDialog;
       }

    set createTypePubliqueDialog(value: boolean) {
        this._createTypePubliqueDialog = value;
       }

    get editTypePubliqueDialog(): boolean {
        return this._editTypePubliqueDialog;
       }

    set editTypePubliqueDialog(value: boolean) {
        this._editTypePubliqueDialog = value;
       }

    get viewTypePubliqueDialog(): boolean {
        return this._viewTypePubliqueDialog;
       }

    set viewTypePubliqueDialog(value: boolean) {
        this._viewTypePubliqueDialog = value;
       }

     get searchTypePublique(): TypePubliqueVo {
     if(this._searchTypePublique==null){
    this._searchTypePublique=new TypePubliqueVo();
    }
        return this._searchTypePublique;
    }

    set searchTypePublique(value: TypePubliqueVo) {
        this._searchTypePublique = value;
       }

}
