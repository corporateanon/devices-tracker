import moment from 'moment';

export const percentFormatter = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 0,
});

export const createColumnFormatter = (
    formatter: Intl.NumberFormat | ((value: any) => string)
) => {
    if (typeof formatter === 'function') {
        // eslint-disable-next-line react/display-name
        return ({ row, column: { key } }) => <>{formatter(row[key])}</>;
    }
    // eslint-disable-next-line react/display-name
    return ({ row, column: { key } }) => <>{formatter.format(row[key])}</>;
};

export const dateColumnFormatter = ({ row, column: { key } }) => {
    return (
        <div title={moment(row[key]).format('DD MMM YYYY HH:mm:ss')}>
            {moment(row[key]).fromNow()}
        </div>
    );
};
