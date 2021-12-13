import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'poker-moons-table-display-community-cards',
    templateUrl: './community-cards.component.html',
    styleUrls: ['./community-cards.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityCardsComponent {}
