import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../model/EnjeuxIrdComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationVo} from '../model/ComiteEtCommissionEvaluation.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class EnjeuxIrdComiteEtCommissionEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enjeuxIrdComiteEtCommissionEvaluation/';
        })
    }
     private _enjeuxIrdComiteEtCommissionEvaluations: Array<EnjeuxIrdComiteEtCommissionEvaluationVo> ;
     private _selectedEnjeuxIrdComiteEtCommissionEvaluation: EnjeuxIrdComiteEtCommissionEvaluationVo;
     private _enjeuxIrdComiteEtCommissionEvaluationSelections: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>;
     private _createEnjeuxIrdComiteEtCommissionEvaluationDialog: boolean;
     private _editEnjeuxIrdComiteEtCommissionEvaluationDialog: boolean;
     private _viewEnjeuxIrdComiteEtCommissionEvaluationDialog: boolean;
     public editEnjeuxIrdComiteEtCommissionEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnjeuxIrdComiteEtCommissionEvaluation:EnjeuxIrdComiteEtCommissionEvaluationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnjeuxIrdComiteEtCommissionEvaluationVo>>(this.API);
    }

    public save(): Observable<EnjeuxIrdComiteEtCommissionEvaluationVo> {
         return this.http.post<EnjeuxIrdComiteEtCommissionEvaluationVo>(this.API, this.selectedEnjeuxIrdComiteEtCommissionEvaluation);
    }

    delete(enjeuxIrdComiteEtCommissionEvaluation: EnjeuxIrdComiteEtCommissionEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + enjeuxIrdComiteEtCommissionEvaluation.id);
    }


    public edit(): Observable<EnjeuxIrdComiteEtCommissionEvaluationVo> {
        return this.http.put<EnjeuxIrdComiteEtCommissionEvaluationVo>(this.API, this.selectedEnjeuxIrdComiteEtCommissionEvaluation);
    }


     public findByCriteria(enjeuxIrdComiteEtCommissionEvaluation:EnjeuxIrdComiteEtCommissionEvaluationVo):Observable<Array<EnjeuxIrdComiteEtCommissionEvaluationVo>>{
           return this.http.post<Array<EnjeuxIrdComiteEtCommissionEvaluationVo>>(this.API +'search', enjeuxIrdComiteEtCommissionEvaluation);
    }

   public findByIdWithAssociatedList(enjeuxIrdComiteEtCommissionEvaluation:EnjeuxIrdComiteEtCommissionEvaluationVo):Observable<EnjeuxIrdComiteEtCommissionEvaluationVo>{
         return this.http.get<EnjeuxIrdComiteEtCommissionEvaluationVo>(this.API + 'detail/id/' +enjeuxIrdComiteEtCommissionEvaluation.id);
    }

    // getters and setters


    get enjeuxIrdComiteEtCommissionEvaluations(): Array<EnjeuxIrdComiteEtCommissionEvaluationVo> {
    if(this._enjeuxIrdComiteEtCommissionEvaluations==null){
    this._enjeuxIrdComiteEtCommissionEvaluations=new Array<EnjeuxIrdComiteEtCommissionEvaluationVo>();
    }
return this._enjeuxIrdComiteEtCommissionEvaluations;
       }

    set enjeuxIrdComiteEtCommissionEvaluations(value: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>) {
        this._enjeuxIrdComiteEtCommissionEvaluations = value;
       }

    get selectedEnjeuxIrdComiteEtCommissionEvaluation(): EnjeuxIrdComiteEtCommissionEvaluationVo {
    if(this._selectedEnjeuxIrdComiteEtCommissionEvaluation==null){
    this._selectedEnjeuxIrdComiteEtCommissionEvaluation=new EnjeuxIrdComiteEtCommissionEvaluationVo();
    }
           return this._selectedEnjeuxIrdComiteEtCommissionEvaluation;
       }

    set selectedEnjeuxIrdComiteEtCommissionEvaluation(value: EnjeuxIrdComiteEtCommissionEvaluationVo) {
        this._selectedEnjeuxIrdComiteEtCommissionEvaluation = value;
       }

    get enjeuxIrdComiteEtCommissionEvaluationSelections(): Array<EnjeuxIrdComiteEtCommissionEvaluationVo> {
    if(this._enjeuxIrdComiteEtCommissionEvaluationSelections==null){
    this._enjeuxIrdComiteEtCommissionEvaluationSelections=new Array<EnjeuxIrdComiteEtCommissionEvaluationVo>();
    }
        return this._enjeuxIrdComiteEtCommissionEvaluationSelections;
       }


    set enjeuxIrdComiteEtCommissionEvaluationSelections(value: Array<EnjeuxIrdComiteEtCommissionEvaluationVo>) {
        this._enjeuxIrdComiteEtCommissionEvaluationSelections = value;
       }

    get createEnjeuxIrdComiteEtCommissionEvaluationDialog(): boolean {
        return this._createEnjeuxIrdComiteEtCommissionEvaluationDialog;
       }

    set createEnjeuxIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this._createEnjeuxIrdComiteEtCommissionEvaluationDialog = value;
       }

    get editEnjeuxIrdComiteEtCommissionEvaluationDialog(): boolean {
        return this._editEnjeuxIrdComiteEtCommissionEvaluationDialog;
       }

    set editEnjeuxIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this._editEnjeuxIrdComiteEtCommissionEvaluationDialog = value;
       }

    get viewEnjeuxIrdComiteEtCommissionEvaluationDialog(): boolean {
        return this._viewEnjeuxIrdComiteEtCommissionEvaluationDialog;
       }

    set viewEnjeuxIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this._viewEnjeuxIrdComiteEtCommissionEvaluationDialog = value;
       }

     get searchEnjeuxIrdComiteEtCommissionEvaluation(): EnjeuxIrdComiteEtCommissionEvaluationVo {
     if(this._searchEnjeuxIrdComiteEtCommissionEvaluation==null){
    this._searchEnjeuxIrdComiteEtCommissionEvaluation=new EnjeuxIrdComiteEtCommissionEvaluationVo();
    }
        return this._searchEnjeuxIrdComiteEtCommissionEvaluation;
    }

    set searchEnjeuxIrdComiteEtCommissionEvaluation(value: EnjeuxIrdComiteEtCommissionEvaluationVo) {
        this._searchEnjeuxIrdComiteEtCommissionEvaluation = value;
       }

}
