import React from 'react';
import Footer from '../layout/Footerlayout';

interface Collection {
    name: string;
    slug: string;
    // Add other properties as needed
}

interface FooterContainerProps {
    response: {
        collections: {
            items: Collection[] | [{ name: string; slug: string }]; // Allow either type
        };
        // Add other properties as needed
    };
}

const FooterContainer: React.FC<FooterContainerProps> = ({ response }) => {
    return <Footer response={response} />;
};

export default FooterContainer;
