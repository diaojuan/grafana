import { Epic } from 'redux-observable';
import { map, throttleTime } from 'rxjs/operators';

import { StoreState } from 'app/types';
import { ActionOf } from '../../../../core/redux/actionCreatorFactory';
import { limitMessageRatePayloadAction, LimitMessageRatePayload, subscriptionDataReceivedAction } from '../actionTypes';
import { EpicDependencies } from 'app/store/configureStore';

export const limitMessageRateEpic: Epic<ActionOf<any>, ActionOf<any>, StoreState, EpicDependencies> = action$ => {
  return action$.ofType(limitMessageRatePayloadAction.type).pipe(
    throttleTime(1),
    map((action: ActionOf<LimitMessageRatePayload>) => {
      const { exploreId, data } = action.payload;
      return subscriptionDataReceivedAction({ exploreId, data });
    })
  );
};
