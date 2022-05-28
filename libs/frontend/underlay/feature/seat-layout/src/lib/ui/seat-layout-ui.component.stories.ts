import { Injectable } from '@angular/core';
import { TableStateFacade } from '@poker-moons/frontend/shared/state/table';
import { MockNgEnvironment } from '@poker-moons/frontend/shared/util/environment';
import { mockCard, mockImmutablePublicPlayer, mockMutablePublicPlayer } from '@poker-moons/shared/testing';
import { ImmutablePublicPlayer, MutablePublicPlayer, SeatId } from '@poker-moons/shared/type';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { Observable, of } from 'rxjs';
import {} from 'ts-essentials';
import { SeatLayoutUiComponent } from './seat-layout-ui.component';
import { seatLayoutUiImports } from './seat-layout-ui.module';

/**
 * @description Mock version of {@link TableStateFacade} so that the seat layout will be filled with mock data to be displayed
 */
@Injectable()
class MockTableStateFacade {
    selectMutablePlayerBySeatId(seatId: SeatId): Observable<MutablePublicPlayer> {
        if (seatId === 0) {
            return of(
                mockMutablePublicPlayer({
                    stack: 9999,
                    cards: [mockCard({ suit: 'clubs', rank: '14' }), mockCard({ suit: 'spades', rank: '14' })],
                }),
            );
        }

        return of(mockMutablePublicPlayer({ stack: 9999, cards: [null, null] }));
    }

    selectImmutablePlayerBySeatId(seatId: SeatId): Observable<ImmutablePublicPlayer> {
        return of(mockImmutablePublicPlayer({ seatId }));
    }
}

export default {
    title: 'SeatLayoutUiComponent',
    component: SeatLayoutUiComponent,
    decorators: [
        moduleMetadata({
            imports: [...seatLayoutUiImports],
            providers: [{ provide: TableStateFacade, useClass: MockTableStateFacade }, MockNgEnvironment],
        }),
    ],
} as Meta<SeatLayoutUiComponent>;

const Template: Story<SeatLayoutUiComponent> = (args: SeatLayoutUiComponent) => ({
    component: SeatLayoutUiComponent,
    props: args,
});

export const Primary = Template.bind({});
Primary.args = {
    clientSeatId: 0,
};
