import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EnjeuxIrdConsultanceScientifiquePonctuelleVo} from '../model/EnjeuxIrdConsultanceScientifiquePonctuelle.model';
import {ConsultanceScientifiquePonctuelleVo} from '../model/ConsultanceScientifiquePonctuelle.model';
import {EnjeuxIrdVo} from '../model/EnjeuxIrd.model';


@Injectable({
  providedIn: 'root'
})
export class EnjeuxIrdConsultanceScientifiquePonctuelleService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/enjeuxIrdConsultanceScientifiquePonctuelle/';
        })
    }
     private _enjeuxIrdConsultanceScientifiquePonctuelles: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> ;
     private _selectedEnjeuxIrdConsultanceScientifiquePonctuelle: EnjeuxIrdConsultanceScientifiquePonctuelleVo;
     private _enjeuxIrdConsultanceScientifiquePonctuelleSelections: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>;
     private _createEnjeuxIrdConsultanceScientifiquePonctuelleDialog: boolean;
     private _editEnjeuxIrdConsultanceScientifiquePonctuelleDialog: boolean;
     private _viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog: boolean;
     public editEnjeuxIrdConsultanceScientifiquePonctuelle$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEnjeuxIrdConsultanceScientifiquePonctuelle:EnjeuxIrdConsultanceScientifiquePonctuelleVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>>(this.API);
    }

    public save(): Observable<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
         return this.http.post<EnjeuxIrdConsultanceScientifiquePonctuelleVo>(this.API, this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle);
    }

    delete(enjeuxIrdConsultanceScientifiquePonctuelle: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
         return this.http.delete<number>(this.API + 'id/' + enjeuxIrdConsultanceScientifiquePonctuelle.id);
    }


    public edit(): Observable<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
        return this.http.put<EnjeuxIrdConsultanceScientifiquePonctuelleVo>(this.API, this.selectedEnjeuxIrdConsultanceScientifiquePonctuelle);
    }


     public findByCriteria(enjeuxIrdConsultanceScientifiquePonctuelle:EnjeuxIrdConsultanceScientifiquePonctuelleVo):Observable<Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>>{
           return this.http.post<Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>>(this.API +'search', enjeuxIrdConsultanceScientifiquePonctuelle);
    }

   public findByIdWithAssociatedList(enjeuxIrdConsultanceScientifiquePonctuelle:EnjeuxIrdConsultanceScientifiquePonctuelleVo):Observable<EnjeuxIrdConsultanceScientifiquePonctuelleVo>{
         return this.http.get<EnjeuxIrdConsultanceScientifiquePonctuelleVo>(this.API + 'detail/id/' +enjeuxIrdConsultanceScientifiquePonctuelle.id);
    }

    // getters and setters


    get enjeuxIrdConsultanceScientifiquePonctuelles(): Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
    if(this._enjeuxIrdConsultanceScientifiquePonctuelles==null){
    this._enjeuxIrdConsultanceScientifiquePonctuelles=new Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>();
    }
return this._enjeuxIrdConsultanceScientifiquePonctuelles;
       }

    set enjeuxIrdConsultanceScientifiquePonctuelles(value: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>) {
        this._enjeuxIrdConsultanceScientifiquePonctuelles = value;
       }

    get selectedEnjeuxIrdConsultanceScientifiquePonctuelle(): EnjeuxIrdConsultanceScientifiquePonctuelleVo {
    if(this._selectedEnjeuxIrdConsultanceScientifiquePonctuelle==null){
    this._selectedEnjeuxIrdConsultanceScientifiquePonctuelle=new EnjeuxIrdConsultanceScientifiquePonctuelleVo();
    }
           return this._selectedEnjeuxIrdConsultanceScientifiquePonctuelle;
       }

    set selectedEnjeuxIrdConsultanceScientifiquePonctuelle(value: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
        this._selectedEnjeuxIrdConsultanceScientifiquePonctuelle = value;
       }

    get enjeuxIrdConsultanceScientifiquePonctuelleSelections(): Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo> {
    if(this._enjeuxIrdConsultanceScientifiquePonctuelleSelections==null){
    this._enjeuxIrdConsultanceScientifiquePonctuelleSelections=new Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>();
    }
        return this._enjeuxIrdConsultanceScientifiquePonctuelleSelections;
       }


    set enjeuxIrdConsultanceScientifiquePonctuelleSelections(value: Array<EnjeuxIrdConsultanceScientifiquePonctuelleVo>) {
        this._enjeuxIrdConsultanceScientifiquePonctuelleSelections = value;
       }

    get createEnjeuxIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._createEnjeuxIrdConsultanceScientifiquePonctuelleDialog;
       }

    set createEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._createEnjeuxIrdConsultanceScientifiquePonctuelleDialog = value;
       }

    get editEnjeuxIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._editEnjeuxIrdConsultanceScientifiquePonctuelleDialog;
       }

    set editEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._editEnjeuxIrdConsultanceScientifiquePonctuelleDialog = value;
       }

    get viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog(): boolean {
        return this._viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog;
       }

    set viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog(value: boolean) {
        this._viewEnjeuxIrdConsultanceScientifiquePonctuelleDialog = value;
       }

     get searchEnjeuxIrdConsultanceScientifiquePonctuelle(): EnjeuxIrdConsultanceScientifiquePonctuelleVo {
     if(this._searchEnjeuxIrdConsultanceScientifiquePonctuelle==null){
    this._searchEnjeuxIrdConsultanceScientifiquePonctuelle=new EnjeuxIrdConsultanceScientifiquePonctuelleVo();
    }
        return this._searchEnjeuxIrdConsultanceScientifiquePonctuelle;
    }

    set searchEnjeuxIrdConsultanceScientifiquePonctuelle(value: EnjeuxIrdConsultanceScientifiquePonctuelleVo) {
        this._searchEnjeuxIrdConsultanceScientifiquePonctuelle = value;
       }

}
