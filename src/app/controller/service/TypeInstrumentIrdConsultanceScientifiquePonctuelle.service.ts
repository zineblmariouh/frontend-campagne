import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeInstrumentIrdConsultanceScientifiquePonctuelleVo} from '../model/TypeInstrumentIrdConsultanceScientifiquePonctuelle.model';
import {TypeInstrumentIrdVo} from '../model/TypeInstrumentIrd.model';
import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';


@Injectable({
  providedIn: 'root'
})
export class TypeInstrumentIrdConsultanceScientifiquePonctuelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeInstrumentIrdConsultanceScientifiquePonctuelle/';
        })
    }
     private _typeInstrumentIrdConsultanceScientifiquePonctuelles: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> ;
     private _selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo;
     private _typeInstrumentIrdConsultanceScientifiquePonctuelleSelections: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>;
     private _createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog: boolean;
     private _editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog: boolean;
     private _viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog: boolean;
     public editTypeInstrumentIrdConsultanceScientifiquePonctuelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeInstrumentIrdConsultanceScientifiquePonctuelle:TypeInstrumentIrdConsultanceScientifiquePonctuelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>>(this.API);
    }

    public save(): Observable<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
         return this.http.post<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>(this.API, this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle);
    }

    delete(typeInstrumentIrdConsultanceScientifiquePonctuelle: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {
         return this.http.delete<number>(this.API + 'id/' + typeInstrumentIrdConsultanceScientifiquePonctuelle.id);
    }


    public edit(): Observable<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
        return this.http.put<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>(this.API, this.selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle);
    }


     public findByCriteria(typeInstrumentIrdConsultanceScientifiquePonctuelle:TypeInstrumentIrdConsultanceScientifiquePonctuelleVo):Observable<Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>>{
           return this.http.post<Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>>(this.API +'search', typeInstrumentIrdConsultanceScientifiquePonctuelle);
    }

   public findByIdWithAssociatedList(typeInstrumentIrdConsultanceScientifiquePonctuelle:TypeInstrumentIrdConsultanceScientifiquePonctuelleVo):Observable<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>{
         return this.http.get<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>(this.API + 'detail/id/' +typeInstrumentIrdConsultanceScientifiquePonctuelle.id);
    }

    // getters and setters


    get typeInstrumentIrdConsultanceScientifiquePonctuelles(): Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
    if(this._typeInstrumentIrdConsultanceScientifiquePonctuelles==null){
    this._typeInstrumentIrdConsultanceScientifiquePonctuelles=new Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>();
    }
return this._typeInstrumentIrdConsultanceScientifiquePonctuelles;
       }

    set typeInstrumentIrdConsultanceScientifiquePonctuelles(value: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this._typeInstrumentIrdConsultanceScientifiquePonctuelles = value;
       }

    get selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle(): TypeInstrumentIrdConsultanceScientifiquePonctuelleVo {
    if(this._selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle==null){
    this._selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle=new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();
    }
           return this._selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle;
       }

    set selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle(value: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this._selectedTypeInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

    get typeInstrumentIrdConsultanceScientifiquePonctuelleSelections(): Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo> {
    if(this._typeInstrumentIrdConsultanceScientifiquePonctuelleSelections==null){
    this._typeInstrumentIrdConsultanceScientifiquePonctuelleSelections=new Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>();
    }
        return this._typeInstrumentIrdConsultanceScientifiquePonctuelleSelections;
       }


    set typeInstrumentIrdConsultanceScientifiquePonctuelleSelections(value: Array<TypeInstrumentIrdConsultanceScientifiquePonctuelleVo>) {
        this._typeInstrumentIrdConsultanceScientifiquePonctuelleSelections = value;
       }

    get createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }

    set createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._createTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }

    get editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }

    set editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._editTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }

    get viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog;
       }

    set viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._viewTypeInstrumentIrdConsultanceScientifiquePonctuelleDialog = value;
       }

     get searchTypeInstrumentIrdConsultanceScientifiquePonctuelle(): TypeInstrumentIrdConsultanceScientifiquePonctuelleVo {
     if(this._searchTypeInstrumentIrdConsultanceScientifiquePonctuelle==null){
    this._searchTypeInstrumentIrdConsultanceScientifiquePonctuelle=new TypeInstrumentIrdConsultanceScientifiquePonctuelleVo();
    }
        return this._searchTypeInstrumentIrdConsultanceScientifiquePonctuelle;
    }

    set searchTypeInstrumentIrdConsultanceScientifiquePonctuelle(value: TypeInstrumentIrdConsultanceScientifiquePonctuelleVo) {
        this._searchTypeInstrumentIrdConsultanceScientifiquePonctuelle = value;
       }

}
