/* eslint-disable import/no-extraneous-dependencies */
//import { To } from 'history';
import { NavigateOptions, To } from 'react-router-dom';

const history = {
    // eslint-disable-next-line
    navigate: (to: To, options?: NavigateOptions) => {},
    push: (page: string, options?: NavigateOptions) => history.navigate(page, options),
};

export default history;
