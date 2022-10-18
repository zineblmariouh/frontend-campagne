import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RoleComiteEtCommissionEvaluationVo} from '../model/RoleComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationVo} from '../model/ComiteEtCommissionEvaluation.model';
import {RoleEvaluationVo} from '../model/RoleEvaluation.model';


@Injectable({
  providedIn: 'root'
})
export class RoleComiteEtCommissionEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/roleComiteEtCommissionEvaluation/';
        })
    }
     private _roleComiteEtCommissionEvaluations: Array<RoleComiteEtCommissionEvaluationVo> ;
     private _selectedRoleComiteEtCommissionEvaluation: RoleComiteEtCommissionEvaluationVo;
     private _roleComiteEtCommissionEvaluationSelections: Array<RoleComiteEtCommissionEvaluationVo>;
     private _createRoleComiteEtCommissionEvaluationDialog: boolean;
     private _editRoleComiteEtCommissionEvaluationDialog: boolean;
     private _viewRoleComiteEtCommissionEvaluationDialog: boolean;
     public editRoleComiteEtCommissionEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRoleComiteEtCommissionEvaluation:RoleComiteEtCommissionEvaluationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<RoleComiteEtCommissionEvaluationVo>>(this.API);
    }

    public save(): Observable<RoleComiteEtCommissionEvaluationVo> {
         return this.http.post<RoleComiteEtCommissionEvaluationVo>(this.API, this.selectedRoleComiteEtCommissionEvaluation);
    }

    delete(roleComiteEtCommissionEvaluation: RoleComiteEtCommissionEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + roleComiteEtCommissionEvaluation.id);
    }


    public edit(): Observable<RoleComiteEtCommissionEvaluationVo> {
        return this.http.put<RoleComiteEtCommissionEvaluationVo>(this.API, this.selectedRoleComiteEtCommissionEvaluation);
    }


     public findByCriteria(roleComiteEtCommissionEvaluation:RoleComiteEtCommissionEvaluationVo):Observable<Array<RoleComiteEtCommissionEvaluationVo>>{
           return this.http.post<Array<RoleComiteEtCommissionEvaluationVo>>(this.API +'search', roleComiteEtCommissionEvaluation);
    }

   public findByIdWithAssociatedList(roleComiteEtCommissionEvaluation:RoleComiteEtCommissionEvaluationVo):Observable<RoleComiteEtCommissionEvaluationVo>{
         return this.http.get<RoleComiteEtCommissionEvaluationVo>(this.API + 'detail/id/' +roleComiteEtCommissionEvaluation.id);
    }

    // getters and setters


    get roleComiteEtCommissionEvaluations(): Array<RoleComiteEtCommissionEvaluationVo> {
    if(this._roleComiteEtCommissionEvaluations==null){
    this._roleComiteEtCommissionEvaluations=new Array<RoleComiteEtCommissionEvaluationVo>();
    }
return this._roleComiteEtCommissionEvaluations;
       }

    set roleComiteEtCommissionEvaluations(value: Array<RoleComiteEtCommissionEvaluationVo>) {
        this._roleComiteEtCommissionEvaluations = value;
       }

    get selectedRoleComiteEtCommissionEvaluation(): RoleComiteEtCommissionEvaluationVo {
    if(this._selectedRoleComiteEtCommissionEvaluation==null){
    this._selectedRoleComiteEtCommissionEvaluation=new RoleComiteEtCommissionEvaluationVo();
    }
           return this._selectedRoleComiteEtCommissionEvaluation;
       }

    set selectedRoleComiteEtCommissionEvaluation(value: RoleComiteEtCommissionEvaluationVo) {
        this._selectedRoleComiteEtCommissionEvaluation = value;
       }

    get roleComiteEtCommissionEvaluationSelections(): Array<RoleComiteEtCommissionEvaluationVo> {
    if(this._roleComiteEtCommissionEvaluationSelections==null){
    this._roleComiteEtCommissionEvaluationSelections=new Array<RoleComiteEtCommissionEvaluationVo>();
    }
        return this._roleComiteEtCommissionEvaluationSelections;
       }


    set roleComiteEtCommissionEvaluationSelections(value: Array<RoleComiteEtCommissionEvaluationVo>) {
        this._roleComiteEtCommissionEvaluationSelections = value;
       }

    get createRoleComiteEtCommissionEvaluationDialog(): boolean {
        return this._createRoleComiteEtCommissionEvaluationDialog;
       }

    set createRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this._createRoleComiteEtCommissionEvaluationDialog = value;
       }

    get editRoleComiteEtCommissionEvaluationDialog(): boolean {
        return this._editRoleComiteEtCommissionEvaluationDialog;
       }

    set editRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this._editRoleComiteEtCommissionEvaluationDialog = value;
       }

    get viewRoleComiteEtCommissionEvaluationDialog(): boolean {
        return this._viewRoleComiteEtCommissionEvaluationDialog;
       }

    set viewRoleComiteEtCommissionEvaluationDialog(value: boolean) {
        this._viewRoleComiteEtCommissionEvaluationDialog = value;
       }

     get searchRoleComiteEtCommissionEvaluation(): RoleComiteEtCommissionEvaluationVo {
     if(this._searchRoleComiteEtCommissionEvaluation==null){
    this._searchRoleComiteEtCommissionEvaluation=new RoleComiteEtCommissionEvaluationVo();
    }
        return this._searchRoleComiteEtCommissionEvaluation;
    }

    set searchRoleComiteEtCommissionEvaluation(value: RoleComiteEtCommissionEvaluationVo) {
        this._searchRoleComiteEtCommissionEvaluation = value;
       }

}
