import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {NatureExpertiseVo} from '../model/NatureExpertise.model';


@Injectable({
  providedIn: 'root'
})
export class NatureExpertiseService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/natureExpertise/';
        })
    }
     private _natureExpertises: Array<NatureExpertiseVo> ;
     private _selectedNatureExpertise: NatureExpertiseVo;
     private _natureExpertiseSelections: Array<NatureExpertiseVo>;
     private _createNatureExpertiseDialog: boolean;
     private _editNatureExpertiseDialog: boolean;
     private _viewNatureExpertiseDialog: boolean;
     public editNatureExpertise$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchNatureExpertise:NatureExpertiseVo ;

    // methods
    public archiver(natureExpertise: NatureExpertiseVo): Observable<NatureExpertiseVo> {
        return this.http.put<NatureExpertiseVo>(this.API + 'archiver/' ,natureExpertise);
    }
    public desarchiver(natureExpertise: NatureExpertiseVo): Observable<NatureExpertiseVo> {
    return this.http.put<NatureExpertiseVo>(this.API + 'desarchiver/' ,natureExpertise);
    }

    public findAll(){
     return this.http.get<Array<NatureExpertiseVo>>(this.API);
    }

    public save(): Observable<NatureExpertiseVo> {
           return this.http.post<NatureExpertiseVo>(this.API, {...this.selectedNatureExpertise,dateCreation: moment(this.selectedNatureExpertise.dateCreation).format("YYYY-MM-DD")});
    }

    delete(natureExpertise: NatureExpertiseVo) {
         return this.http.delete<number>(this.API + 'id/' + natureExpertise.id);
    }


    public edit(): Observable<NatureExpertiseVo> {
        return this.http.put<NatureExpertiseVo>(this.API, this.selectedNatureExpertise);
    }


     public findByCriteria(natureExpertise:NatureExpertiseVo):Observable<Array<NatureExpertiseVo>>{
           return this.http.post<Array<NatureExpertiseVo>>(this.API +'search', natureExpertise);
    }

   public findByIdWithAssociatedList(natureExpertise:NatureExpertiseVo):Observable<NatureExpertiseVo>{
         return this.http.get<NatureExpertiseVo>(this.API + 'detail/id/' +natureExpertise.id);
    }

    // getters and setters


    get natureExpertises(): Array<NatureExpertiseVo> {
    if(this._natureExpertises==null){
    this._natureExpertises=new Array<NatureExpertiseVo>();
    }
return this._natureExpertises;
       }

    set natureExpertises(value: Array<NatureExpertiseVo>) {
        this._natureExpertises = value;
       }

    get selectedNatureExpertise(): NatureExpertiseVo {
    if(this._selectedNatureExpertise==null){
    this._selectedNatureExpertise=new NatureExpertiseVo();
    }
           return this._selectedNatureExpertise;
       }

    set selectedNatureExpertise(value: NatureExpertiseVo) {
        this._selectedNatureExpertise = value;
       }

    get natureExpertiseSelections(): Array<NatureExpertiseVo> {
    if(this._natureExpertiseSelections==null){
    this._natureExpertiseSelections=new Array<NatureExpertiseVo>();
    }
        return this._natureExpertiseSelections;
       }


    set natureExpertiseSelections(value: Array<NatureExpertiseVo>) {
        this._natureExpertiseSelections = value;
       }

    get createNatureExpertiseDialog(): boolean {
        return this._createNatureExpertiseDialog;
       }

    set createNatureExpertiseDialog(value: boolean) {
        this._createNatureExpertiseDialog = value;
       }

    get editNatureExpertiseDialog(): boolean {
        return this._editNatureExpertiseDialog;
       }

    set editNatureExpertiseDialog(value: boolean) {
        this._editNatureExpertiseDialog = value;
       }

    get viewNatureExpertiseDialog(): boolean {
        return this._viewNatureExpertiseDialog;
       }

    set viewNatureExpertiseDialog(value: boolean) {
        this._viewNatureExpertiseDialog = value;
       }

     get searchNatureExpertise(): NatureExpertiseVo {
     if(this._searchNatureExpertise==null){
    this._searchNatureExpertise=new NatureExpertiseVo();
    }
        return this._searchNatureExpertise;
    }

    set searchNatureExpertise(value: NatureExpertiseVo) {
        this._searchNatureExpertise = value;
       }

}
