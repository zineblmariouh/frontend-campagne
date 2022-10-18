import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypePubliqueRencontreGrandPubliqueJeunePubliqueVo} from '../model/TypePubliqueRencontreGrandPubliqueJeunePublique.model';
import {RencontreGrandPubliqueJeunePubliqueVo} from '../model/RencontreGrandPubliqueJeunePublique.model';
import {TypePubliqueVo} from '../model/TypePublique.model';


@Injectable({
  providedIn: 'root'
})
export class TypePubliqueRencontreGrandPubliqueJeunePubliqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typePubliqueRencontreGrandPubliqueJeunePublique/';
        })
    }
     private _typePubliqueRencontreGrandPubliqueJeunePubliques: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> ;
     private _selectedTypePubliqueRencontreGrandPubliqueJeunePublique: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo;
     private _typePubliqueRencontreGrandPubliqueJeunePubliqueSelections: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>;
     private _createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     private _editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     private _viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog: boolean;
     public editTypePubliqueRencontreGrandPubliqueJeunePublique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypePubliqueRencontreGrandPubliqueJeunePublique:TypePubliqueRencontreGrandPubliqueJeunePubliqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>>(this.API);
    }

    public save(): Observable<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
         return this.http.post<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>(this.API, this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique);
    }

    delete(typePubliqueRencontreGrandPubliqueJeunePublique: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
         return this.http.delete<number>(this.API + 'id/' + typePubliqueRencontreGrandPubliqueJeunePublique.id);
    }


    public edit(): Observable<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
        return this.http.put<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>(this.API, this.selectedTypePubliqueRencontreGrandPubliqueJeunePublique);
    }


     public findByCriteria(typePubliqueRencontreGrandPubliqueJeunePublique:TypePubliqueRencontreGrandPubliqueJeunePubliqueVo):Observable<Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>>{
           return this.http.post<Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>>(this.API +'search', typePubliqueRencontreGrandPubliqueJeunePublique);
    }

   public findByIdWithAssociatedList(typePubliqueRencontreGrandPubliqueJeunePublique:TypePubliqueRencontreGrandPubliqueJeunePubliqueVo):Observable<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>{
         return this.http.get<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>(this.API + 'detail/id/' +typePubliqueRencontreGrandPubliqueJeunePublique.id);
    }

    // getters and setters


    get typePubliqueRencontreGrandPubliqueJeunePubliques(): Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
    if(this._typePubliqueRencontreGrandPubliqueJeunePubliques==null){
    this._typePubliqueRencontreGrandPubliqueJeunePubliques=new Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>();
    }
return this._typePubliqueRencontreGrandPubliqueJeunePubliques;
       }

    set typePubliqueRencontreGrandPubliqueJeunePubliques(value: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>) {
        this._typePubliqueRencontreGrandPubliqueJeunePubliques = value;
       }

    get selectedTypePubliqueRencontreGrandPubliqueJeunePublique(): TypePubliqueRencontreGrandPubliqueJeunePubliqueVo {
    if(this._selectedTypePubliqueRencontreGrandPubliqueJeunePublique==null){
    this._selectedTypePubliqueRencontreGrandPubliqueJeunePublique=new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
    }
           return this._selectedTypePubliqueRencontreGrandPubliqueJeunePublique;
       }

    set selectedTypePubliqueRencontreGrandPubliqueJeunePublique(value: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
        this._selectedTypePubliqueRencontreGrandPubliqueJeunePublique = value;
       }

    get typePubliqueRencontreGrandPubliqueJeunePubliqueSelections(): Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo> {
    if(this._typePubliqueRencontreGrandPubliqueJeunePubliqueSelections==null){
    this._typePubliqueRencontreGrandPubliqueJeunePubliqueSelections=new Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>();
    }
        return this._typePubliqueRencontreGrandPubliqueJeunePubliqueSelections;
       }


    set typePubliqueRencontreGrandPubliqueJeunePubliqueSelections(value: Array<TypePubliqueRencontreGrandPubliqueJeunePubliqueVo>) {
        this._typePubliqueRencontreGrandPubliqueJeunePubliqueSelections = value;
       }

    get createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._createTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

    get editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._editTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

    get viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(): boolean {
        return this._viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog;
       }

    set viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog(value: boolean) {
        this._viewTypePubliqueRencontreGrandPubliqueJeunePubliqueDialog = value;
       }

     get searchTypePubliqueRencontreGrandPubliqueJeunePublique(): TypePubliqueRencontreGrandPubliqueJeunePubliqueVo {
     if(this._searchTypePubliqueRencontreGrandPubliqueJeunePublique==null){
    this._searchTypePubliqueRencontreGrandPubliqueJeunePublique=new TypePubliqueRencontreGrandPubliqueJeunePubliqueVo();
    }
        return this._searchTypePubliqueRencontreGrandPubliqueJeunePublique;
    }

    set searchTypePubliqueRencontreGrandPubliqueJeunePublique(value: TypePubliqueRencontreGrandPubliqueJeunePubliqueVo) {
        this._searchTypePubliqueRencontreGrandPubliqueJeunePublique = value;
       }

}
