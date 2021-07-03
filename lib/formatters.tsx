import moment from 'moment';
import { FormatterProps } from 'react-data-grid';

export const percentFormatter = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 0,
});

export function createColumnFormatter<T>(
    formatter: Intl.NumberFormat | ((value?: number | string | null) => string)
): React.ComponentType<FormatterProps<T>> {
    if (typeof formatter === 'function') {
        // eslint-disable-next-line react/display-name
        return ({ row, column: { key } }) => <>{formatter(row[key])}</>;
    }
    // eslint-disable-next-line react/display-name
    return ({ row, column: { key } }) => <>{formatter.format(row[key])}</>;
}

export const dateColumnFormatter = ({
    row,
    column: { key },
}: FormatterProps): JSX.Element => {
    return (
        <div title={moment(row[key]).format('DD MMM YYYY HH:mm:ss')}>
            {moment(row[key]).fromNow()}
        </div>
    );
};
