import { HighLow, TelemetryFilter, YesNo } from '../../lib/generated/graphql';

enum QueryParams {
    Battery = 'b',
    Level = 'l',
    Online = 'o',
}

interface Query {
    [key: string]: string | string[];
}

export function filtersToQuery(filters: TelemetryFilter): Query {
    const q: Query = {
        [QueryParams.Battery]: null,
        [QueryParams.Level]: null,
        [QueryParams.Online]: null,
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
    return q;
}

export function queryToFilters(q: Query): TelemetryFilter {
    const f: TelemetryFilter = {
        battery: null,
        level: null,
        online: null,
    };
    if ([HighLow.High, HighLow.Low].includes(q.l as HighLow)) {
        f.level = q[QueryParams.Level] as HighLow;
    }
    if ([HighLow.High, HighLow.Low].includes(q.b as HighLow)) {
        f.battery = q[QueryParams.Battery] as HighLow;
    }
    if ([YesNo.Yes, YesNo.No].includes(q.o as YesNo)) {
        f.online = q[QueryParams.Online] as YesNo;
    }
    return f;
}
