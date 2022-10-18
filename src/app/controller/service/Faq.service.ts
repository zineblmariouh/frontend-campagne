import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {FaqVo} from '../model/Faq.model';
import {CategorieFaqVo} from '../model/CategorieFaq.model';


@Injectable({
  providedIn: 'root'
})
export class FaqService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/faq/';
        })
    }
     private _faqs: Array<FaqVo> ;
     private _selectedFaq: FaqVo;
     private _faqSelections: Array<FaqVo>;
     private _createFaqDialog: boolean;
     private _editFaqDialog: boolean;
     private _viewFaqDialog: boolean;
     public editFaq$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchFaq:FaqVo ;

    // methods

    public findAll(){
     return this.http.get<Array<FaqVo>>(this.API);
    }

    public save(): Observable<FaqVo> {
           return this.http.post<FaqVo>(this.API, {...this.selectedFaq,dernierMisAJour: moment(this.selectedFaq.dernierMisAJour).format("YYYY-MM-DD")});
    }

    delete(faq: FaqVo) {
         return this.http.delete<number>(this.API + 'id/' + faq.id);
    }


    public edit(): Observable<FaqVo> {
        return this.http.put<FaqVo>(this.API, this.selectedFaq);
    }


     public findByCriteria(faq:FaqVo):Observable<Array<FaqVo>>{
           return this.http.post<Array<FaqVo>>(this.API +'search', faq);
    }

   public findByIdWithAssociatedList(faq:FaqVo):Observable<FaqVo>{
         return this.http.get<FaqVo>(this.API + 'detail/id/' +faq.id);
    }

    // getters and setters


    get faqs(): Array<FaqVo> {
    if(this._faqs==null){
    this._faqs=new Array<FaqVo>();
    }
return this._faqs;
       }

    set faqs(value: Array<FaqVo>) {
        this._faqs = value;
       }

    get selectedFaq(): FaqVo {
    if(this._selectedFaq==null){
    this._selectedFaq=new FaqVo();
    }
           return this._selectedFaq;
       }

    set selectedFaq(value: FaqVo) {
        this._selectedFaq = value;
       }

    get faqSelections(): Array<FaqVo> {
    if(this._faqSelections==null){
    this._faqSelections=new Array<FaqVo>();
    }
        return this._faqSelections;
       }


    set faqSelections(value: Array<FaqVo>) {
        this._faqSelections = value;
       }

    get createFaqDialog(): boolean {
        return this._createFaqDialog;
       }

    set createFaqDialog(value: boolean) {
        this._createFaqDialog = value;
       }

    get editFaqDialog(): boolean {
        return this._editFaqDialog;
       }

    set editFaqDialog(value: boolean) {
        this._editFaqDialog = value;
       }

    get viewFaqDialog(): boolean {
        return this._viewFaqDialog;
       }

    set viewFaqDialog(value: boolean) {
        this._viewFaqDialog = value;
       }

     get searchFaq(): FaqVo {
     if(this._searchFaq==null){
    this._searchFaq=new FaqVo();
    }
        return this._searchFaq;
    }

    set searchFaq(value: FaqVo) {
        this._searchFaq = value;
       }

}
