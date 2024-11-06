'use client';

import Pagination from '@/components/Pagination';
import RowsPerPageSelector from '@/components/RowsPerPageSelector';
import { Column } from '@/components/table/columnConfig';
import { TableConfig } from '@/components/table/tableConfig';
import useLocalStorage from '@/hooks/useLocalStorage';
import { TableContext } from '@/lib/context';
import { ROWS_PER_PAGE } from '@/utils/const';
import { ActionType } from '@/utils/enums/actionType';
import { ColumnType } from '@/utils/enums/columnType';
import clsx from 'clsx';
import React, { ReactElement, useCallback, useContext, useEffect, useState } from 'react';

type Props<T> = {
    header: string;
    config: TableConfig<T>;
};

const formatValue = (col: Column<any, any>, row: any) => {
    const value = col.getter(row, 0);

    if (col.type === ColumnType.BOOLEAN) {
        return value ? 'да' : 'нет';
    }

    if (value) {
        switch (col.type) {
            case ColumnType.DATE:
                return new Date(value as any).toLocaleDateString();
            case ColumnType.INTEGER:
            case ColumnType.TEXT:
            default:
                return value;
        }
    }

    return value;
};

const Table = <T,>({ config, header }: Props<T>): ReactElement<Props<T>> => {
    const { state, dispatch, setLoading, setError } = useContext(TableContext);
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useLocalStorage<number>('rowsPerPage', ROWS_PER_PAGE[0]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedData = await config.load({ state, dispatch, setLoading, setError });
            dispatch({ type: ActionType.SET_DATA, payload: fetchedData });
        } catch (error) {
            setError(`Error fetching data: ${error}`);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (Math.ceil(state.data?.length / rowsPerPage) === 1) {
            setPage(1);
        }
    }, [state.data?.length, rowsPerPage]);

    const pages = Math.ceil(state.data?.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return state.data?.slice(start, end);
    }, [page, rowsPerPage, state?.data]);

    return (
        <div className="flex flex-col space-y-4">
            {header && (
                <div className="text-lg sm:text-xl font-bold p-2 sm:p-4 text-left">{header}</div>
            )}
            <div className="overflow-x-auto sm:overflow-visible">
                <table className="min-w-full divide-y border-1 divide-gray-200 table-fixed">
                    <thead className="bg-gray-50">
                        <tr>
                            {config.columns.map((column, index) => (
                                <th
                                    key={index}
                                    className={clsx(
                                        column.cls,
                                        'px-6 py-3 text-xs text-center font-bold uppercase tracking-wider'
                                    )}
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items?.map((row: any, rowIndex: number) => (
                            <tr
                                key={rowIndex}
                                className="hover:bg-gray-100 transition-colors duration-200"
                            >
                                {config.columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={clsx(
                                            column.cls,
                                            'px-2 py-1 text-sm text-center text-gray-500'
                                        )}
                                    >
                                        {formatValue(column, row)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between w-full pb-3">
                <div className="flex-none w-24">
                    <RowsPerPageSelector
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                    />
                </div>
                <div className="flex">
                    {state.data?.length > 0 && pages > 1 && (
                        <Pagination currentPage={page} totalPages={pages} onPageChange={setPage} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Table;
