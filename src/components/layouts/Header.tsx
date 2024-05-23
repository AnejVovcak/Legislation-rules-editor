import {Link, useRoutes} from "react-router-dom";
import {GridColumn, Menu, MenuItem} from "semantic-ui-react";
import {render} from "@testing-library/react";
import {Component} from "react";

export default class Header extends Component {

    state = {activeItem: ''}

    //check the route and set the active item
    componentDidMount() {
        const path = window.location.pathname;
        switch (path) {
            case '/mig':
                this.setState({activeItem: 'mig'});
                break;
            case '/socSec':
                this.setState({activeItem: 'socSec'});
                break;
            case '/tax':
                this.setState({activeItem: 'tax'});
                break;
            case '/migProd':
                this.setState({activeItem: 'migProd'});
                break;
            case '/socSecProd':
                this.setState({activeItem: 'socSecProd'});
                break;
            case '/taxProd':
                this.setState({activeItem: 'taxProd'});
                break;
        }
    }

    render() {
        const {activeItem} = this.state
        return (
            <header style={{padding: '1.5rem', backgroundColor: '#f0f0f0'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <Link to={'/'}>
                            <h1 style={{margin: 0}}>Backoffice</h1>
                        </Link>
                    </div>
                    <div>
                        <Menu secondary>
                            <MenuItem
                                name='migration'
                                active={activeItem === 'mig'}
                                href={'/mig'}
                            />
                            <MenuItem
                                name='social security'
                                active={activeItem === 'socSec'}
                                href={'/socSec'}
                            />
                            <MenuItem
                                name='tax'
                                active={activeItem === 'tax'}
                                href={'/tax'}
                            />
                        {/*</Menu>*/}
                        {/*<Menu secondary>*/}
                            <MenuItem
                                name='migration ⚠️'
                                active={activeItem === 'migProd'}
                                href={'/migProd'}
                            />
                            <MenuItem
                                name='social security ⚠️'
                                active={activeItem === 'socSecProd'}
                                href={'/socSecProd'}
                            />
                            <MenuItem
                                name='tax ⚠️'
                                active={activeItem === 'taxProd'}
                                href={'/taxProd'}
                            />
                        </Menu>
                    </div>
                </div>
            </header>
        );

    }
}