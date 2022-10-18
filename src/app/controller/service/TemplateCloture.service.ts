import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TemplateClotureVo} from '../model/TemplateCloture.model';


@Injectable({
  providedIn: 'root'
})
export class TemplateClotureService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/templateCloture/';
        })
    }
     private _templateClotures: Array<TemplateClotureVo> ;
     private _selectedTemplateCloture: TemplateClotureVo;
     private _templateClotureSelections: Array<TemplateClotureVo>;
     private _createTemplateClotureDialog: boolean;
     private _editTemplateClotureDialog: boolean;
     private _viewTemplateClotureDialog: boolean;
     public editTemplateCloture$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchTemplateCloture:TemplateClotureVo ;

    // methods
    public archiver(templateCloture: TemplateClotureVo): Observable<TemplateClotureVo> {
        return this.http.put<TemplateClotureVo>(this.API + 'archiver/' ,templateCloture);
    }
    public desarchiver(templateCloture: TemplateClotureVo): Observable<TemplateClotureVo> {
    return this.http.put<TemplateClotureVo>(this.API + 'desarchiver/' ,templateCloture);
    }

    public findAll(){
     return this.http.get<Array<TemplateClotureVo>>(this.API);
    }

    public save(): Observable<TemplateClotureVo> {
           return this.http.post<TemplateClotureVo>(this.API, {...this.selectedTemplateCloture,dateCreation: moment(this.selectedTemplateCloture.dateCreation).format("YYYY-MM-DD")});
    }

    delete(templateCloture: TemplateClotureVo) {
         return this.http.delete<number>(this.API + 'id/' + templateCloture.id);
    }


    public edit(): Observable<TemplateClotureVo> {
        return this.http.put<TemplateClotureVo>(this.API, this.selectedTemplateCloture);
    }


     public findByCriteria(templateCloture:TemplateClotureVo):Observable<Array<TemplateClotureVo>>{
           return this.http.post<Array<TemplateClotureVo>>(this.API +'search', templateCloture);
    }

   public findByIdWithAssociatedList(templateCloture:TemplateClotureVo):Observable<TemplateClotureVo>{
         return this.http.get<TemplateClotureVo>(this.API + 'detail/id/' +templateCloture.id);
    }

    // getters and setters


    get templateClotures(): Array<TemplateClotureVo> {
    if(this._templateClotures==null){
    this._templateClotures=new Array<TemplateClotureVo>();
    }
return this._templateClotures;
       }

    set templateClotures(value: Array<TemplateClotureVo>) {
        this._templateClotures = value;
       }

    get selectedTemplateCloture(): TemplateClotureVo {
    if(this._selectedTemplateCloture==null){
    this._selectedTemplateCloture=new TemplateClotureVo();
    }
           return this._selectedTemplateCloture;
       }

    set selectedTemplateCloture(value: TemplateClotureVo) {
        this._selectedTemplateCloture = value;
       }

    get templateClotureSelections(): Array<TemplateClotureVo> {
    if(this._templateClotureSelections==null){
    this._templateClotureSelections=new Array<TemplateClotureVo>();
    }
        return this._templateClotureSelections;
       }


    set templateClotureSelections(value: Array<TemplateClotureVo>) {
        this._templateClotureSelections = value;
       }

    get createTemplateClotureDialog(): boolean {
        return this._createTemplateClotureDialog;
       }

    set createTemplateClotureDialog(value: boolean) {
        this._createTemplateClotureDialog = value;
       }

    get editTemplateClotureDialog(): boolean {
        return this._editTemplateClotureDialog;
       }

    set editTemplateClotureDialog(value: boolean) {
        this._editTemplateClotureDialog = value;
       }

    get viewTemplateClotureDialog(): boolean {
        return this._viewTemplateClotureDialog;
       }

    set viewTemplateClotureDialog(value: boolean) {
        this._viewTemplateClotureDialog = value;
       }

     get searchTemplateCloture(): TemplateClotureVo {
     if(this._searchTemplateCloture==null){
    this._searchTemplateCloture=new TemplateClotureVo();
    }
        return this._searchTemplateCloture;
    }

    set searchTemplateCloture(value: TemplateClotureVo) {
        this._searchTemplateCloture = value;
       }

}
