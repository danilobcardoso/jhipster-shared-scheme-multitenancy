import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Contact } from './contact.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ContactService {

    private resourceUrl =  SERVER_API_URL + 'api/contacts';

    constructor(private http: Http) { }

    create(contact: Contact): Observable<Contact> {
        const copy = this.convert(contact);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(contact: Contact): Observable<Contact> {
        const copy = this.convert(contact);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Contact> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Contact.
     */
    private convertItemFromServer(json: any): Contact {
        const entity: Contact = Object.assign(new Contact(), json);
        return entity;
    }

    /**
     * Convert a Contact to a JSON which can be sent to the server.
     */
    private convert(contact: Contact): Contact {
        const copy: Contact = Object.assign({}, contact);
        return copy;
    }
}
