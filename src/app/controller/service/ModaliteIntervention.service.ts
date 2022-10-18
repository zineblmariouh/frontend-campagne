import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {ModaliteInterventionVo} from '../model/ModaliteIntervention.model';


@Injectable({
  providedIn: 'root'
})
export class ModaliteInterventionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/modaliteIntervention/';
        })
    }
     private _modaliteInterventions: Array<ModaliteInterventionVo> ;
     private _selectedModaliteIntervention: ModaliteInterventionVo;
     private _modaliteInterventionSelections: Array<ModaliteInterventionVo>;
     private _createModaliteInterventionDialog: boolean;
     private _editModaliteInterventionDialog: boolean;
     private _viewModaliteInterventionDialog: boolean;
     public editModaliteIntervention$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchModaliteIntervention:ModaliteInterventionVo ;

    // methods
    public archiver(modaliteIntervention: ModaliteInterventionVo): Observable<ModaliteInterventionVo> {
        return this.http.put<ModaliteInterventionVo>(this.API + 'archiver/' ,modaliteIntervention);
    }
    public desarchiver(modaliteIntervention: ModaliteInterventionVo): Observable<ModaliteInterventionVo> {
    return this.http.put<ModaliteInterventionVo>(this.API + 'desarchiver/' ,modaliteIntervention);
    }

    public findAll(){
     return this.http.get<Array<ModaliteInterventionVo>>(this.API);
    }

    public save(): Observable<ModaliteInterventionVo> {
           return this.http.post<ModaliteInterventionVo>(this.API, {...this.selectedModaliteIntervention,dateCreation: moment(this.selectedModaliteIntervention.dateCreation).format("YYYY-MM-DD")});
    }

    delete(modaliteIntervention: ModaliteInterventionVo) {
         return this.http.delete<number>(this.API + 'id/' + modaliteIntervention.id);
    }


    public edit(): Observable<ModaliteInterventionVo> {
        return this.http.put<ModaliteInterventionVo>(this.API, this.selectedModaliteIntervention);
    }


     public findByCriteria(modaliteIntervention:ModaliteInterventionVo):Observable<Array<ModaliteInterventionVo>>{
           return this.http.post<Array<ModaliteInterventionVo>>(this.API +'search', modaliteIntervention);
    }

   public findByIdWithAssociatedList(modaliteIntervention:ModaliteInterventionVo):Observable<ModaliteInterventionVo>{
         return this.http.get<ModaliteInterventionVo>(this.API + 'detail/id/' +modaliteIntervention.id);
    }

    // getters and setters


    get modaliteInterventions(): Array<ModaliteInterventionVo> {
    if(this._modaliteInterventions==null){
    this._modaliteInterventions=new Array<ModaliteInterventionVo>();
    }
return this._modaliteInterventions;
       }

    set modaliteInterventions(value: Array<ModaliteInterventionVo>) {
        this._modaliteInterventions = value;
       }

    get selectedModaliteIntervention(): ModaliteInterventionVo {
    if(this._selectedModaliteIntervention==null){
    this._selectedModaliteIntervention=new ModaliteInterventionVo();
    }
           return this._selectedModaliteIntervention;
       }

    set selectedModaliteIntervention(value: ModaliteInterventionVo) {
        this._selectedModaliteIntervention = value;
       }

    get modaliteInterventionSelections(): Array<ModaliteInterventionVo> {
    if(this._modaliteInterventionSelections==null){
    this._modaliteInterventionSelections=new Array<ModaliteInterventionVo>();
    }
        return this._modaliteInterventionSelections;
       }


    set modaliteInterventionSelections(value: Array<ModaliteInterventionVo>) {
        this._modaliteInterventionSelections = value;
       }

    get createModaliteInterventionDialog(): boolean {
        return this._createModaliteInterventionDialog;
       }

    set createModaliteInterventionDialog(value: boolean) {
        this._createModaliteInterventionDialog = value;
       }

    get editModaliteInterventionDialog(): boolean {
        return this._editModaliteInterventionDialog;
       }

    set editModaliteInterventionDialog(value: boolean) {
        this._editModaliteInterventionDialog = value;
       }

    get viewModaliteInterventionDialog(): boolean {
        return this._viewModaliteInterventionDialog;
       }

    set viewModaliteInterventionDialog(value: boolean) {
        this._viewModaliteInterventionDialog = value;
       }

     get searchModaliteIntervention(): ModaliteInterventionVo {
     if(this._searchModaliteIntervention==null){
    this._searchModaliteIntervention=new ModaliteInterventionVo();
    }
        return this._searchModaliteIntervention;
    }

    set searchModaliteIntervention(value: ModaliteInterventionVo) {
        this._searchModaliteIntervention = value;
       }

}
