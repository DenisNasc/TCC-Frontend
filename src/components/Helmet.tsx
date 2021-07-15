import React from "react";
import { Helmet as ReactHelmet } from "react-helmet";

interface Props {
    title: string;
}

const Helmet: React.FC<Props> = ({ title }) => {
    return (
        <ReactHelmet>
            <title>{title}</title>
        </ReactHelmet>
    );
};

export default Helmet;
