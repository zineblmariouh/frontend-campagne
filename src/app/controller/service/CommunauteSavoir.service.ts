import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CommunauteSavoirVo} from '../model/CommunauteSavoir.model';


@Injectable({
  providedIn: 'root'
})
export class CommunauteSavoirService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/communauteSavoir/';
        })
    }
     private _communauteSavoirs: Array<CommunauteSavoirVo> ;
     private _selectedCommunauteSavoir: CommunauteSavoirVo;
     private _communauteSavoirSelections: Array<CommunauteSavoirVo>;
     private _createCommunauteSavoirDialog: boolean;
     private _editCommunauteSavoirDialog: boolean;
     private _viewCommunauteSavoirDialog: boolean;
     public editCommunauteSavoir$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCommunauteSavoir:CommunauteSavoirVo ;

    // methods
    public archiver(communauteSavoir: CommunauteSavoirVo): Observable<CommunauteSavoirVo> {
        return this.http.put<CommunauteSavoirVo>(this.API + 'archiver/' ,communauteSavoir);
    }
    public desarchiver(communauteSavoir: CommunauteSavoirVo): Observable<CommunauteSavoirVo> {
    return this.http.put<CommunauteSavoirVo>(this.API + 'desarchiver/' ,communauteSavoir);
    }

    public findAll(){
     return this.http.get<Array<CommunauteSavoirVo>>(this.API);
    }

    public save(): Observable<CommunauteSavoirVo> {
           return this.http.post<CommunauteSavoirVo>(this.API, {...this.selectedCommunauteSavoir,dateCreation: moment(this.selectedCommunauteSavoir.dateCreation).format("YYYY-MM-DD")});
    }

    delete(communauteSavoir: CommunauteSavoirVo) {
         return this.http.delete<number>(this.API + 'id/' + communauteSavoir.id);
    }


    public edit(): Observable<CommunauteSavoirVo> {
        return this.http.put<CommunauteSavoirVo>(this.API, this.selectedCommunauteSavoir);
    }


     public findByCriteria(communauteSavoir:CommunauteSavoirVo):Observable<Array<CommunauteSavoirVo>>{
           return this.http.post<Array<CommunauteSavoirVo>>(this.API +'search', communauteSavoir);
    }

   public findByIdWithAssociatedList(communauteSavoir:CommunauteSavoirVo):Observable<CommunauteSavoirVo>{
         return this.http.get<CommunauteSavoirVo>(this.API + 'detail/id/' +communauteSavoir.id);
    }

    // getters and setters


    get communauteSavoirs(): Array<CommunauteSavoirVo> {
    if(this._communauteSavoirs==null){
    this._communauteSavoirs=new Array<CommunauteSavoirVo>();
    }
return this._communauteSavoirs;
       }

    set communauteSavoirs(value: Array<CommunauteSavoirVo>) {
        this._communauteSavoirs = value;
       }

    get selectedCommunauteSavoir(): CommunauteSavoirVo {
    if(this._selectedCommunauteSavoir==null){
    this._selectedCommunauteSavoir=new CommunauteSavoirVo();
    }
           return this._selectedCommunauteSavoir;
       }

    set selectedCommunauteSavoir(value: CommunauteSavoirVo) {
        this._selectedCommunauteSavoir = value;
       }

    get communauteSavoirSelections(): Array<CommunauteSavoirVo> {
    if(this._communauteSavoirSelections==null){
    this._communauteSavoirSelections=new Array<CommunauteSavoirVo>();
    }
        return this._communauteSavoirSelections;
       }


    set communauteSavoirSelections(value: Array<CommunauteSavoirVo>) {
        this._communauteSavoirSelections = value;
       }

    get createCommunauteSavoirDialog(): boolean {
        return this._createCommunauteSavoirDialog;
       }

    set createCommunauteSavoirDialog(value: boolean) {
        this._createCommunauteSavoirDialog = value;
       }

    get editCommunauteSavoirDialog(): boolean {
        return this._editCommunauteSavoirDialog;
       }

    set editCommunauteSavoirDialog(value: boolean) {
        this._editCommunauteSavoirDialog = value;
       }

    get viewCommunauteSavoirDialog(): boolean {
        return this._viewCommunauteSavoirDialog;
       }

    set viewCommunauteSavoirDialog(value: boolean) {
        this._viewCommunauteSavoirDialog = value;
       }

     get searchCommunauteSavoir(): CommunauteSavoirVo {
     if(this._searchCommunauteSavoir==null){
    this._searchCommunauteSavoir=new CommunauteSavoirVo();
    }
        return this._searchCommunauteSavoir;
    }

    set searchCommunauteSavoir(value: CommunauteSavoirVo) {
        this._searchCommunauteSavoir = value;
       }

}
