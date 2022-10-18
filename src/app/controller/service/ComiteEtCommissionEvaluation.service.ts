import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ComiteEtCommissionEvaluationVo} from '../model/ComiteEtCommissionEvaluation.model';
import {DisciplineScientifiqueComiteEtCommissionEvaluationVo} from '../model/DisciplineScientifiqueComiteEtCommissionEvaluation.model';
import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../model/InstrumentIrdComiteEtCommissionEvaluation.model';
import {TypeExpertiseEvaluationComiteEtCommissionEvaluationVo} from '../model/TypeExpertiseEvaluationComiteEtCommissionEvaluation.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {NatureExpertiseVo} from '../model/NatureExpertise.model';
import {RoleComiteEtCommissionEvaluationVo} from '../model/RoleComiteEtCommissionEvaluation.model';
import {ExpertiseVo} from '../model/Expertise.model';
import {EtablissementComiteEtCommissionEvaluationVo} from '../model/EtablissementComiteEtCommissionEvaluation.model';
import {EnjeuxIrdComiteEtCommissionEvaluationVo} from '../model/EnjeuxIrdComiteEtCommissionEvaluation.model';


@Injectable({
  providedIn: 'root'
})
export class ComiteEtCommissionEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/comiteEtCommissionEvaluation/';
        })
    }
     private _comiteEtCommissionEvaluations: Array<ComiteEtCommissionEvaluationVo> ;
     private _selectedComiteEtCommissionEvaluation: ComiteEtCommissionEvaluationVo;
     private _comiteEtCommissionEvaluationSelections: Array<ComiteEtCommissionEvaluationVo>;
     private _createComiteEtCommissionEvaluationDialog: boolean;
     private _editComiteEtCommissionEvaluationDialog: boolean;
     private _viewComiteEtCommissionEvaluationDialog: boolean;
     public editComiteEtCommissionEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchComiteEtCommissionEvaluation:ComiteEtCommissionEvaluationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<ComiteEtCommissionEvaluationVo>>(this.API);
    }

    public save(): Observable<ComiteEtCommissionEvaluationVo> {
         return this.http.post<ComiteEtCommissionEvaluationVo>(this.API, this.selectedComiteEtCommissionEvaluation);
    }

    delete(comiteEtCommissionEvaluation: ComiteEtCommissionEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + comiteEtCommissionEvaluation.id);
    }


    public edit(): Observable<ComiteEtCommissionEvaluationVo> {
        return this.http.put<ComiteEtCommissionEvaluationVo>(this.API, this.selectedComiteEtCommissionEvaluation);
    }


     public findByCriteria(comiteEtCommissionEvaluation:ComiteEtCommissionEvaluationVo):Observable<Array<ComiteEtCommissionEvaluationVo>>{
           return this.http.post<Array<ComiteEtCommissionEvaluationVo>>(this.API +'search', comiteEtCommissionEvaluation);
    }

   public findByIdWithAssociatedList(comiteEtCommissionEvaluation:ComiteEtCommissionEvaluationVo):Observable<ComiteEtCommissionEvaluationVo>{
         return this.http.get<ComiteEtCommissionEvaluationVo>(this.API + 'detail/id/' +comiteEtCommissionEvaluation.id);
    }

    // getters and setters


    get comiteEtCommissionEvaluations(): Array<ComiteEtCommissionEvaluationVo> {
    if(this._comiteEtCommissionEvaluations==null){
    this._comiteEtCommissionEvaluations=new Array<ComiteEtCommissionEvaluationVo>();
    }
return this._comiteEtCommissionEvaluations;
       }

    set comiteEtCommissionEvaluations(value: Array<ComiteEtCommissionEvaluationVo>) {
        this._comiteEtCommissionEvaluations = value;
       }

    get selectedComiteEtCommissionEvaluation(): ComiteEtCommissionEvaluationVo {
    if(this._selectedComiteEtCommissionEvaluation==null){
    this._selectedComiteEtCommissionEvaluation=new ComiteEtCommissionEvaluationVo();
    }
           return this._selectedComiteEtCommissionEvaluation;
       }

    set selectedComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this._selectedComiteEtCommissionEvaluation = value;
       }

    get comiteEtCommissionEvaluationSelections(): Array<ComiteEtCommissionEvaluationVo> {
    if(this._comiteEtCommissionEvaluationSelections==null){
    this._comiteEtCommissionEvaluationSelections=new Array<ComiteEtCommissionEvaluationVo>();
    }
        return this._comiteEtCommissionEvaluationSelections;
       }


    set comiteEtCommissionEvaluationSelections(value: Array<ComiteEtCommissionEvaluationVo>) {
        this._comiteEtCommissionEvaluationSelections = value;
       }

    get createComiteEtCommissionEvaluationDialog(): boolean {
        return this._createComiteEtCommissionEvaluationDialog;
       }

    set createComiteEtCommissionEvaluationDialog(value: boolean) {
        this._createComiteEtCommissionEvaluationDialog = value;
       }

    get editComiteEtCommissionEvaluationDialog(): boolean {
        return this._editComiteEtCommissionEvaluationDialog;
       }

    set editComiteEtCommissionEvaluationDialog(value: boolean) {
        this._editComiteEtCommissionEvaluationDialog = value;
       }

    get viewComiteEtCommissionEvaluationDialog(): boolean {
        return this._viewComiteEtCommissionEvaluationDialog;
       }

    set viewComiteEtCommissionEvaluationDialog(value: boolean) {
        this._viewComiteEtCommissionEvaluationDialog = value;
       }

     get searchComiteEtCommissionEvaluation(): ComiteEtCommissionEvaluationVo {
     if(this._searchComiteEtCommissionEvaluation==null){
    this._searchComiteEtCommissionEvaluation=new ComiteEtCommissionEvaluationVo();
    }
        return this._searchComiteEtCommissionEvaluation;
    }

    set searchComiteEtCommissionEvaluation(value: ComiteEtCommissionEvaluationVo) {
        this._searchComiteEtCommissionEvaluation = value;
       }

}
