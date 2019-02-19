import { graphql } from 'react-apollo';
import { KICK_USER, LEAVE_TEAM } from '../../../constants/mutations';

export const kickUser = graphql(KICK_USER);

export const leaveTeam = graphql(LEAVE_TEAM);
