import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CorpsVo} from '../model/Corps.model';


@Injectable({
  providedIn: 'root'
})
export class CorpsService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/corps/';
        })
    }
     private _corpss: Array<CorpsVo> ;
     private _selectedCorps: CorpsVo;
     private _corpsSelections: Array<CorpsVo>;
     private _createCorpsDialog: boolean;
     private _editCorpsDialog: boolean;
     private _viewCorpsDialog: boolean;
     public editCorps$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCorps:CorpsVo ;

    // methods
    public archiver(corps: CorpsVo): Observable<CorpsVo> {
        return this.http.put<CorpsVo>(this.API + 'archiver/' ,corps);
    }
    public desarchiver(corps: CorpsVo): Observable<CorpsVo> {
    return this.http.put<CorpsVo>(this.API + 'desarchiver/' ,corps);
    }

    public findAll(){
     return this.http.get<Array<CorpsVo>>(this.API);
    }

    public save(): Observable<CorpsVo> {
           return this.http.post<CorpsVo>(this.API, {...this.selectedCorps,dateCreation: moment(this.selectedCorps.dateCreation).format("YYYY-MM-DD")});
    }

    delete(corps: CorpsVo) {
         return this.http.delete<number>(this.API + 'id/' + corps.id);
    }


    public edit(): Observable<CorpsVo> {
        return this.http.put<CorpsVo>(this.API, this.selectedCorps);
    }


     public findByCriteria(corps:CorpsVo):Observable<Array<CorpsVo>>{
           return this.http.post<Array<CorpsVo>>(this.API +'search', corps);
    }

   public findByIdWithAssociatedList(corps:CorpsVo):Observable<CorpsVo>{
         return this.http.get<CorpsVo>(this.API + 'detail/id/' +corps.id);
    }

    // getters and setters


    get corpss(): Array<CorpsVo> {
    if(this._corpss==null){
    this._corpss=new Array<CorpsVo>();
    }
return this._corpss;
       }

    set corpss(value: Array<CorpsVo>) {
        this._corpss = value;
       }

    get selectedCorps(): CorpsVo {
    if(this._selectedCorps==null){
    this._selectedCorps=new CorpsVo();
    }
           return this._selectedCorps;
       }

    set selectedCorps(value: CorpsVo) {
        this._selectedCorps = value;
       }

    get corpsSelections(): Array<CorpsVo> {
    if(this._corpsSelections==null){
    this._corpsSelections=new Array<CorpsVo>();
    }
        return this._corpsSelections;
       }


    set corpsSelections(value: Array<CorpsVo>) {
        this._corpsSelections = value;
       }

    get createCorpsDialog(): boolean {
        return this._createCorpsDialog;
       }

    set createCorpsDialog(value: boolean) {
        this._createCorpsDialog = value;
       }

    get editCorpsDialog(): boolean {
        return this._editCorpsDialog;
       }

    set editCorpsDialog(value: boolean) {
        this._editCorpsDialog = value;
       }

    get viewCorpsDialog(): boolean {
        return this._viewCorpsDialog;
       }

    set viewCorpsDialog(value: boolean) {
        this._viewCorpsDialog = value;
       }

     get searchCorps(): CorpsVo {
     if(this._searchCorps==null){
    this._searchCorps=new CorpsVo();
    }
        return this._searchCorps;
    }

    set searchCorps(value: CorpsVo) {
        this._searchCorps = value;
       }

}
