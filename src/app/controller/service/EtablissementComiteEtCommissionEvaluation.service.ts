import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtablissementComiteEtCommissionEvaluationVo} from '../model/EtablissementComiteEtCommissionEvaluation.model';
import {ComiteEtCommissionEvaluationVo} from '../model/ComiteEtCommissionEvaluation.model';
import {EtablissementVo} from '../model/Etablissement.model';


@Injectable({
  providedIn: 'root'
})
export class EtablissementComiteEtCommissionEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etablissementComiteEtCommissionEvaluation/';
        })
    }
     private _etablissementComiteEtCommissionEvaluations: Array<EtablissementComiteEtCommissionEvaluationVo> ;
     private _selectedEtablissementComiteEtCommissionEvaluation: EtablissementComiteEtCommissionEvaluationVo;
     private _etablissementComiteEtCommissionEvaluationSelections: Array<EtablissementComiteEtCommissionEvaluationVo>;
     private _createEtablissementComiteEtCommissionEvaluationDialog: boolean;
     private _editEtablissementComiteEtCommissionEvaluationDialog: boolean;
     private _viewEtablissementComiteEtCommissionEvaluationDialog: boolean;
     public editEtablissementComiteEtCommissionEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtablissementComiteEtCommissionEvaluation:EtablissementComiteEtCommissionEvaluationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtablissementComiteEtCommissionEvaluationVo>>(this.API);
    }

    public save(): Observable<EtablissementComiteEtCommissionEvaluationVo> {
         return this.http.post<EtablissementComiteEtCommissionEvaluationVo>(this.API, this.selectedEtablissementComiteEtCommissionEvaluation);
    }

    delete(etablissementComiteEtCommissionEvaluation: EtablissementComiteEtCommissionEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + etablissementComiteEtCommissionEvaluation.id);
    }


    public edit(): Observable<EtablissementComiteEtCommissionEvaluationVo> {
        return this.http.put<EtablissementComiteEtCommissionEvaluationVo>(this.API, this.selectedEtablissementComiteEtCommissionEvaluation);
    }


     public findByCriteria(etablissementComiteEtCommissionEvaluation:EtablissementComiteEtCommissionEvaluationVo):Observable<Array<EtablissementComiteEtCommissionEvaluationVo>>{
           return this.http.post<Array<EtablissementComiteEtCommissionEvaluationVo>>(this.API +'search', etablissementComiteEtCommissionEvaluation);
    }

   public findByIdWithAssociatedList(etablissementComiteEtCommissionEvaluation:EtablissementComiteEtCommissionEvaluationVo):Observable<EtablissementComiteEtCommissionEvaluationVo>{
         return this.http.get<EtablissementComiteEtCommissionEvaluationVo>(this.API + 'detail/id/' +etablissementComiteEtCommissionEvaluation.id);
    }

    // getters and setters


    get etablissementComiteEtCommissionEvaluations(): Array<EtablissementComiteEtCommissionEvaluationVo> {
    if(this._etablissementComiteEtCommissionEvaluations==null){
    this._etablissementComiteEtCommissionEvaluations=new Array<EtablissementComiteEtCommissionEvaluationVo>();
    }
return this._etablissementComiteEtCommissionEvaluations;
       }

    set etablissementComiteEtCommissionEvaluations(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
        this._etablissementComiteEtCommissionEvaluations = value;
       }

    get selectedEtablissementComiteEtCommissionEvaluation(): EtablissementComiteEtCommissionEvaluationVo {
    if(this._selectedEtablissementComiteEtCommissionEvaluation==null){
    this._selectedEtablissementComiteEtCommissionEvaluation=new EtablissementComiteEtCommissionEvaluationVo();
    }
           return this._selectedEtablissementComiteEtCommissionEvaluation;
       }

    set selectedEtablissementComiteEtCommissionEvaluation(value: EtablissementComiteEtCommissionEvaluationVo) {
        this._selectedEtablissementComiteEtCommissionEvaluation = value;
       }

    get etablissementComiteEtCommissionEvaluationSelections(): Array<EtablissementComiteEtCommissionEvaluationVo> {
    if(this._etablissementComiteEtCommissionEvaluationSelections==null){
    this._etablissementComiteEtCommissionEvaluationSelections=new Array<EtablissementComiteEtCommissionEvaluationVo>();
    }
        return this._etablissementComiteEtCommissionEvaluationSelections;
       }


    set etablissementComiteEtCommissionEvaluationSelections(value: Array<EtablissementComiteEtCommissionEvaluationVo>) {
        this._etablissementComiteEtCommissionEvaluationSelections = value;
       }

    get createEtablissementComiteEtCommissionEvaluationDialog(): boolean {
        return this._createEtablissementComiteEtCommissionEvaluationDialog;
       }

    set createEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this._createEtablissementComiteEtCommissionEvaluationDialog = value;
       }

    get editEtablissementComiteEtCommissionEvaluationDialog(): boolean {
        return this._editEtablissementComiteEtCommissionEvaluationDialog;
       }

    set editEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this._editEtablissementComiteEtCommissionEvaluationDialog = value;
       }

    get viewEtablissementComiteEtCommissionEvaluationDialog(): boolean {
        return this._viewEtablissementComiteEtCommissionEvaluationDialog;
       }

    set viewEtablissementComiteEtCommissionEvaluationDialog(value: boolean) {
        this._viewEtablissementComiteEtCommissionEvaluationDialog = value;
       }

     get searchEtablissementComiteEtCommissionEvaluation(): EtablissementComiteEtCommissionEvaluationVo {
     if(this._searchEtablissementComiteEtCommissionEvaluation==null){
    this._searchEtablissementComiteEtCommissionEvaluation=new EtablissementComiteEtCommissionEvaluationVo();
    }
        return this._searchEtablissementComiteEtCommissionEvaluation;
    }

    set searchEtablissementComiteEtCommissionEvaluation(value: EtablissementComiteEtCommissionEvaluationVo) {
        this._searchEtablissementComiteEtCommissionEvaluation = value;
       }

}
