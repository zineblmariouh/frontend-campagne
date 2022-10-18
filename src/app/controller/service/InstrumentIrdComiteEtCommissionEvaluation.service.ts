import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {InstrumentIrdComiteEtCommissionEvaluationVo} from '../model/InstrumentIrdComiteEtCommissionEvaluation.model';
import {TypeInstrumentIrdVo} from '../model/TypeInstrumentIrd.model';
import {ComiteEtCommissionEvaluationVo} from '../model/ComiteEtCommissionEvaluation.model';
import {InstrumentIrdVo} from '../model/InstrumentIrd.model';


@Injectable({
  providedIn: 'root'
})
export class InstrumentIrdComiteEtCommissionEvaluationService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/instrumentIrdComiteEtCommissionEvaluation/';
        })
    }
     private _instrumentIrdComiteEtCommissionEvaluations: Array<InstrumentIrdComiteEtCommissionEvaluationVo> ;
     private _selectedInstrumentIrdComiteEtCommissionEvaluation: InstrumentIrdComiteEtCommissionEvaluationVo;
     private _instrumentIrdComiteEtCommissionEvaluationSelections: Array<InstrumentIrdComiteEtCommissionEvaluationVo>;
     private _createInstrumentIrdComiteEtCommissionEvaluationDialog: boolean;
     private _editInstrumentIrdComiteEtCommissionEvaluationDialog: boolean;
     private _viewInstrumentIrdComiteEtCommissionEvaluationDialog: boolean;
     public editInstrumentIrdComiteEtCommissionEvaluation$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchInstrumentIrdComiteEtCommissionEvaluation:InstrumentIrdComiteEtCommissionEvaluationVo ;

    // methods

    public findAll(){
     return this.http.get<Array<InstrumentIrdComiteEtCommissionEvaluationVo>>(this.API);
    }

    public save(): Observable<InstrumentIrdComiteEtCommissionEvaluationVo> {
         return this.http.post<InstrumentIrdComiteEtCommissionEvaluationVo>(this.API, this.selectedInstrumentIrdComiteEtCommissionEvaluation);
    }

    delete(instrumentIrdComiteEtCommissionEvaluation: InstrumentIrdComiteEtCommissionEvaluationVo) {
         return this.http.delete<number>(this.API + 'id/' + instrumentIrdComiteEtCommissionEvaluation.id);
    }


    public edit(): Observable<InstrumentIrdComiteEtCommissionEvaluationVo> {
        return this.http.put<InstrumentIrdComiteEtCommissionEvaluationVo>(this.API, this.selectedInstrumentIrdComiteEtCommissionEvaluation);
    }


     public findByCriteria(instrumentIrdComiteEtCommissionEvaluation:InstrumentIrdComiteEtCommissionEvaluationVo):Observable<Array<InstrumentIrdComiteEtCommissionEvaluationVo>>{
           return this.http.post<Array<InstrumentIrdComiteEtCommissionEvaluationVo>>(this.API +'search', instrumentIrdComiteEtCommissionEvaluation);
    }

   public findByIdWithAssociatedList(instrumentIrdComiteEtCommissionEvaluation:InstrumentIrdComiteEtCommissionEvaluationVo):Observable<InstrumentIrdComiteEtCommissionEvaluationVo>{
         return this.http.get<InstrumentIrdComiteEtCommissionEvaluationVo>(this.API + 'detail/id/' +instrumentIrdComiteEtCommissionEvaluation.id);
    }

    // getters and setters


    get instrumentIrdComiteEtCommissionEvaluations(): Array<InstrumentIrdComiteEtCommissionEvaluationVo> {
    if(this._instrumentIrdComiteEtCommissionEvaluations==null){
    this._instrumentIrdComiteEtCommissionEvaluations=new Array<InstrumentIrdComiteEtCommissionEvaluationVo>();
    }
return this._instrumentIrdComiteEtCommissionEvaluations;
       }

    set instrumentIrdComiteEtCommissionEvaluations(value: Array<InstrumentIrdComiteEtCommissionEvaluationVo>) {
        this._instrumentIrdComiteEtCommissionEvaluations = value;
       }

    get selectedInstrumentIrdComiteEtCommissionEvaluation(): InstrumentIrdComiteEtCommissionEvaluationVo {
    if(this._selectedInstrumentIrdComiteEtCommissionEvaluation==null){
    this._selectedInstrumentIrdComiteEtCommissionEvaluation=new InstrumentIrdComiteEtCommissionEvaluationVo();
    }
           return this._selectedInstrumentIrdComiteEtCommissionEvaluation;
       }

    set selectedInstrumentIrdComiteEtCommissionEvaluation(value: InstrumentIrdComiteEtCommissionEvaluationVo) {
        this._selectedInstrumentIrdComiteEtCommissionEvaluation = value;
       }

    get instrumentIrdComiteEtCommissionEvaluationSelections(): Array<InstrumentIrdComiteEtCommissionEvaluationVo> {
    if(this._instrumentIrdComiteEtCommissionEvaluationSelections==null){
    this._instrumentIrdComiteEtCommissionEvaluationSelections=new Array<InstrumentIrdComiteEtCommissionEvaluationVo>();
    }
        return this._instrumentIrdComiteEtCommissionEvaluationSelections;
       }


    set instrumentIrdComiteEtCommissionEvaluationSelections(value: Array<InstrumentIrdComiteEtCommissionEvaluationVo>) {
        this._instrumentIrdComiteEtCommissionEvaluationSelections = value;
       }

    get createInstrumentIrdComiteEtCommissionEvaluationDialog(): boolean {
        return this._createInstrumentIrdComiteEtCommissionEvaluationDialog;
       }

    set createInstrumentIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this._createInstrumentIrdComiteEtCommissionEvaluationDialog = value;
       }

    get editInstrumentIrdComiteEtCommissionEvaluationDialog(): boolean {
        return this._editInstrumentIrdComiteEtCommissionEvaluationDialog;
       }

    set editInstrumentIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this._editInstrumentIrdComiteEtCommissionEvaluationDialog = value;
       }

    get viewInstrumentIrdComiteEtCommissionEvaluationDialog(): boolean {
        return this._viewInstrumentIrdComiteEtCommissionEvaluationDialog;
       }

    set viewInstrumentIrdComiteEtCommissionEvaluationDialog(value: boolean) {
        this._viewInstrumentIrdComiteEtCommissionEvaluationDialog = value;
       }

     get searchInstrumentIrdComiteEtCommissionEvaluation(): InstrumentIrdComiteEtCommissionEvaluationVo {
     if(this._searchInstrumentIrdComiteEtCommissionEvaluation==null){
    this._searchInstrumentIrdComiteEtCommissionEvaluation=new InstrumentIrdComiteEtCommissionEvaluationVo();
    }
        return this._searchInstrumentIrdComiteEtCommissionEvaluation;
    }

    set searchInstrumentIrdComiteEtCommissionEvaluation(value: InstrumentIrdComiteEtCommissionEvaluationVo) {
        this._searchInstrumentIrdComiteEtCommissionEvaluation = value;
       }

}
