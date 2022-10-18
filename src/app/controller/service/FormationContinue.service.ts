import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FormationContinueVo} from '../model/FormationContinue.model';
import {EnseignementEtFormationVo} from '../model/EnseignementEtFormation.model';
import {EtatEtapeCampagneVo} from '../model/EtatEtapeCampagne.model';
import {FormationContinueDisciplineScientifiqueVo} from '../model/FormationContinueDisciplineScientifique.model';
import {ModaliteFormationContinueVo} from '../model/ModaliteFormationContinue.model';
import {FormationContinueObjetFormationGeneriqueVo} from '../model/FormationContinueObjetFormationGenerique.model';
import {FormationContinueEnjeuxIrdVo} from '../model/FormationContinueEnjeuxIrd.model';
import {ZoneGeographiqueFormationContinueVo} from '../model/ZoneGeographiqueFormationContinue.model';
import {FormationContinueCommanditaireVo} from '../model/FormationContinueCommanditaire.model';
import {FormationContinuePubliqueProfessionelVo} from '../model/FormationContinuePubliqueProfessionel.model';
import {PaysFormationContinueVo} from '../model/PaysFormationContinue.model';


@Injectable({
  providedIn: 'root'
})
export class FormationContinueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/formationContinue/';
        })
    }
     private _formationContinues: Array<FormationContinueVo> ;
     private _selectedFormationContinue: FormationContinueVo;
     private _formationContinueSelections: Array<FormationContinueVo>;
     private _createFormationContinueDialog: boolean;
     private _editFormationContinueDialog: boolean;
     private _viewFormationContinueDialog: boolean;
     public editFormationContinue$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFormationContinue:FormationContinueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FormationContinueVo>>(this.API);
    }

    public save(): Observable<FormationContinueVo> {
         return this.http.post<FormationContinueVo>(this.API, this.selectedFormationContinue);
    }

    delete(formationContinue: FormationContinueVo) {
         return this.http.delete<number>(this.API + 'id/' + formationContinue.id);
    }


    public edit(): Observable<FormationContinueVo> {
        return this.http.put<FormationContinueVo>(this.API, this.selectedFormationContinue);
    }


     public findByCriteria(formationContinue:FormationContinueVo):Observable<Array<FormationContinueVo>>{
           return this.http.post<Array<FormationContinueVo>>(this.API +'search', formationContinue);
    }

   public findByIdWithAssociatedList(formationContinue:FormationContinueVo):Observable<FormationContinueVo>{
         return this.http.get<FormationContinueVo>(this.API + 'detail/id/' +formationContinue.id);
    }

    // getters and setters


    get formationContinues(): Array<FormationContinueVo> {
    if(this._formationContinues==null){
    this._formationContinues=new Array<FormationContinueVo>();
    }
return this._formationContinues;
       }

    set formationContinues(value: Array<FormationContinueVo>) {
        this._formationContinues = value;
       }

    get selectedFormationContinue(): FormationContinueVo {
    if(this._selectedFormationContinue==null){
    this._selectedFormationContinue=new FormationContinueVo();
    }
           return this._selectedFormationContinue;
       }

    set selectedFormationContinue(value: FormationContinueVo) {
        this._selectedFormationContinue = value;
       }

    get formationContinueSelections(): Array<FormationContinueVo> {
    if(this._formationContinueSelections==null){
    this._formationContinueSelections=new Array<FormationContinueVo>();
    }
        return this._formationContinueSelections;
       }


    set formationContinueSelections(value: Array<FormationContinueVo>) {
        this._formationContinueSelections = value;
       }

    get createFormationContinueDialog(): boolean {
        return this._createFormationContinueDialog;
       }

    set createFormationContinueDialog(value: boolean) {
        this._createFormationContinueDialog = value;
       }

    get editFormationContinueDialog(): boolean {
        return this._editFormationContinueDialog;
       }

    set editFormationContinueDialog(value: boolean) {
        this._editFormationContinueDialog = value;
       }

    get viewFormationContinueDialog(): boolean {
        return this._viewFormationContinueDialog;
       }

    set viewFormationContinueDialog(value: boolean) {
        this._viewFormationContinueDialog = value;
       }

     get searchFormationContinue(): FormationContinueVo {
     if(this._searchFormationContinue==null){
    this._searchFormationContinue=new FormationContinueVo();
    }
        return this._searchFormationContinue;
    }

    set searchFormationContinue(value: FormationContinueVo) {
        this._searchFormationContinue = value;
       }

}
