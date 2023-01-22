import { useMemo } from 'react';

import { Card } from "@mui/material";
import { useTable } from "react-table";
import { Project } from '../../../models/Project';

export interface TableCardProps {
    projects: Project[];
}

const TableCard = (props: TableCardProps): JSX.Element => {
    const columns = useMemo(() => [
        {
            Header: 'ID',
            accessor: 'id',
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Duration in days',
            accessor: 'durationInDays',
        },
        {
            Header: 'Bugs count',
            accessor: 'bugsCount',
        },
        {
            Header: 'Made deadline',
            accessor: 'madeDadeline',
        },
        {
            Header: 'Score',
            accessor: 'score',
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: columns as any,
        data: props.projects
    });

    return (
        <Card>
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
                    { rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
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