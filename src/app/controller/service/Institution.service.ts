import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {InstitutionVo} from '../model/Institution.model';


@Injectable({
  providedIn: 'root'
})
export class InstitutionService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/institution/';
        })
    }
     private _institutions: Array<InstitutionVo> ;
     private _selectedInstitution: InstitutionVo;
     private _institutionSelections: Array<InstitutionVo>;
     private _createInstitutionDialog: boolean;
     private _editInstitutionDialog: boolean;
     private _viewInstitutionDialog: boolean;
     public editInstitution$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchInstitution:InstitutionVo ;

    // methods
    public archiver(institution: InstitutionVo): Observable<InstitutionVo> {
        return this.http.put<InstitutionVo>(this.API + 'archiver/' ,institution);
    }
    public desarchiver(institution: InstitutionVo): Observable<InstitutionVo> {
    return this.http.put<InstitutionVo>(this.API + 'desarchiver/' ,institution);
    }

    public findAll(){
     return this.http.get<Array<InstitutionVo>>(this.API);
    }

    public save(): Observable<InstitutionVo> {
           return this.http.post<InstitutionVo>(this.API, {...this.selectedInstitution,dateCreation: moment(this.selectedInstitution.dateCreation).format("YYYY-MM-DD")});
    }

    delete(institution: InstitutionVo) {
         return this.http.delete<number>(this.API + 'id/' + institution.id);
    }


    public edit(): Observable<InstitutionVo> {
        return this.http.put<InstitutionVo>(this.API, this.selectedInstitution);
    }


     public findByCriteria(institution:InstitutionVo):Observable<Array<InstitutionVo>>{
           return this.http.post<Array<InstitutionVo>>(this.API +'search', institution);
    }

   public findByIdWithAssociatedList(institution:InstitutionVo):Observable<InstitutionVo>{
         return this.http.get<InstitutionVo>(this.API + 'detail/id/' +institution.id);
    }

    // getters and setters


    get institutions(): Array<InstitutionVo> {
    if(this._institutions==null){
    this._institutions=new Array<InstitutionVo>();
    }
return this._institutions;
       }

    set institutions(value: Array<InstitutionVo>) {
        this._institutions = value;
       }

    get selectedInstitution(): InstitutionVo {
    if(this._selectedInstitution==null){
    this._selectedInstitution=new InstitutionVo();
    }
           return this._selectedInstitution;
       }

    set selectedInstitution(value: InstitutionVo) {
        this._selectedInstitution = value;
       }

    get institutionSelections(): Array<InstitutionVo> {
    if(this._institutionSelections==null){
    this._institutionSelections=new Array<InstitutionVo>();
    }
        return this._institutionSelections;
       }


    set institutionSelections(value: Array<InstitutionVo>) {
        this._institutionSelections = value;
       }

    get createInstitutionDialog(): boolean {
        return this._createInstitutionDialog;
       }

    set createInstitutionDialog(value: boolean) {
        this._createInstitutionDialog = value;
       }

    get editInstitutionDialog(): boolean {
        return this._editInstitutionDialog;
       }

    set editInstitutionDialog(value: boolean) {
        this._editInstitutionDialog = value;
       }

    get viewInstitutionDialog(): boolean {
        return this._viewInstitutionDialog;
       }

    set viewInstitutionDialog(value: boolean) {
        this._viewInstitutionDialog = value;
       }

     get searchInstitution(): InstitutionVo {
     if(this._searchInstitution==null){
    this._searchInstitution=new InstitutionVo();
    }
        return this._searchInstitution;
    }

    set searchInstitution(value: InstitutionVo) {
        this._searchInstitution = value;
       }

}
