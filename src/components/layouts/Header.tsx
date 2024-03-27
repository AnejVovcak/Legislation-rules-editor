import {Link, useRoutes} from "react-router-dom";
import {GridColumn, Menu, MenuItem} from "semantic-ui-react";
import {render} from "@testing-library/react";
import {Component} from "react";

export default class Header extends Component {

    state = {activeItem: ''}

    //check the route and set the active item
    componentDidMount() {
        const path = window.location.pathname;
        if (path === '/mig') {
            this.setState({activeItem: 'mig'});
        } else if (path === '/socSec') {
            this.setState({activeItem: 'socSec'});
        } else if (path === '/tax') {
            this.setState({activeItem: 'tax'});
        }
    }

    render() {
        const {activeItem} = this.state
        return (
            <header style={{ padding: '3rem', backgroundColor: '#f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <Link to={'/'}>
                            <h1 style={{ margin: 0 }}>Legislation rules editor</h1>
                        </Link>
                    </div>
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
                    </Menu>
                </div>
            </header>
        );

    }
}