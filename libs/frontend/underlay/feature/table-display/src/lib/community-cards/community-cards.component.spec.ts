import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunityCardsComponent } from './community-cards.component';

describe('CommunityCardsComponent', () => {
    let component: CommunityCardsComponent;
    let fixture: ComponentFixture<CommunityCardsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommunityCardsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CommunityCardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
