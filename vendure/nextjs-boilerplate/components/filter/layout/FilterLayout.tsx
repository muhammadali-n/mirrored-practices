import React from 'react';

interface FacetValue {
    id: string;
    name: string;
    // Add other properties if needed
}

interface Facet {
    id: string;
    name: string;
    values: FacetValue[];
    // Add other properties if needed
}

interface FilterLayoutProps {
    facetsResponse: {
        facets: {
            items: Facet[];
        };
    };
    onFilterChange: (id: string) => void;
    filterArray: string[];
}

const FilterLayout: React.FC<FilterLayoutProps> = ({ facetsResponse, onFilterChange, filterArray }) => {
    return (
        <div className="bg-white-200 p-4">
            {facetsResponse.facets.items.map((facet) => (
                <div key={facet.id} className="mb-4">
                    <h2 className="text-lg font-semibold">{facet.name}</h2>
                    <ul className="pl-4">
                        {facet.values.map((value) => (
                            <li key={value.id} className="cursor-pointer">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={filterArray.includes(value.id)}
                                        onChange={() => onFilterChange(value.id)}
                                    />
                                    <span className="ml-2">{value.name}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default FilterLayout;
