import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@mui/material';

import { PersonDetails } from '../../../models/PersonDetails';
import { Project } from '../../../models/Project';
import classes from './Info.module.css';
import { PersonDetailsContext } from '../../../contexts/ContextPerson';
import UserInfo from '../../shared/userInfo/UserInfo';
import { configs } from '../../../constants/configs';
import TableCard from '../../shared/TableCard/TableCard';

const Info = () => {
    const [token, setToken] = useState<string>();
    const [projects, setProjects] = useState<Project[]>();
    const { details } = useContext(PersonDetailsContext);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        getProjects();
    }, [])


    const getProjects = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.get(`${configs.serverURL}/info`).then(res => {
            setProjects(res.data);
        });
    };

    return (
        <div className="app">
            <div>
                <div className="title">Info</div>
                { details && <UserInfo personDetails={details} /> }
                { projects && <TableCard projects={projects} />}
            </div>
        </div>
    )
}

export default Info;