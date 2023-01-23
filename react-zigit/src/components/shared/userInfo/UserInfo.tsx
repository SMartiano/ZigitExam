import { Avatar, Card } from '@mui/material';

import { PersonDetails } from '../../../models/PersonDetails';
import classes from './UserInfo.module.css';

export interface UserInfoProps {
    personDetails: PersonDetails;
}

const UserInfo = (props: UserInfoProps): JSX.Element => {
    const personDetails = props.personDetails;

    return (
        <Card className={classes.card}>
            {
                personDetails.avatar && 
                <Avatar 
                    sx={{ margin: '10px' }} 
                    alt={personDetails.name} 
                    src={personDetails.avatar} />
            }
            <span>{personDetails.name}</span><br />
            <span>{personDetails.Team}</span><br />
            <span>{personDetails.joinedAt.toString()}</span>
        </Card>
    );
}

export default UserInfo;