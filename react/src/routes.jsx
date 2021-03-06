import React from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

import Search from './pages/Search' ;
import Product from './pages/Product' ;


const Routes = () => {
    return (
        
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
             <Route exact path='/reactfiap/product/:id' component={ Product }/>
            <Route exact path='/' component={ Search }/>
            <Route exact path='/product/:id' component={ Product }/>
            <Route component={ () => (
                <div>Page not found</div> )} />
        </Switch>
    </BrowserRouter>

    )
}


export default Routes;
