/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DiscriminatorTestModule } from '../../../test.module';
import { ContactDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/contact/contact-delete-dialog.component';
import { ContactService } from '../../../../../../main/webapp/app/entities/contact/contact.service';

describe('Component Tests', () => {

    describe('Contact Management Delete Component', () => {
        let comp: ContactDeleteDialogComponent;
        let fixture: ComponentFixture<ContactDeleteDialogComponent>;
        let service: ContactService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DiscriminatorTestModule],
                declarations: [ContactDeleteDialogComponent],
                providers: [
                    ContactService
                ]
            })
            .overrideTemplate(ContactDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ContactDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContactService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
