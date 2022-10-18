import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {StatusCursusVo} from '../model/StatusCursus.model';


@Injectable({
  providedIn: 'root'
})
export class StatusCursusService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/statusCursus/';
        })
    }
     private _statusCursuss: Array<StatusCursusVo> ;
     private _selectedStatusCursus: StatusCursusVo;
     private _statusCursusSelections: Array<StatusCursusVo>;
     private _createStatusCursusDialog: boolean;
     private _editStatusCursusDialog: boolean;
     private _viewStatusCursusDialog: boolean;
     public editStatusCursus$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchStatusCursus:StatusCursusVo ;

    // methods
    public archiver(statusCursus: StatusCursusVo): Observable<StatusCursusVo> {
        return this.http.put<StatusCursusVo>(this.API + 'archiver/' ,statusCursus);
    }
    public desarchiver(statusCursus: StatusCursusVo): Observable<StatusCursusVo> {
    return this.http.put<StatusCursusVo>(this.API + 'desarchiver/' ,statusCursus);
    }

    public findAll(){
     return this.http.get<Array<StatusCursusVo>>(this.API);
    }

    public save(): Observable<StatusCursusVo> {
           return this.http.post<StatusCursusVo>(this.API, {...this.selectedStatusCursus,dateCreation: moment(this.selectedStatusCursus.dateCreation).format("YYYY-MM-DD")});
    }

    delete(statusCursus: StatusCursusVo) {
         return this.http.delete<number>(this.API + 'id/' + statusCursus.id);
    }


    public edit(): Observable<StatusCursusVo> {
        return this.http.put<StatusCursusVo>(this.API, this.selectedStatusCursus);
    }


     public findByCriteria(statusCursus:StatusCursusVo):Observable<Array<StatusCursusVo>>{
           return this.http.post<Array<StatusCursusVo>>(this.API +'search', statusCursus);
    }

   public findByIdWithAssociatedList(statusCursus:StatusCursusVo):Observable<StatusCursusVo>{
         return this.http.get<StatusCursusVo>(this.API + 'detail/id/' +statusCursus.id);
    }

    // getters and setters


    get statusCursuss(): Array<StatusCursusVo> {
    if(this._statusCursuss==null){
    this._statusCursuss=new Array<StatusCursusVo>();
    }
return this._statusCursuss;
       }

    set statusCursuss(value: Array<StatusCursusVo>) {
        this._statusCursuss = value;
       }

    get selectedStatusCursus(): StatusCursusVo {
    if(this._selectedStatusCursus==null){
    this._selectedStatusCursus=new StatusCursusVo();
    }
           return this._selectedStatusCursus;
       }

    set selectedStatusCursus(value: StatusCursusVo) {
        this._selectedStatusCursus = value;
       }

    get statusCursusSelections(): Array<StatusCursusVo> {
    if(this._statusCursusSelections==null){
    this._statusCursusSelections=new Array<StatusCursusVo>();
    }
        return this._statusCursusSelections;
       }


    set statusCursusSelections(value: Array<StatusCursusVo>) {
        this._statusCursusSelections = value;
       }

    get createStatusCursusDialog(): boolean {
        return this._createStatusCursusDialog;
       }

    set createStatusCursusDialog(value: boolean) {
        this._createStatusCursusDialog = value;
       }

    get editStatusCursusDialog(): boolean {
        return this._editStatusCursusDialog;
       }

    set editStatusCursusDialog(value: boolean) {
        this._editStatusCursusDialog = value;
       }

    get viewStatusCursusDialog(): boolean {
        return this._viewStatusCursusDialog;
       }

    set viewStatusCursusDialog(value: boolean) {
        this._viewStatusCursusDialog = value;
       }

     get searchStatusCursus(): StatusCursusVo {
     if(this._searchStatusCursus==null){
    this._searchStatusCursus=new StatusCursusVo();
    }
        return this._searchStatusCursus;
    }

    set searchStatusCursus(value: StatusCursusVo) {
        this._searchStatusCursus = value;
       }

}
