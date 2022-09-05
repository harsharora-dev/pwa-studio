import React, { createElement } from 'react';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';
import { Autocomplete } from './Autocomplete';
import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from '@magento/venia-ui/lib/components/SearchBar/searchBar.module.css';

function ProductItem({ hit, components }) {
    return (
        <a href={hit.url} className="aa-ItemLink">
        <div className="aa-ItemContent">
            <div className="aa-ItemTitle">
            <components.Highlight hit={hit} attribute="name" />
            </div>
        </div>
        </a>
    );
}

const appId = 'latency';
const apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
const searchClient = algoliasearch(appId, apiKey);

const SearchBar = React.forwardRef((props, ref) => {
    const { isOpen } = props;
    const talonProps = useSearchBar()

    const {
        containerRef,
        handleChange,
        handleFocus,
        handleSubmit,
        initialValues,
        isAutoCompleteOpen,
        setIsAutoCompleteOpen,
        valid
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;

    return (
        <div className={rootClassName} ref={ref}>
        <div ref={containerRef} className={classes.container}>
            <Autocomplete
                openOnFocus={true}
                getSources={({ query }) => [
                {
                    sourceId: 'products',
                    getItems() {
                    return getAlgoliaResults({
                        searchClient,
                        queries: [
                        {
                            indexName: 'instant_search',
                            query,
                        },
                        ],
                    });
                    },
                    templates: {
                    item({ item, components }) {
                        return <ProductItem hit={item} components={components} />;
                    },
                    },
                },
                ]}
            />
        </div>
        </div>
    );
});

export default SearchBar;

// import React from 'react';
// import { bool, shape, string } from 'prop-types';
// import { Form } from 'informed';
// import { useSearchBar } from '@magento/peregrine/lib/talons/SearchBar';

// import { useStyle } from '@magento/venia-ui/lib/classify';
// import Autocomplete from '@magento/venia-ui/lib/components/SearchBar/autocomplete';
// import SearchField from '@magento/venia-ui/lib/components/SearchBar/searchField';
// import defaultClasses from '@magento/venia-ui/lib/components/SearchBar/searchBar.module.css';

// const SearchBar = React.forwardRef((props, ref) => {
//     const { isOpen } = props;
//     const talonProps = useSearchBar();
//     const {
//         containerRef,
//         handleChange,
//         handleFocus,
//         handleSubmit,
//         initialValues,
//         isAutoCompleteOpen,
//         setIsAutoCompleteOpen,
//         valid
//     } = talonProps;

//     const classes = useStyle(defaultClasses, props.classes);
//     const rootClassName = isOpen ? classes.root_open : classes.root;

//     return (
//         <div className={rootClassName} data-cy="SearchBar-root" ref={ref}>
//             <div ref={containerRef} className={classes.container}>
//                 <Form
//                     autoComplete="off"
//                     className={classes.form}
//                     initialValues={initialValues}
//                     onSubmit={handleSubmit}
//                 >
//                     <div className={classes.autocomplete}>
//                         <Autocomplete
//                             setVisible={setIsAutoCompleteOpen}
//                             valid={valid}
//                             visible={isAutoCompleteOpen}
//                         />
//                     </div>
//                     <div className={classes.search}>
//                         <SearchField
//                             isSearchOpen={isOpen}
//                             onChange={handleChange}
//                             onFocus={handleFocus}
//                         />
//                     </div>
//                 </Form>
//             </div>
//         </div>
//     );
// });

// export default SearchBar;

// SearchBar.propTypes = {
//     classes: shape({
//         autocomplete: string,
//         container: string,
//         form: string,
//         root: string,
//         root_open: string,
//         search: string
//     }),
//     isOpen: bool
// };
