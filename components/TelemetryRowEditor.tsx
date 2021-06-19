import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useEffect } from 'react';
import { EditorProps } from 'react-data-grid';
import { Telemetry } from '../lib/generated/graphql';

const TelemetryRowEditor: FC<EditorProps<Telemetry>> = ({
    row,
    column,
    onClose,
}) => {
    const { push } = useRouter();
    useEffect(() => {
        onClose();
        const id = btoa(row.id);
        push(`/t/${id}`);
    }, []);
    return null;
};

export default TelemetryRowEditor;
