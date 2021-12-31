import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NG_ENVIRONMENT } from '@poker-moons/frontend/shared/util/environment';
import { FrontendBuilderShellComponent } from './frontend-builder-shell.component';
import { frontendBuilderShellImports } from './frontend-builder-shell.module';

describe('FrontendBuilderShellComponent', () => {
    let component: FrontendBuilderShellComponent;
    let fixture: ComponentFixture<FrontendBuilderShellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: frontendBuilderShellImports,
            providers: [
                { provide: NG_ENVIRONMENT, useValue: {} },
                { provide: Router, useValue: {} },
            ],
            declarations: [FrontendBuilderShellComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FrontendBuilderShellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
