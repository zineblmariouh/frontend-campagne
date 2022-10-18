import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PubliqueProfessionelVo} from '../model/PubliqueProfessionel.model';


@Injectable({
  providedIn: 'root'
})
export class PubliqueProfessionelService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/publiqueProfessionel/';
        })
    }
     private _publiqueProfessionels: Array<PubliqueProfessionelVo> ;
     private _selectedPubliqueProfessionel: PubliqueProfessionelVo;
     private _publiqueProfessionelSelections: Array<PubliqueProfessionelVo>;
     private _createPubliqueProfessionelDialog: boolean;
     private _editPubliqueProfessionelDialog: boolean;
     private _viewPubliqueProfessionelDialog: boolean;
     public editPubliqueProfessionel$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPubliqueProfessionel:PubliqueProfessionelVo ;

    // methods
    public archiver(publiqueProfessionel: PubliqueProfessionelVo): Observable<PubliqueProfessionelVo> {
        return this.http.put<PubliqueProfessionelVo>(this.API + 'archiver/' ,publiqueProfessionel);
    }
    public desarchiver(publiqueProfessionel: PubliqueProfessionelVo): Observable<PubliqueProfessionelVo> {
    return this.http.put<PubliqueProfessionelVo>(this.API + 'desarchiver/' ,publiqueProfessionel);
    }

    public findAll(){
     return this.http.get<Array<PubliqueProfessionelVo>>(this.API);
    }

    public save(): Observable<PubliqueProfessionelVo> {
           return this.http.post<PubliqueProfessionelVo>(this.API, {...this.selectedPubliqueProfessionel,dateCreation: moment(this.selectedPubliqueProfessionel.dateCreation).format("YYYY-MM-DD")});
    }

    delete(publiqueProfessionel: PubliqueProfessionelVo) {
         return this.http.delete<number>(this.API + 'id/' + publiqueProfessionel.id);
    }


    public edit(): Observable<PubliqueProfessionelVo> {
        return this.http.put<PubliqueProfessionelVo>(this.API, this.selectedPubliqueProfessionel);
    }


     public findByCriteria(publiqueProfessionel:PubliqueProfessionelVo):Observable<Array<PubliqueProfessionelVo>>{
           return this.http.post<Array<PubliqueProfessionelVo>>(this.API +'search', publiqueProfessionel);
    }

   public findByIdWithAssociatedList(publiqueProfessionel:PubliqueProfessionelVo):Observable<PubliqueProfessionelVo>{
         return this.http.get<PubliqueProfessionelVo>(this.API + 'detail/id/' +publiqueProfessionel.id);
    }

    // getters and setters


    get publiqueProfessionels(): Array<PubliqueProfessionelVo> {
    if(this._publiqueProfessionels==null){
    this._publiqueProfessionels=new Array<PubliqueProfessionelVo>();
    }
return this._publiqueProfessionels;
       }

    set publiqueProfessionels(value: Array<PubliqueProfessionelVo>) {
        this._publiqueProfessionels = value;
       }

    get selectedPubliqueProfessionel(): PubliqueProfessionelVo {
    if(this._selectedPubliqueProfessionel==null){
    this._selectedPubliqueProfessionel=new PubliqueProfessionelVo();
    }
           return this._selectedPubliqueProfessionel;
       }

    set selectedPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this._selectedPubliqueProfessionel = value;
       }

    get publiqueProfessionelSelections(): Array<PubliqueProfessionelVo> {
    if(this._publiqueProfessionelSelections==null){
    this._publiqueProfessionelSelections=new Array<PubliqueProfessionelVo>();
    }
        return this._publiqueProfessionelSelections;
       }


    set publiqueProfessionelSelections(value: Array<PubliqueProfessionelVo>) {
        this._publiqueProfessionelSelections = value;
       }

    get createPubliqueProfessionelDialog(): boolean {
        return this._createPubliqueProfessionelDialog;
       }

    set createPubliqueProfessionelDialog(value: boolean) {
        this._createPubliqueProfessionelDialog = value;
       }

    get editPubliqueProfessionelDialog(): boolean {
        return this._editPubliqueProfessionelDialog;
       }

    set editPubliqueProfessionelDialog(value: boolean) {
        this._editPubliqueProfessionelDialog = value;
       }

    get viewPubliqueProfessionelDialog(): boolean {
        return this._viewPubliqueProfessionelDialog;
       }

    set viewPubliqueProfessionelDialog(value: boolean) {
        this._viewPubliqueProfessionelDialog = value;
       }

     get searchPubliqueProfessionel(): PubliqueProfessionelVo {
     if(this._searchPubliqueProfessionel==null){
    this._searchPubliqueProfessionel=new PubliqueProfessionelVo();
    }
        return this._searchPubliqueProfessionel;
    }

    set searchPubliqueProfessionel(value: PubliqueProfessionelVo) {
        this._searchPubliqueProfessionel = value;
       }

}
