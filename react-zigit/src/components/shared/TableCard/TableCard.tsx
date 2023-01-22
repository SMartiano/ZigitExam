import { useMemo } from 'react';

import { Card } from "@mui/material";
import { useSortBy, useTable } from "react-table";
import { Project } from '../../../models/Project';

export interface TableCardProps {
    projects: Project[];
}

const TableCard = (props: TableCardProps): JSX.Element => {
    const avg = useMemo(() => {
        let scoreSum: number = 0;
        for (const project of props.projects) {
            scoreSum += project.score;
        }

        return scoreSum / props.projects.length;
    }, []);

    const meetDeadlinePercentage = useMemo(() => {
        let meetDeadlineSum: number = 0;
        for (const project of props.projects) {
            if (project.madeDadeline)
                meetDeadlineSum++;
        }

        return meetDeadlineSum / props.projects.length;
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'ID',
            accessor: 'ID',
            sortable: true,
            maxWidth: 400,
            minWidth: 140,
            width: 200,
        },
        {
            Header: 'Name',
            accessor: 'name',
            sortable: true,
            maxWidth: 400,
            minWidth: 140,
            width: 200,
        },
        {
            Header: 'Duration in days',
            accessor: 'durationInDays',
            sortable: true,
            maxWidth: 400,
            minWidth: 140,
            width: 200,

        },
        {
            Header: 'Bugs count',
            accessor: 'bugsCount',
            sortable: true,
            maxWidth: 400,
            minWidth: 140,
            width: 200,

        },
        {
            id: 'madeDadeline',
            Header: 'Made deadline',
            accessor: m => m.madeDadeline.toString(),
            sortable: true,
            maxWidth: 400,
            minWidth: 140,
            width: 200,

        },
        {
            Header: 'Score',
            accessor: 'score',
            sortable: true,
            maxWidth: 400,
            minWidth: 140,
            width: 200,
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns: columns as any,
        data: props.projects
    },
        useSortBy);

    const getCellStyle = (cell) => {


        let backgroundColor: string = 'white';
        if (cell.column.Header === 'Score') {
            if (cell.value > 90) {
                backgroundColor = 'green';
            } else if (cell.value < 70) {
                backgroundColor = 'red';
            }
        }

        return { style: { background: backgroundColor, width: '200px' } };
    }

    return (
        <Card>
            <span>Projects avg: {avg}</span>
            <br />
            <span>Percentage meet deadline: {meetDeadlinePercentage}%</span>


            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()} {...getCellStyle(cell)}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Card>
    );
}

export default TableCard;