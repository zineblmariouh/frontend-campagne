import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {RoleEvaluationVo} from '../model/RoleEvaluation.model';


@Injectable({
  providedIn: 'root'
})
export class RoleEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/roleEvaluation/';
        })
    }
     private _roleEvaluations: Array<RoleEvaluationVo> ;
     private _selectedRoleEvaluation: RoleEvaluationVo;
     private _roleEvaluationSelections: Array<RoleEvaluationVo>;
     private _createRoleEvaluationDialog: boolean;
     private _editRoleEvaluationDialog: boolean;
     private _viewRoleEvaluationDialog: boolean;
     public editRoleEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchRoleEvaluation:RoleEvaluationVo ;

    // methods
    public archiver(roleEvaluation: RoleEvaluationVo): Observable<RoleEvaluationVo> {
        return this.http.put<RoleEvaluationVo>(this.API + 'archiver/' ,roleEvaluation);
    }
    public desarchiver(roleEvaluation: RoleEvaluationVo): Observable<RoleEvaluationVo> {
    return this.http.put<RoleEvaluationVo>(this.API + 'desarchiver/' ,roleEvaluation);
    }

    public findAll(){
     return this.http.get<Array<RoleEvaluationVo>>(this.API);
    }

    public save(): Observable<RoleEvaluationVo> {
           return this.http.post<RoleEvaluationVo>(this.API, {...this.selectedRoleEvaluation,dateCreation: moment(this.selectedRoleEvaluation.dateCreation).format("YYYY-MM-DD")});
    }

    delete(roleEvaluation: RoleEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + roleEvaluation.id);
    }


    public edit(): Observable<RoleEvaluationVo> {
        return this.http.put<RoleEvaluationVo>(this.API, this.selectedRoleEvaluation);
    }


     public findByCriteria(roleEvaluation:RoleEvaluationVo):Observable<Array<RoleEvaluationVo>>{
           return this.http.post<Array<RoleEvaluationVo>>(this.API +'search', roleEvaluation);
    }

   public findByIdWithAssociatedList(roleEvaluation:RoleEvaluationVo):Observable<RoleEvaluationVo>{
         return this.http.get<RoleEvaluationVo>(this.API + 'detail/id/' +roleEvaluation.id);
    }

    // getters and setters


    get roleEvaluations(): Array<RoleEvaluationVo> {
    if(this._roleEvaluations==null){
    this._roleEvaluations=new Array<RoleEvaluationVo>();
    }
return this._roleEvaluations;
       }

    set roleEvaluations(value: Array<RoleEvaluationVo>) {
        this._roleEvaluations = value;
       }

    get selectedRoleEvaluation(): RoleEvaluationVo {
    if(this._selectedRoleEvaluation==null){
    this._selectedRoleEvaluation=new RoleEvaluationVo();
    }
           return this._selectedRoleEvaluation;
       }

    set selectedRoleEvaluation(value: RoleEvaluationVo) {
        this._selectedRoleEvaluation = value;
       }

    get roleEvaluationSelections(): Array<RoleEvaluationVo> {
    if(this._roleEvaluationSelections==null){
    this._roleEvaluationSelections=new Array<RoleEvaluationVo>();
    }
        return this._roleEvaluationSelections;
       }


    set roleEvaluationSelections(value: Array<RoleEvaluationVo>) {
        this._roleEvaluationSelections = value;
       }

    get createRoleEvaluationDialog(): boolean {
        return this._createRoleEvaluationDialog;
       }

    set createRoleEvaluationDialog(value: boolean) {
        this._createRoleEvaluationDialog = value;
       }

    get editRoleEvaluationDialog(): boolean {
        return this._editRoleEvaluationDialog;
       }

    set editRoleEvaluationDialog(value: boolean) {
        this._editRoleEvaluationDialog = value;
       }

    get viewRoleEvaluationDialog(): boolean {
        return this._viewRoleEvaluationDialog;
       }

    set viewRoleEvaluationDialog(value: boolean) {
        this._viewRoleEvaluationDialog = value;
       }

     get searchRoleEvaluation(): RoleEvaluationVo {
     if(this._searchRoleEvaluation==null){
    this._searchRoleEvaluation=new RoleEvaluationVo();
    }
        return this._searchRoleEvaluation;
    }

    set searchRoleEvaluation(value: RoleEvaluationVo) {
        this._searchRoleEvaluation = value;
       }

}
