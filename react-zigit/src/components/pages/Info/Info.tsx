import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from '@mui/material';

import { PersonDetails } from '../../../models/PersonDetails';
import { Project } from '../../../models/Project';
import classes from './Info.module.css';
import { PersonDetailsContext } from '../../../contexts/ContextPerson';

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
        axios.get(`https://private-052d6-testapi4528.apiary-mock.com/info`).then(res => {
            setProjects(res.data);
        });
    };

    return (
        <div className="app">
            <div>
                <div className="title">Info</div>
                {details && <Card>{details.Team}</Card>}
                {
                    projects && projects!.map((val: Project) => <div key={val.id}>{val.score}</div>)
                }
            </div>
        </div>
    )
}

export default Info;