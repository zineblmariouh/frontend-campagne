import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationVo} from '../model/ComiteEtCommissionEvaluation.model';
import {DisciplineScientifiqueVo} from '../model/DisciplineScientifique.model';


@Injectable({
  providedIn: 'root'
})
export class DisciplineScientifiqueComiteEtCommissionEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/disciplineScientifiqueComiteEtCommissionEvaluation/';
        })
    }
     private _disciplineScientifiqueComiteEtCommissionEvaluations: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> ;
     private _selectedDisciplineScientifiqueComiteEtCommissionEvaluation: DisciplineScientifiqueComiteEtCommissionEvaluationVo;
     private _disciplineScientifiqueComiteEtCommissionEvaluationSelections: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>;
     private _createDisciplineScientifiqueComiteEtCommissionEvaluationDialog: boolean;
     private _editDisciplineScientifiqueComiteEtCommissionEvaluationDialog: boolean;
     private _viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog: boolean;
     public editDisciplineScientifiqueComiteEtCommissionEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchDisciplineScientifiqueComiteEtCommissionEvaluation:DisciplineScientifiqueComiteEtCommissionEvaluationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>>(this.API);
    }

    public save(): Observable<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
         return this.http.post<DisciplineScientifiqueComiteEtCommissionEvaluationVo>(this.API, this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation);
    }

    delete(disciplineScientifiqueComiteEtCommissionEvaluation: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + disciplineScientifiqueComiteEtCommissionEvaluation.id);
    }


    public edit(): Observable<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
        return this.http.put<DisciplineScientifiqueComiteEtCommissionEvaluationVo>(this.API, this.selectedDisciplineScientifiqueComiteEtCommissionEvaluation);
    }


     public findByCriteria(disciplineScientifiqueComiteEtCommissionEvaluation:DisciplineScientifiqueComiteEtCommissionEvaluationVo):Observable<Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>>{
           return this.http.post<Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>>(this.API +'search', disciplineScientifiqueComiteEtCommissionEvaluation);
    }

   public findByIdWithAssociatedList(disciplineScientifiqueComiteEtCommissionEvaluation:DisciplineScientifiqueComiteEtCommissionEvaluationVo):Observable<DisciplineScientifiqueComiteEtCommissionEvaluationVo>{
         return this.http.get<DisciplineScientifiqueComiteEtCommissionEvaluationVo>(this.API + 'detail/id/' +disciplineScientifiqueComiteEtCommissionEvaluation.id);
    }

    // getters and setters


    get disciplineScientifiqueComiteEtCommissionEvaluations(): Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
    if(this._disciplineScientifiqueComiteEtCommissionEvaluations==null){
    this._disciplineScientifiqueComiteEtCommissionEvaluations=new Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>();
    }
return this._disciplineScientifiqueComiteEtCommissionEvaluations;
       }

    set disciplineScientifiqueComiteEtCommissionEvaluations(value: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>) {
        this._disciplineScientifiqueComiteEtCommissionEvaluations = value;
       }

    get selectedDisciplineScientifiqueComiteEtCommissionEvaluation(): DisciplineScientifiqueComiteEtCommissionEvaluationVo {
    if(this._selectedDisciplineScientifiqueComiteEtCommissionEvaluation==null){
    this._selectedDisciplineScientifiqueComiteEtCommissionEvaluation=new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
    }
           return this._selectedDisciplineScientifiqueComiteEtCommissionEvaluation;
       }

    set selectedDisciplineScientifiqueComiteEtCommissionEvaluation(value: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {
        this._selectedDisciplineScientifiqueComiteEtCommissionEvaluation = value;
       }

    get disciplineScientifiqueComiteEtCommissionEvaluationSelections(): Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo> {
    if(this._disciplineScientifiqueComiteEtCommissionEvaluationSelections==null){
    this._disciplineScientifiqueComiteEtCommissionEvaluationSelections=new Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>();
    }
        return this._disciplineScientifiqueComiteEtCommissionEvaluationSelections;
       }


    set disciplineScientifiqueComiteEtCommissionEvaluationSelections(value: Array<DisciplineScientifiqueComiteEtCommissionEvaluationVo>) {
        this._disciplineScientifiqueComiteEtCommissionEvaluationSelections = value;
       }

    get createDisciplineScientifiqueComiteEtCommissionEvaluationDialog(): boolean {
        return this._createDisciplineScientifiqueComiteEtCommissionEvaluationDialog;
       }

    set createDisciplineScientifiqueComiteEtCommissionEvaluationDialog(value: boolean) {
        this._createDisciplineScientifiqueComiteEtCommissionEvaluationDialog = value;
       }

    get editDisciplineScientifiqueComiteEtCommissionEvaluationDialog(): boolean {
        return this._editDisciplineScientifiqueComiteEtCommissionEvaluationDialog;
       }

    set editDisciplineScientifiqueComiteEtCommissionEvaluationDialog(value: boolean) {
        this._editDisciplineScientifiqueComiteEtCommissionEvaluationDialog = value;
       }

    get viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog(): boolean {
        return this._viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog;
       }

    set viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog(value: boolean) {
        this._viewDisciplineScientifiqueComiteEtCommissionEvaluationDialog = value;
       }

     get searchDisciplineScientifiqueComiteEtCommissionEvaluation(): DisciplineScientifiqueComiteEtCommissionEvaluationVo {
     if(this._searchDisciplineScientifiqueComiteEtCommissionEvaluation==null){
    this._searchDisciplineScientifiqueComiteEtCommissionEvaluation=new DisciplineScientifiqueComiteEtCommissionEvaluationVo();
    }
        return this._searchDisciplineScientifiqueComiteEtCommissionEvaluation;
    }

    set searchDisciplineScientifiqueComiteEtCommissionEvaluation(value: DisciplineScientifiqueComiteEtCommissionEvaluationVo) {
        this._searchDisciplineScientifiqueComiteEtCommissionEvaluation = value;
       }

}
