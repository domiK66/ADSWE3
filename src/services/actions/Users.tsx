import { createAction } from 'typesafe-actions';
import { Aquarium, User, UserResponse } from '../rest/interface';

export const loggedIn = createAction('user/loggedIn')<UserResponse>();
export const loggedOut = createAction('user/loggedOut')<void>();

export const register = createAction('user/register')<User>();

export const currentAquarium = createAction('user/currentaquarium')<Aquarium>();