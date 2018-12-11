import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case FACEBOOK_LOGIN_SUCCESS:
            return { toke: action.payload }
        case FACEBOOK_LOGIN_FAIL:
            return { toke: null }
        default:
            return state
    }
}