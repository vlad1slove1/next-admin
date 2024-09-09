'use client';

import DeleteButton from '@/components/DeleteButton';
import SwitchToggle from '@/components/SwitchToggle';
import Table from '@/components/table/Table';
import { TableConfig } from '@/components/table/tableConfig';
import { UserField } from '@/models/user/userField';
import { User } from '@/models/user/userModel';
import userService from '@/services/userService';
import React from 'react';

const config = TableConfig.builder<User>()
    .column((builder) => builder.id())
    .column((builder) => builder.integer('TELEGRAM ID', UserField.CHAT_ID))
    .column((builder) => builder.text('НИК В TELEGRAM', UserField.NAME))
    .column((builder) =>
        builder.label('АКТИВЕН').getter((model) => {
            return (
                <SwitchToggle<User>
                    model={model}
                    field={UserField.ACTIVE}
                    service={userService.saveUser}
                />
            );
        })
    )
    .column((builder) =>
        builder
            .label('ДЕЙСТВИЯ')
            .getter((model) => (
                <DeleteButton<User> model={model} service={userService.deleteUser} />
            ))
    )
    .load(async () => userService.getAllUsers())
    .id('tg-users')
    .build();

const HomePage: React.FC = () => {
    return (
        <div className="tg-users d-flex">
            <Table header="Список подключенных к парсеру" config={config} />
        </div>
    );
};

export default HomePage;
