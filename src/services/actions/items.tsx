import { createAsyncAction } from 'typesafe-actions';
import { Animal, AquariumClient, Coral } from '../rest/interface';
import { ThunkAction } from 'redux-thunk';
import { IConfig } from '../rest/IConfig';
import { RootState } from '../reducers/Index';
import { AnyAction } from 'redux';
import ServerConfig from '../rest/ServerConfig';

export const fetchCoralsActions = createAsyncAction('FETCH_CORALS_REQUEST', 'FETCH_CORALS_SUCCESS', 'FETCH_CORALS_FAILURE')<void, Coral[], Error>();

export type CoralsResult = ReturnType<typeof fetchCoralsActions.success> | ReturnType<typeof fetchCoralsActions.failure>;

export const fetchCoralsAction = (): ThunkAction<Promise<CoralsResult>, RootState, null, AnyAction> => (dispatch, getState) => {
  dispatch(fetchCoralsActions.request());
  const token = getState().user.authenticationInformation!.token || '';
  const accessheader = new IConfig();
  accessheader.setToken(token);
  // accessheader.getAuthorization()
  const aquariumClient = new AquariumClient(accessheader, ServerConfig.host);

  return aquariumClient
    .getCorals('SchiScho')
    .then(corals => dispatch(fetchCoralsActions.success(corals)))
    .catch(err => dispatch(fetchCoralsActions.failure(err)));
};

export const fetchAnimalsActions = createAsyncAction('FETCH_ANIMALS_REQUEST', 'FETCH_ANIMALS_SUCCESS', 'FETCH_ANIMALS_FAILURE')<void, Animal[], Error>();
export type AnimalsResult = ReturnType<typeof fetchAnimalsActions.success> | ReturnType<typeof fetchAnimalsActions.failure>;

export const fetchAnimalsAction = (): ThunkAction<Promise<AnimalsResult>, RootState, null, AnyAction> => (dispatch, getState) => {
  dispatch(fetchAnimalsActions.request());
  const token = getState().user.authenticationInformation!.token || '';
  const accessheader = new IConfig();
  accessheader.setToken(token);
  // accessheader.getAuthorization()
  const aquariumClient = new AquariumClient(accessheader, ServerConfig.host);

  return aquariumClient
    .getAnimals('SchiScho')
    .then(a => dispatch(fetchAnimalsActions.success(a)))
    .catch(err => dispatch(fetchAnimalsActions.failure(err)));
};
