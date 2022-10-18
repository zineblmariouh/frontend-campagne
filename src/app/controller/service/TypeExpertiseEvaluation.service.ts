import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeExpertiseEvaluationVo} from '../model/TypeExpertiseEvaluation.model';


@Injectable({
  providedIn: 'root'
})
export class TypeExpertiseEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/typeExpertiseEvaluation/';
        })
    }
     private _typeExpertiseEvaluations: Array<TypeExpertiseEvaluationVo> ;
     private _selectedTypeExpertiseEvaluation: TypeExpertiseEvaluationVo;
     private _typeExpertiseEvaluationSelections: Array<TypeExpertiseEvaluationVo>;
     private _createTypeExpertiseEvaluationDialog: boolean;
     private _editTypeExpertiseEvaluationDialog: boolean;
     private _viewTypeExpertiseEvaluationDialog: boolean;
     public editTypeExpertiseEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTypeExpertiseEvaluation:TypeExpertiseEvaluationVo ;

    // methods
    public archiver(typeExpertiseEvaluation: TypeExpertiseEvaluationVo): Observable<TypeExpertiseEvaluationVo> {
        return this.http.put<TypeExpertiseEvaluationVo>(this.API + 'archiver/' ,typeExpertiseEvaluation);
    }
    public desarchiver(typeExpertiseEvaluation: TypeExpertiseEvaluationVo): Observable<TypeExpertiseEvaluationVo> {
    return this.http.put<TypeExpertiseEvaluationVo>(this.API + 'desarchiver/' ,typeExpertiseEvaluation);
    }

    public findAll(){
     return this.http.get<Array<TypeExpertiseEvaluationVo>>(this.API);
    }

    public save(): Observable<TypeExpertiseEvaluationVo> {
           return this.http.post<TypeExpertiseEvaluationVo>(this.API, {...this.selectedTypeExpertiseEvaluation,dateCreation: moment(this.selectedTypeExpertiseEvaluation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(typeExpertiseEvaluation: TypeExpertiseEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + typeExpertiseEvaluation.id);
    }


    public edit(): Observable<TypeExpertiseEvaluationVo> {
        return this.http.put<TypeExpertiseEvaluationVo>(this.API, this.selectedTypeExpertiseEvaluation);
    }


     public findByCriteria(typeExpertiseEvaluation:TypeExpertiseEvaluationVo):Observable<Array<TypeExpertiseEvaluationVo>>{
           return this.http.post<Array<TypeExpertiseEvaluationVo>>(this.API +'search', typeExpertiseEvaluation);
    }

   public findByIdWithAssociatedList(typeExpertiseEvaluation:TypeExpertiseEvaluationVo):Observable<TypeExpertiseEvaluationVo>{
         return this.http.get<TypeExpertiseEvaluationVo>(this.API + 'detail/id/' +typeExpertiseEvaluation.id);
    }

    // getters and setters


    get typeExpertiseEvaluations(): Array<TypeExpertiseEvaluationVo> {
    if(this._typeExpertiseEvaluations==null){
    this._typeExpertiseEvaluations=new Array<TypeExpertiseEvaluationVo>();
    }
return this._typeExpertiseEvaluations;
       }

    set typeExpertiseEvaluations(value: Array<TypeExpertiseEvaluationVo>) {
        this._typeExpertiseEvaluations = value;
       }

    get selectedTypeExpertiseEvaluation(): TypeExpertiseEvaluationVo {
    if(this._selectedTypeExpertiseEvaluation==null){
    this._selectedTypeExpertiseEvaluation=new TypeExpertiseEvaluationVo();
    }
           return this._selectedTypeExpertiseEvaluation;
       }

    set selectedTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this._selectedTypeExpertiseEvaluation = value;
       }

    get typeExpertiseEvaluationSelections(): Array<TypeExpertiseEvaluationVo> {
    if(this._typeExpertiseEvaluationSelections==null){
    this._typeExpertiseEvaluationSelections=new Array<TypeExpertiseEvaluationVo>();
    }
        return this._typeExpertiseEvaluationSelections;
       }


    set typeExpertiseEvaluationSelections(value: Array<TypeExpertiseEvaluationVo>) {
        this._typeExpertiseEvaluationSelections = value;
       }

    get createTypeExpertiseEvaluationDialog(): boolean {
        return this._createTypeExpertiseEvaluationDialog;
       }

    set createTypeExpertiseEvaluationDialog(value: boolean) {
        this._createTypeExpertiseEvaluationDialog = value;
       }

    get editTypeExpertiseEvaluationDialog(): boolean {
        return this._editTypeExpertiseEvaluationDialog;
       }

    set editTypeExpertiseEvaluationDialog(value: boolean) {
        this._editTypeExpertiseEvaluationDialog = value;
       }

    get viewTypeExpertiseEvaluationDialog(): boolean {
        return this._viewTypeExpertiseEvaluationDialog;
       }

    set viewTypeExpertiseEvaluationDialog(value: boolean) {
        this._viewTypeExpertiseEvaluationDialog = value;
       }

     get searchTypeExpertiseEvaluation(): TypeExpertiseEvaluationVo {
     if(this._searchTypeExpertiseEvaluation==null){
    this._searchTypeExpertiseEvaluation=new TypeExpertiseEvaluationVo();
    }
        return this._searchTypeExpertiseEvaluation;
    }

    set searchTypeExpertiseEvaluation(value: TypeExpertiseEvaluationVo) {
        this._searchTypeExpertiseEvaluation = value;
       }

}
