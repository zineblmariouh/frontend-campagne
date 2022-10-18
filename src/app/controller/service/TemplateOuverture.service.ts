import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TemplateOuvertureVo} from '../model/TemplateOuverture.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateOuvertureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateOuverture/';
        })
    }
     private _templateOuvertures: Array<TemplateOuvertureVo> ;
     private _selectedTemplateOuverture: TemplateOuvertureVo;
     private _templateOuvertureSelections: Array<TemplateOuvertureVo>;
     private _createTemplateOuvertureDialog: boolean;
     private _editTemplateOuvertureDialog: boolean;
     private _viewTemplateOuvertureDialog: boolean;
     public editTemplateOuverture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateOuverture:TemplateOuvertureVo ;

    // methods
    public archiver(templateOuverture: TemplateOuvertureVo): Observable<TemplateOuvertureVo> {
        return this.http.put<TemplateOuvertureVo>(this.API + 'archiver/' ,templateOuverture);
    }
    public desarchiver(templateOuverture: TemplateOuvertureVo): Observable<TemplateOuvertureVo> {
    return this.http.put<TemplateOuvertureVo>(this.API + 'desarchiver/' ,templateOuverture);
    }

    public findAll(){
     return this.http.get<Array<TemplateOuvertureVo>>(this.API);
    }

    public save(): Observable<TemplateOuvertureVo> {
           return this.http.post<TemplateOuvertureVo>(this.API, {...this.selectedTemplateOuverture,dateCreation: moment(this.selectedTemplateOuverture.dateCreation).format("YYYY-MM-DD")});
    }

    delete(templateOuverture: TemplateOuvertureVo) {
         return this.http.delete<number>(this.API + 'id/' + templateOuverture.id);
    }


    public edit(): Observable<TemplateOuvertureVo> {
        return this.http.put<TemplateOuvertureVo>(this.API, this.selectedTemplateOuverture);
    }


     public findByCriteria(templateOuverture:TemplateOuvertureVo):Observable<Array<TemplateOuvertureVo>>{
           return this.http.post<Array<TemplateOuvertureVo>>(this.API +'search', templateOuverture);
    }

   public findByIdWithAssociatedList(templateOuverture:TemplateOuvertureVo):Observable<TemplateOuvertureVo>{
         return this.http.get<TemplateOuvertureVo>(this.API + 'detail/id/' +templateOuverture.id);
    }

    // getters and setters


    get templateOuvertures(): Array<TemplateOuvertureVo> {
    if(this._templateOuvertures==null){
    this._templateOuvertures=new Array<TemplateOuvertureVo>();
    }
return this._templateOuvertures;
       }

    set templateOuvertures(value: Array<TemplateOuvertureVo>) {
        this._templateOuvertures = value;
       }

    get selectedTemplateOuverture(): TemplateOuvertureVo {
    if(this._selectedTemplateOuverture==null){
    this._selectedTemplateOuverture=new TemplateOuvertureVo();
    }
           return this._selectedTemplateOuverture;
       }

    set selectedTemplateOuverture(value: TemplateOuvertureVo) {
        this._selectedTemplateOuverture = value;
       }

    get templateOuvertureSelections(): Array<TemplateOuvertureVo> {
    if(this._templateOuvertureSelections==null){
    this._templateOuvertureSelections=new Array<TemplateOuvertureVo>();
    }
        return this._templateOuvertureSelections;
       }


    set templateOuvertureSelections(value: Array<TemplateOuvertureVo>) {
        this._templateOuvertureSelections = value;
       }

    get createTemplateOuvertureDialog(): boolean {
        return this._createTemplateOuvertureDialog;
       }

    set createTemplateOuvertureDialog(value: boolean) {
        this._createTemplateOuvertureDialog = value;
       }

    get editTemplateOuvertureDialog(): boolean {
        return this._editTemplateOuvertureDialog;
       }

    set editTemplateOuvertureDialog(value: boolean) {
        this._editTemplateOuvertureDialog = value;
       }

    get viewTemplateOuvertureDialog(): boolean {
        return this._viewTemplateOuvertureDialog;
       }

    set viewTemplateOuvertureDialog(value: boolean) {
        this._viewTemplateOuvertureDialog = value;
       }

     get searchTemplateOuverture(): TemplateOuvertureVo {
     if(this._searchTemplateOuverture==null){
    this._searchTemplateOuverture=new TemplateOuvertureVo();
    }
        return this._searchTemplateOuverture;
    }

    set searchTemplateOuverture(value: TemplateOuvertureVo) {
        this._searchTemplateOuverture = value;
       }

}
