import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FinancementDoctorantVo} from '../model/FinancementDoctorant.model';


@Injectable({
  providedIn: 'root'
})
export class FinancementDoctorantService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/financementDoctorant/';
        })
    }
     private _financementDoctorants: Array<FinancementDoctorantVo> ;
     private _selectedFinancementDoctorant: FinancementDoctorantVo;
     private _financementDoctorantSelections: Array<FinancementDoctorantVo>;
     private _createFinancementDoctorantDialog: boolean;
     private _editFinancementDoctorantDialog: boolean;
     private _viewFinancementDoctorantDialog: boolean;
     public editFinancementDoctorant$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFinancementDoctorant:FinancementDoctorantVo ;

    // methods
    public archiver(financementDoctorant: FinancementDoctorantVo): Observable<FinancementDoctorantVo> {
        return this.http.put<FinancementDoctorantVo>(this.API + 'archiver/' ,financementDoctorant);
    }
    public desarchiver(financementDoctorant: FinancementDoctorantVo): Observable<FinancementDoctorantVo> {
    return this.http.put<FinancementDoctorantVo>(this.API + 'desarchiver/' ,financementDoctorant);
    }

    public findAll(){
     return this.http.get<Array<FinancementDoctorantVo>>(this.API);
    }

    public save(): Observable<FinancementDoctorantVo> {
           return this.http.post<FinancementDoctorantVo>(this.API, {...this.selectedFinancementDoctorant,dateCreation: moment(this.selectedFinancementDoctorant.dateCreation).format("YYYY-MM-DD")});
    }

    delete(financementDoctorant: FinancementDoctorantVo) {
         return this.http.delete<number>(this.API + 'id/' + financementDoctorant.id);
    }


    public edit(): Observable<FinancementDoctorantVo> {
        return this.http.put<FinancementDoctorantVo>(this.API, this.selectedFinancementDoctorant);
    }


     public findByCriteria(financementDoctorant:FinancementDoctorantVo):Observable<Array<FinancementDoctorantVo>>{
           return this.http.post<Array<FinancementDoctorantVo>>(this.API +'search', financementDoctorant);
    }

   public findByIdWithAssociatedList(financementDoctorant:FinancementDoctorantVo):Observable<FinancementDoctorantVo>{
         return this.http.get<FinancementDoctorantVo>(this.API + 'detail/id/' +financementDoctorant.id);
    }

    // getters and setters


    get financementDoctorants(): Array<FinancementDoctorantVo> {
    if(this._financementDoctorants==null){
    this._financementDoctorants=new Array<FinancementDoctorantVo>();
    }
return this._financementDoctorants;
       }

    set financementDoctorants(value: Array<FinancementDoctorantVo>) {
        this._financementDoctorants = value;
       }

    get selectedFinancementDoctorant(): FinancementDoctorantVo {
    if(this._selectedFinancementDoctorant==null){
    this._selectedFinancementDoctorant=new FinancementDoctorantVo();
    }
           return this._selectedFinancementDoctorant;
       }

    set selectedFinancementDoctorant(value: FinancementDoctorantVo) {
        this._selectedFinancementDoctorant = value;
       }

    get financementDoctorantSelections(): Array<FinancementDoctorantVo> {
    if(this._financementDoctorantSelections==null){
    this._financementDoctorantSelections=new Array<FinancementDoctorantVo>();
    }
        return this._financementDoctorantSelections;
       }


    set financementDoctorantSelections(value: Array<FinancementDoctorantVo>) {
        this._financementDoctorantSelections = value;
       }

    get createFinancementDoctorantDialog(): boolean {
        return this._createFinancementDoctorantDialog;
       }

    set createFinancementDoctorantDialog(value: boolean) {
        this._createFinancementDoctorantDialog = value;
       }

    get editFinancementDoctorantDialog(): boolean {
        return this._editFinancementDoctorantDialog;
       }

    set editFinancementDoctorantDialog(value: boolean) {
        this._editFinancementDoctorantDialog = value;
       }

    get viewFinancementDoctorantDialog(): boolean {
        return this._viewFinancementDoctorantDialog;
       }

    set viewFinancementDoctorantDialog(value: boolean) {
        this._viewFinancementDoctorantDialog = value;
       }

     get searchFinancementDoctorant(): FinancementDoctorantVo {
     if(this._searchFinancementDoctorant==null){
    this._searchFinancementDoctorant=new FinancementDoctorantVo();
    }
        return this._searchFinancementDoctorant;
    }

    set searchFinancementDoctorant(value: FinancementDoctorantVo) {
        this._searchFinancementDoctorant = value;
       }

}
