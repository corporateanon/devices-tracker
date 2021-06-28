import {
    HighLow,
    TelemetryFilter,
    TelemetrySort,
    YesNo,
} from '../../lib/generated/graphql';

enum QueryParams {
    Battery = 'b',
    Level = 'l',
    Online = 'o',
    Sort = 's',
}

interface Query {
    [key: string]: string | string[];
}

export function telemetryFiltersToQuery(filters: TelemetryFilter): Query {
    const q: Query = {
        [QueryParams.Battery]: null,
        [QueryParams.Level]: null,
        [QueryParams.Online]: null,
        [QueryParams.Sort]: null,
    };
    if (filters.battery !== null) {
        q[QueryParams.Battery] = filters.battery;
    }
    if (filters.level !== null) {
        q[QueryParams.Level] = filters.level;
    }
    if (filters.online !== null) {
        q[QueryParams.Online] = filters.online;
    }
    if (filters.sort !== null) {
        q[QueryParams.Sort] = filters.sort;
    }
    return q;
}

export function queryToTelemetryFilters(q: Query): TelemetryFilter {
    const f: TelemetryFilter = {
        battery: null,
        level: null,
        online: null,
        sort: TelemetrySort.Urgent,
    };
    if (Object.values(HighLow).includes(q[QueryParams.Level] as HighLow)) {
        f.level = q[QueryParams.Level] as HighLow;
    }
    if (Object.values(HighLow).includes(q[QueryParams.Battery] as HighLow)) {
        f.battery = q[QueryParams.Battery] as HighLow;
    }
    if (Object.values(YesNo).includes(q[QueryParams.Online] as YesNo)) {
        f.online = q[QueryParams.Online] as YesNo;
    }
    if (
        Object.values(TelemetrySort).includes(
            q[QueryParams.Sort] as TelemetrySort
        )
    ) {
        f.sort = q[QueryParams.Sort] as TelemetrySort;
    }
    return f;
}
