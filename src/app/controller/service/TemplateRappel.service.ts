import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TemplateRappelVo} from '../model/TemplateRappel.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateRappelService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateRappel/';
        })
    }
     private _templateRappels: Array<TemplateRappelVo> ;
     private _selectedTemplateRappel: TemplateRappelVo;
     private _templateRappelSelections: Array<TemplateRappelVo>;
     private _createTemplateRappelDialog: boolean;
     private _editTemplateRappelDialog: boolean;
     private _viewTemplateRappelDialog: boolean;
     public editTemplateRappel$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateRappel:TemplateRappelVo ;

    // methods
    public archiver(templateRappel: TemplateRappelVo): Observable<TemplateRappelVo> {
        return this.http.put<TemplateRappelVo>(this.API + 'archiver/' ,templateRappel);
    }
    public desarchiver(templateRappel: TemplateRappelVo): Observable<TemplateRappelVo> {
    return this.http.put<TemplateRappelVo>(this.API + 'desarchiver/' ,templateRappel);
    }

    public findAll(){
     return this.http.get<Array<TemplateRappelVo>>(this.API);
    }

    public save(): Observable<TemplateRappelVo> {
           return this.http.post<TemplateRappelVo>(this.API, {...this.selectedTemplateRappel,dateCreation: moment(this.selectedTemplateRappel.dateCreation).format("YYYY-MM-DD")});
    }

    delete(templateRappel: TemplateRappelVo) {
         return this.http.delete<number>(this.API + 'id/' + templateRappel.id);
    }


    public edit(): Observable<TemplateRappelVo> {
        return this.http.put<TemplateRappelVo>(this.API, this.selectedTemplateRappel);
    }


     public findByCriteria(templateRappel:TemplateRappelVo):Observable<Array<TemplateRappelVo>>{
           return this.http.post<Array<TemplateRappelVo>>(this.API +'search', templateRappel);
    }

   public findByIdWithAssociatedList(templateRappel:TemplateRappelVo):Observable<TemplateRappelVo>{
         return this.http.get<TemplateRappelVo>(this.API + 'detail/id/' +templateRappel.id);
    }

    // getters and setters


    get templateRappels(): Array<TemplateRappelVo> {
    if(this._templateRappels==null){
    this._templateRappels=new Array<TemplateRappelVo>();
    }
return this._templateRappels;
       }

    set templateRappels(value: Array<TemplateRappelVo>) {
        this._templateRappels = value;
       }

    get selectedTemplateRappel(): TemplateRappelVo {
    if(this._selectedTemplateRappel==null){
    this._selectedTemplateRappel=new TemplateRappelVo();
    }
           return this._selectedTemplateRappel;
       }

    set selectedTemplateRappel(value: TemplateRappelVo) {
        this._selectedTemplateRappel = value;
       }

    get templateRappelSelections(): Array<TemplateRappelVo> {
    if(this._templateRappelSelections==null){
    this._templateRappelSelections=new Array<TemplateRappelVo>();
    }
        return this._templateRappelSelections;
       }


    set templateRappelSelections(value: Array<TemplateRappelVo>) {
        this._templateRappelSelections = value;
       }

    get createTemplateRappelDialog(): boolean {
        return this._createTemplateRappelDialog;
       }

    set createTemplateRappelDialog(value: boolean) {
        this._createTemplateRappelDialog = value;
       }

    get editTemplateRappelDialog(): boolean {
        return this._editTemplateRappelDialog;
       }

    set editTemplateRappelDialog(value: boolean) {
        this._editTemplateRappelDialog = value;
       }

    get viewTemplateRappelDialog(): boolean {
        return this._viewTemplateRappelDialog;
       }

    set viewTemplateRappelDialog(value: boolean) {
        this._viewTemplateRappelDialog = value;
       }

     get searchTemplateRappel(): TemplateRappelVo {
     if(this._searchTemplateRappel==null){
    this._searchTemplateRappel=new TemplateRappelVo();
    }
        return this._searchTemplateRappel;
    }

    set searchTemplateRappel(value: TemplateRappelVo) {
        this._searchTemplateRappel = value;
       }

}
