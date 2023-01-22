import { Avatar, Card } from '@mui/material';

import { PersonDetails } from '../../../models/PersonDetails';

export interface UserInfoProps {
    personDetails: PersonDetails;
}

const UserInfo = (props: UserInfoProps): JSX.Element => {
    const personDetails = props.personDetails;

    return (
        <Card>
            {personDetails.avatar && <Avatar alt={personDetails.name} src={personDetails.avatar} />}
            <span>{personDetails.name}</span><br />
            <span>{personDetails.Team}</span><br />
            <span>{personDetails.joinedAt.toString()}</span>
        </Card>
    );
}

export default UserInfo;