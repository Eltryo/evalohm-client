import {Injectable} from '@angular/core';
import {RequestService} from "../utility/services/request/request.service";

export interface Contact {
  subject: string,
  text: string,
  contactData: string
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private requestService: RequestService) {
  }

  contact(contact: Contact) {
    return this.requestService.request('POST', '/contact', contact)
  }
}
