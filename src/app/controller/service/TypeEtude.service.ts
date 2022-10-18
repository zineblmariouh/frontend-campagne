import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeEtudeVo} from '../model/TypeEtude.model';


@Injectable({
  providedIn: 'root'
})
export class TypeEtudeService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeEtude/';
        })
    }
     private _typeEtudes: Array<TypeEtudeVo> ;
     private _selectedTypeEtude: TypeEtudeVo;
     private _typeEtudeSelections: Array<TypeEtudeVo>;
     private _createTypeEtudeDialog: boolean;
     private _editTypeEtudeDialog: boolean;
     private _viewTypeEtudeDialog: boolean;
     public editTypeEtude$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeEtude:TypeEtudeVo ;

    // methods
    public archiver(typeEtude: TypeEtudeVo): Observable<TypeEtudeVo> {
        return this.http.put<TypeEtudeVo>(this.API + 'archiver/' ,typeEtude);
    }
    public desarchiver(typeEtude: TypeEtudeVo): Observable<TypeEtudeVo> {
    return this.http.put<TypeEtudeVo>(this.API + 'desarchiver/' ,typeEtude);
    }

    public findAll(){
     return this.http.get<Array<TypeEtudeVo>>(this.API);
    }

    public save(): Observable<TypeEtudeVo> {
           return this.http.post<TypeEtudeVo>(this.API, {...this.selectedTypeEtude,dateCreation: moment(this.selectedTypeEtude.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeEtude: TypeEtudeVo) {
         return this.http.delete<number>(this.API + 'id/' + typeEtude.id);
    }


    public edit(): Observable<TypeEtudeVo> {
        return this.http.put<TypeEtudeVo>(this.API, this.selectedTypeEtude);
    }


     public findByCriteria(typeEtude:TypeEtudeVo):Observable<Array<TypeEtudeVo>>{
           return this.http.post<Array<TypeEtudeVo>>(this.API +'search', typeEtude);
    }

   public findByIdWithAssociatedList(typeEtude:TypeEtudeVo):Observable<TypeEtudeVo>{
         return this.http.get<TypeEtudeVo>(this.API + 'detail/id/' +typeEtude.id);
    }

    // getters and setters


    get typeEtudes(): Array<TypeEtudeVo> {
    if(this._typeEtudes==null){
    this._typeEtudes=new Array<TypeEtudeVo>();
    }
return this._typeEtudes;
       }

    set typeEtudes(value: Array<TypeEtudeVo>) {
        this._typeEtudes = value;
       }

    get selectedTypeEtude(): TypeEtudeVo {
    if(this._selectedTypeEtude==null){
    this._selectedTypeEtude=new TypeEtudeVo();
    }
           return this._selectedTypeEtude;
       }

    set selectedTypeEtude(value: TypeEtudeVo) {
        this._selectedTypeEtude = value;
       }

    get typeEtudeSelections(): Array<TypeEtudeVo> {
    if(this._typeEtudeSelections==null){
    this._typeEtudeSelections=new Array<TypeEtudeVo>();
    }
        return this._typeEtudeSelections;
       }


    set typeEtudeSelections(value: Array<TypeEtudeVo>) {
        this._typeEtudeSelections = value;
       }

    get createTypeEtudeDialog(): boolean {
        return this._createTypeEtudeDialog;
       }

    set createTypeEtudeDialog(value: boolean) {
        this._createTypeEtudeDialog = value;
       }

    get editTypeEtudeDialog(): boolean {
        return this._editTypeEtudeDialog;
       }

    set editTypeEtudeDialog(value: boolean) {
        this._editTypeEtudeDialog = value;
       }

    get viewTypeEtudeDialog(): boolean {
        return this._viewTypeEtudeDialog;
       }

    set viewTypeEtudeDialog(value: boolean) {
        this._viewTypeEtudeDialog = value;
       }

     get searchTypeEtude(): TypeEtudeVo {
     if(this._searchTypeEtude==null){
    this._searchTypeEtude=new TypeEtudeVo();
    }
        return this._searchTypeEtude;
    }

    set searchTypeEtude(value: TypeEtudeVo) {
        this._searchTypeEtude = value;
       }

}
