import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeEnseignementVo} from '../model/TypeEnseignement.model';


@Injectable({
  providedIn: 'root'
})
export class TypeEnseignementService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeEnseignement/';
        })
    }
     private _typeEnseignements: Array<TypeEnseignementVo> ;
     private _selectedTypeEnseignement: TypeEnseignementVo;
     private _typeEnseignementSelections: Array<TypeEnseignementVo>;
     private _createTypeEnseignementDialog: boolean;
     private _editTypeEnseignementDialog: boolean;
     private _viewTypeEnseignementDialog: boolean;
     public editTypeEnseignement$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeEnseignement:TypeEnseignementVo ;

    // methods
    public archiver(typeEnseignement: TypeEnseignementVo): Observable<TypeEnseignementVo> {
        return this.http.put<TypeEnseignementVo>(this.API + 'archiver/' ,typeEnseignement);
    }
    public desarchiver(typeEnseignement: TypeEnseignementVo): Observable<TypeEnseignementVo> {
    return this.http.put<TypeEnseignementVo>(this.API + 'desarchiver/' ,typeEnseignement);
    }

    public findAll(){
     return this.http.get<Array<TypeEnseignementVo>>(this.API);
    }

    public save(): Observable<TypeEnseignementVo> {
           return this.http.post<TypeEnseignementVo>(this.API, {...this.selectedTypeEnseignement,dateCreation: moment(this.selectedTypeEnseignement.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeEnseignement: TypeEnseignementVo) {
         return this.http.delete<number>(this.API + 'id/' + typeEnseignement.id);
    }


    public edit(): Observable<TypeEnseignementVo> {
        return this.http.put<TypeEnseignementVo>(this.API, this.selectedTypeEnseignement);
    }


     public findByCriteria(typeEnseignement:TypeEnseignementVo):Observable<Array<TypeEnseignementVo>>{
           return this.http.post<Array<TypeEnseignementVo>>(this.API +'search', typeEnseignement);
    }

   public findByIdWithAssociatedList(typeEnseignement:TypeEnseignementVo):Observable<TypeEnseignementVo>{
         return this.http.get<TypeEnseignementVo>(this.API + 'detail/id/' +typeEnseignement.id);
    }

    // getters and setters


    get typeEnseignements(): Array<TypeEnseignementVo> {
    if(this._typeEnseignements==null){
    this._typeEnseignements=new Array<TypeEnseignementVo>();
    }
return this._typeEnseignements;
       }

    set typeEnseignements(value: Array<TypeEnseignementVo>) {
        this._typeEnseignements = value;
       }

    get selectedTypeEnseignement(): TypeEnseignementVo {
    if(this._selectedTypeEnseignement==null){
    this._selectedTypeEnseignement=new TypeEnseignementVo();
    }
           return this._selectedTypeEnseignement;
       }

    set selectedTypeEnseignement(value: TypeEnseignementVo) {
        this._selectedTypeEnseignement = value;
       }

    get typeEnseignementSelections(): Array<TypeEnseignementVo> {
    if(this._typeEnseignementSelections==null){
    this._typeEnseignementSelections=new Array<TypeEnseignementVo>();
    }
        return this._typeEnseignementSelections;
       }


    set typeEnseignementSelections(value: Array<TypeEnseignementVo>) {
        this._typeEnseignementSelections = value;
       }

    get createTypeEnseignementDialog(): boolean {
        return this._createTypeEnseignementDialog;
       }

    set createTypeEnseignementDialog(value: boolean) {
        this._createTypeEnseignementDialog = value;
       }

    get editTypeEnseignementDialog(): boolean {
        return this._editTypeEnseignementDialog;
       }

    set editTypeEnseignementDialog(value: boolean) {
        this._editTypeEnseignementDialog = value;
       }

    get viewTypeEnseignementDialog(): boolean {
        return this._viewTypeEnseignementDialog;
       }

    set viewTypeEnseignementDialog(value: boolean) {
        this._viewTypeEnseignementDialog = value;
       }

     get searchTypeEnseignement(): TypeEnseignementVo {
     if(this._searchTypeEnseignement==null){
    this._searchTypeEnseignement=new TypeEnseignementVo();
    }
        return this._searchTypeEnseignement;
    }

    set searchTypeEnseignement(value: TypeEnseignementVo) {
        this._searchTypeEnseignement = value;
       }

}
