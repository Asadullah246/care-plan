import {combineReducers} from 'redux';
import patient from './Patients/patient.reducer';
import user from './User/user.reducer';
import teamMembers from './TeamMember/team.member.reducer';
import codes from './Codes/code.reducer';

export const rootReducers = combineReducers({patient, user, teamMembers, codes })
export type RootState = ReturnType<typeof rootReducers>