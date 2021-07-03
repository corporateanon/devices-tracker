import Tab from '@material-ui/core/Tab';
import Link from 'next/link';
import React from 'react';

const NextRouterTab: React.FC<{
    value: string;
    href: string;
}> = ({ href, value, children }) => {
    return (
        <Tab
            label={children}
            value={value}
            component={(props) => (
                <Link href={props.href}>
                    <a {...props}></a>
                </Link>
            )}
            href={href}
        />
    );
};

export default NextRouterTab;
