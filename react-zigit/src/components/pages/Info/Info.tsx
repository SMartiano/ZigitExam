import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Project } from '../../../models/Project';
import { PersonDetailsContext } from '../../../contexts/ContextPerson';
import UserInfo from '../../shared/userInfo/UserInfo';
import { configs } from '../../../constants/configs';
import TableCard from '../../shared/TableCard/TableCard';
import classes from './Info.module.css';

const Info = () => {
    const [token, setToken] = useState<string>();
    const [projects, setProjects] = useState<Project[]>();
    const { details } = useContext(PersonDetailsContext);

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        getProjects();
    }, [])


    const getProjects = () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
        axios.get(`${configs.serverURL}/info`).then(res => {
            setProjects(res.data);
        });
    };

    return (
        <div className={classes['info-page']}>
            {details && <UserInfo personDetails={details} />}
            {projects && <TableCard projects={projects} />}
        </div>
    )
}

export default Info;