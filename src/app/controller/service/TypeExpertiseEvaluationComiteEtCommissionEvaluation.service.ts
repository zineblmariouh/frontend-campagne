import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationVo} from '../model/ComiteEtCommissionEvaluation.model';
import {TypeExpertiseEvaluationVo} from '../model/TypeExpertiseEvaluation.model';


@Injectable({
  providedIn: 'root'
})
export class TypeExpertiseEvaluationComiteEtCommissionEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeExpertiseEvaluationComiteEtCommissionEvaluation/';
        })
    }
     private _typeExpertiseEvaluationComiteEtCommissionEvaluations: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> ;
     private _selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo;
     private _typeExpertiseEvaluationComiteEtCommissionEvaluationSelections: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>;
     private _createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog: boolean;
     private _editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog: boolean;
     private _viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog: boolean;
     public editTypeExpertiseEvaluationComiteEtCommissionEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeExpertiseEvaluationComiteEtCommissionEvaluation:TypeExpertiseEvaluationComiteEtCommissionEvaluationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>>(this.API);
    }

    public save(): Observable<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
         return this.http.post<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>(this.API, this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation);
    }

    delete(typeExpertiseEvaluationComiteEtCommissionEvaluation: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + typeExpertiseEvaluationComiteEtCommissionEvaluation.id);
    }


    public edit(): Observable<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
        return this.http.put<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>(this.API, this.selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation);
    }


     public findByCriteria(typeExpertiseEvaluationComiteEtCommissionEvaluation:TypeExpertiseEvaluationComiteEtCommissionEvaluationVo):Observable<Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>>{
           return this.http.post<Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>>(this.API +'search', typeExpertiseEvaluationComiteEtCommissionEvaluation);
    }

   public findByIdWithAssociatedList(typeExpertiseEvaluationComiteEtCommissionEvaluation:TypeExpertiseEvaluationComiteEtCommissionEvaluationVo):Observable<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>{
         return this.http.get<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>(this.API + 'detail/id/' +typeExpertiseEvaluationComiteEtCommissionEvaluation.id);
    }

    // getters and setters


    get typeExpertiseEvaluationComiteEtCommissionEvaluations(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
    if(this._typeExpertiseEvaluationComiteEtCommissionEvaluations==null){
    this._typeExpertiseEvaluationComiteEtCommissionEvaluations=new Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>();
    }
return this._typeExpertiseEvaluationComiteEtCommissionEvaluations;
       }

    set typeExpertiseEvaluationComiteEtCommissionEvaluations(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
        this._typeExpertiseEvaluationComiteEtCommissionEvaluations = value;
       }

    get selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation(): TypeExpertiseEvaluationComiteEtCommissionEvaluationVo {
    if(this._selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation==null){
    this._selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation=new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
    }
           return this._selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation;
       }

    set selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation(value: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
        this._selectedTypeExpertiseEvaluationComiteEtCommissionEvaluation = value;
       }

    get typeExpertiseEvaluationComiteEtCommissionEvaluationSelections(): Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo> {
    if(this._typeExpertiseEvaluationComiteEtCommissionEvaluationSelections==null){
    this._typeExpertiseEvaluationComiteEtCommissionEvaluationSelections=new Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>();
    }
        return this._typeExpertiseEvaluationComiteEtCommissionEvaluationSelections;
       }


    set typeExpertiseEvaluationComiteEtCommissionEvaluationSelections(value: Array<TypeExpertiseEvaluationComiteEtCommissionEvaluationVo>) {
        this._typeExpertiseEvaluationComiteEtCommissionEvaluationSelections = value;
       }

    get createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(): boolean {
        return this._createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;
       }

    set createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this._createTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = value;
       }

    get editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(): boolean {
        return this._editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;
       }

    set editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this._editTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = value;
       }

    get viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(): boolean {
        return this._viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog;
       }

    set viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog(value: boolean) {
        this._viewTypeExpertiseEvaluationComiteEtCommissionEvaluationDialog = value;
       }

     get searchTypeExpertiseEvaluationComiteEtCommissionEvaluation(): TypeExpertiseEvaluationComiteEtCommissionEvaluationVo {
     if(this._searchTypeExpertiseEvaluationComiteEtCommissionEvaluation==null){
    this._searchTypeExpertiseEvaluationComiteEtCommissionEvaluation=new TypeExpertiseEvaluationComiteEtCommissionEvaluationVo();
    }
        return this._searchTypeExpertiseEvaluationComiteEtCommissionEvaluation;
    }

    set searchTypeExpertiseEvaluationComiteEtCommissionEvaluation(value: TypeExpertiseEvaluationComiteEtCommissionEvaluationVo) {
        this._searchTypeExpertiseEvaluationComiteEtCommissionEvaluation = value;
       }

}
