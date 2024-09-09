import { ColumnType } from '@/utils/enums/columnType';

export class Column<T, R> {
    label: string = '';
    field: string = '';
    type: ColumnType = ColumnType.TEXT;
    cls: string = '';
    getter: (model: T, index?: number) => R = Column.EMPTY_GETTER;

    static EMPTY_GETTER: (model: any) => any = (_) => {};

    public static builder<T, R>() {
        return new ColumnBuilder<T, R>();
    }
}

export class ColumnBuilder<T, R> {
    private column = new Column<T, R>();

    id(): this {
        return this.setField('#', 'id', ColumnType.TEXT);
    }

    integer(label: string, field: string): this {
        return this.setField(label, field, ColumnType.INTEGER);
    }

    text(label: string, field: string): this {
        return this.setField(label, field, ColumnType.TEXT);
    }

    date(label: string, field: string): this {
        return this.setField(label, field, ColumnType.DATE);
    }

    boolean(label: string, field: string): this {
        return this.setField(label, field, ColumnType.BOOLEAN);
    }

    getter(val: (model: T, index?: number) => R) {
        this.column.getter = val;
        return this;
    }

    label(val: string) {
        this.column.label = val;
        return this;
    }

    cls(val: string) {
        this.column.cls = val;
        return this;
    }

    build(): Column<T, R> {
        if (Column.EMPTY_GETTER === this.column.getter && this.column.field) {
            this.column.getter = (model: any) => {
                return model[this.column.field] as R;
            };
        }
        return this.column;
    }

    private setField(label: string, field: string, type: ColumnType) {
        this.column.label = label;
        this.column.type = type;
        this.column.field = field;
        return this;
    }
}
