import React, { useContext } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import { TableContext } from '@/lib/context';
import { ActionType } from '@/utils/enums/actionType';

type Props<T> = {
    model: T;
    field: keyof T;
    service: (model: T) => Promise<number>;
    labelGetter?: (model: T) => string;
};

const SwitchToggle = <T extends { id: number | string }>({
    model,
    field,
    service,
    labelGetter,
}: Props<T>) => {
    const { state, dispatch } = useContext(TableContext);

    const handleToggle = async (newValue: boolean) => {
        const updatedModel = { ...model, [field]: newValue };
        await service(updatedModel);

        const updatedData = state.data.map((row: T) =>
            row.id === updatedModel.id ? updatedModel : row
        );
        dispatch({ type: ActionType.SET_DATA, payload: updatedData });
    };

    const currentValue = model[field] as unknown as boolean;
    const actionLabel = currentValue ? 'деактивировать' : 'активировать';
    const buttonLabel = labelGetter ? labelGetter(model) : currentValue ? 'да' : 'нет';

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    color={currentValue ? 'success' : 'danger'}
                    variant={'flat'}
                    className={'capitalize text-xs sm:text-sm p-1 sm:p-2'}
                    size={'sm'}
                >
                    {buttonLabel}
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem
                    key={`${actionLabel}_item`}
                    onClick={() => handleToggle(!currentValue)}
                    className="text-xs sm:text-sm text-center"
                >
                    {actionLabel}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default SwitchToggle;
