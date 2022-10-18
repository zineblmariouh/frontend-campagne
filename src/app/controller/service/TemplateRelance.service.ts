import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TemplateRelanceVo} from '../model/TemplateRelance.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateRelanceService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateRelance/';
        })
    }
     private _templateRelances: Array<TemplateRelanceVo> ;
     private _selectedTemplateRelance: TemplateRelanceVo;
     private _templateRelanceSelections: Array<TemplateRelanceVo>;
     private _createTemplateRelanceDialog: boolean;
     private _editTemplateRelanceDialog: boolean;
     private _viewTemplateRelanceDialog: boolean;
     public editTemplateRelance$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateRelance:TemplateRelanceVo ;

    // methods
    public archiver(templateRelance: TemplateRelanceVo): Observable<TemplateRelanceVo> {
        return this.http.put<TemplateRelanceVo>(this.API + 'archiver/' ,templateRelance);
    }
    public desarchiver(templateRelance: TemplateRelanceVo): Observable<TemplateRelanceVo> {
    return this.http.put<TemplateRelanceVo>(this.API + 'desarchiver/' ,templateRelance);
    }

    public findAll(){
     return this.http.get<Array<TemplateRelanceVo>>(this.API);
    }

    public save(): Observable<TemplateRelanceVo> {
           return this.http.post<TemplateRelanceVo>(this.API, {...this.selectedTemplateRelance,dateCreation: moment(this.selectedTemplateRelance.dateCreation).format("YYYY-MM-DD")});
    }

    delete(templateRelance: TemplateRelanceVo) {
         return this.http.delete<number>(this.API + 'id/' + templateRelance.id);
    }


    public edit(): Observable<TemplateRelanceVo> {
        return this.http.put<TemplateRelanceVo>(this.API, this.selectedTemplateRelance);
    }


     public findByCriteria(templateRelance:TemplateRelanceVo):Observable<Array<TemplateRelanceVo>>{
           return this.http.post<Array<TemplateRelanceVo>>(this.API +'search', templateRelance);
    }

   public findByIdWithAssociatedList(templateRelance:TemplateRelanceVo):Observable<TemplateRelanceVo>{
         return this.http.get<TemplateRelanceVo>(this.API + 'detail/id/' +templateRelance.id);
    }

    // getters and setters


    get templateRelances(): Array<TemplateRelanceVo> {
    if(this._templateRelances==null){
    this._templateRelances=new Array<TemplateRelanceVo>();
    }
return this._templateRelances;
       }

    set templateRelances(value: Array<TemplateRelanceVo>) {
        this._templateRelances = value;
       }

    get selectedTemplateRelance(): TemplateRelanceVo {
    if(this._selectedTemplateRelance==null){
    this._selectedTemplateRelance=new TemplateRelanceVo();
    }
           return this._selectedTemplateRelance;
       }

    set selectedTemplateRelance(value: TemplateRelanceVo) {
        this._selectedTemplateRelance = value;
       }

    get templateRelanceSelections(): Array<TemplateRelanceVo> {
    if(this._templateRelanceSelections==null){
    this._templateRelanceSelections=new Array<TemplateRelanceVo>();
    }
        return this._templateRelanceSelections;
       }


    set templateRelanceSelections(value: Array<TemplateRelanceVo>) {
        this._templateRelanceSelections = value;
       }

    get createTemplateRelanceDialog(): boolean {
        return this._createTemplateRelanceDialog;
       }

    set createTemplateRelanceDialog(value: boolean) {
        this._createTemplateRelanceDialog = value;
       }

    get editTemplateRelanceDialog(): boolean {
        return this._editTemplateRelanceDialog;
       }

    set editTemplateRelanceDialog(value: boolean) {
        this._editTemplateRelanceDialog = value;
       }

    get viewTemplateRelanceDialog(): boolean {
        return this._viewTemplateRelanceDialog;
       }

    set viewTemplateRelanceDialog(value: boolean) {
        this._viewTemplateRelanceDialog = value;
       }

     get searchTemplateRelance(): TemplateRelanceVo {
     if(this._searchTemplateRelance==null){
    this._searchTemplateRelance=new TemplateRelanceVo();
    }
        return this._searchTemplateRelance;
    }

    set searchTemplateRelance(value: TemplateRelanceVo) {
        this._searchTemplateRelance = value;
       }

}
