import { TrashIcon } from '@/assets/TrashIcon';
import React, { useContext } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { TableContext } from '@/lib/context';
import { ActionType } from '@/utils/enums/actionType';

type DeleteButtonProps<T> = {
    model: T;
    service: (id: number) => Promise<void>;
    label?: string;
};

const DeleteButton = <T extends { id: number | string }>({
    model,
    service,
    label = 'удалить',
}: DeleteButtonProps<T>) => {
    const { state, dispatch } = useContext(TableContext);

    const handleDelete = async () => {
        await service(model.id as number);

        const updatedData = state.data.filter((row: T) => row.id !== model.id);
        dispatch({ type: ActionType.SET_DATA, payload: updatedData });
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="bordered"
                    startContent={<TrashIcon className={'w-4 h-4 sm:w-5 sm:h-5'} />}
                    className="p-1 sm:p-2 text-xs sm:text-sm"
                    size={'sm'}
                />
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem
                    key="delete_item"
                    onClick={handleDelete}
                    className="text-xs sm:text-sm text-center"
                >
                    {label}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default DeleteButton;
