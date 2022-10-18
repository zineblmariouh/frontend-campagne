import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FormatRencontreVo} from '../model/FormatRencontre.model';


@Injectable({
  providedIn: 'root'
})
export class FormatRencontreService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/formatRencontre/';
        })
    }
     private _formatRencontres: Array<FormatRencontreVo> ;
     private _selectedFormatRencontre: FormatRencontreVo;
     private _formatRencontreSelections: Array<FormatRencontreVo>;
     private _createFormatRencontreDialog: boolean;
     private _editFormatRencontreDialog: boolean;
     private _viewFormatRencontreDialog: boolean;
     public editFormatRencontre$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFormatRencontre:FormatRencontreVo ;

    // methods
    public archiver(formatRencontre: FormatRencontreVo): Observable<FormatRencontreVo> {
        return this.http.put<FormatRencontreVo>(this.API + 'archiver/' ,formatRencontre);
    }
    public desarchiver(formatRencontre: FormatRencontreVo): Observable<FormatRencontreVo> {
    return this.http.put<FormatRencontreVo>(this.API + 'desarchiver/' ,formatRencontre);
    }

    public findAll(){
     return this.http.get<Array<FormatRencontreVo>>(this.API);
    }

    public save(): Observable<FormatRencontreVo> {
           return this.http.post<FormatRencontreVo>(this.API, {...this.selectedFormatRencontre,dateCreation: moment(this.selectedFormatRencontre.dateCreation).format("YYYY-MM-DD")});
    }

    delete(formatRencontre: FormatRencontreVo) {
         return this.http.delete<number>(this.API + 'id/' + formatRencontre.id);
    }


    public edit(): Observable<FormatRencontreVo> {
        return this.http.put<FormatRencontreVo>(this.API, this.selectedFormatRencontre);
    }


     public findByCriteria(formatRencontre:FormatRencontreVo):Observable<Array<FormatRencontreVo>>{
           return this.http.post<Array<FormatRencontreVo>>(this.API +'search', formatRencontre);
    }

   public findByIdWithAssociatedList(formatRencontre:FormatRencontreVo):Observable<FormatRencontreVo>{
         return this.http.get<FormatRencontreVo>(this.API + 'detail/id/' +formatRencontre.id);
    }

    // getters and setters


    get formatRencontres(): Array<FormatRencontreVo> {
    if(this._formatRencontres==null){
    this._formatRencontres=new Array<FormatRencontreVo>();
    }
return this._formatRencontres;
       }

    set formatRencontres(value: Array<FormatRencontreVo>) {
        this._formatRencontres = value;
       }

    get selectedFormatRencontre(): FormatRencontreVo {
    if(this._selectedFormatRencontre==null){
    this._selectedFormatRencontre=new FormatRencontreVo();
    }
           return this._selectedFormatRencontre;
       }

    set selectedFormatRencontre(value: FormatRencontreVo) {
        this._selectedFormatRencontre = value;
       }

    get formatRencontreSelections(): Array<FormatRencontreVo> {
    if(this._formatRencontreSelections==null){
    this._formatRencontreSelections=new Array<FormatRencontreVo>();
    }
        return this._formatRencontreSelections;
       }


    set formatRencontreSelections(value: Array<FormatRencontreVo>) {
        this._formatRencontreSelections = value;
       }

    get createFormatRencontreDialog(): boolean {
        return this._createFormatRencontreDialog;
       }

    set createFormatRencontreDialog(value: boolean) {
        this._createFormatRencontreDialog = value;
       }

    get editFormatRencontreDialog(): boolean {
        return this._editFormatRencontreDialog;
       }

    set editFormatRencontreDialog(value: boolean) {
        this._editFormatRencontreDialog = value;
       }

    get viewFormatRencontreDialog(): boolean {
        return this._viewFormatRencontreDialog;
       }

    set viewFormatRencontreDialog(value: boolean) {
        this._viewFormatRencontreDialog = value;
       }

     get searchFormatRencontre(): FormatRencontreVo {
     if(this._searchFormatRencontre==null){
    this._searchFormatRencontre=new FormatRencontreVo();
    }
        return this._searchFormatRencontre;
    }

    set searchFormatRencontre(value: FormatRencontreVo) {
        this._searchFormatRencontre = value;
       }

}
