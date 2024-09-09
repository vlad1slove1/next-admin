import { Column, ColumnBuilder } from '@/components/table/columnConfig';
import { Context } from '@/lib/context';

class TableConfig<T> {
    id: string = '';
    columns: Column<T, any>[] = [];

    static TableBuilder = class<T> {
        private table = new TableConfig<T>();

        column<R>(build: (builder: ColumnBuilder<T, R>) => void): this {
            const columnBuilder = new ColumnBuilder<T, R>();
            build(columnBuilder);
            this.table.columns.push(columnBuilder.build());
            return this;
        }

        id(value: string) {
            this.table.id = value;
            return this;
        }

        load(fn: (ctx: Context) => Promise<any>): this {
            this.table.load = fn;
            return this;
        }

        build() {
            return this.table;
        }
    };

    public static builder<T>() {
        return new TableConfig.TableBuilder<T>();
    }

    load: (_: Context) => Promise<any> = () => Promise.resolve({});
}

export { TableConfig };
