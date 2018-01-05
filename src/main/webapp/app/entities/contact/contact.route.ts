import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactPopupComponent } from './contact-dialog.component';
import { ContactDeletePopupComponent } from './contact-delete-dialog.component';

export const contactRoute: Routes = [
    {
        path: 'contact',
        component: ContactComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'contact/:id',
        component: ContactDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const contactPopupRoute: Routes = [
    {
        path: 'contact-new',
        component: ContactPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact/:id/edit',
        component: ContactPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'contact/:id/delete',
        component: ContactDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Contacts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
