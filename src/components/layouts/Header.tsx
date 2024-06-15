import {Dropdown, DropdownItem, DropdownMenu, Menu, MenuItem} from "semantic-ui-react";
import {Component} from "react";
import { Link } from 'react-router-dom';

class Header extends Component {
    state = { activeItem: '' }

    // Check the route and set the active item
    componentDidMount() {
        const path = window.location.pathname.substring(1); // Remove leading slash
        this.setState({ activeItem: path });
    }

    componentDidUpdate() {
        const path = window.location.pathname.substring(1); // Remove leading slash
        if (this.state.activeItem !== path) {
            this.setState({ activeItem: path });
        }
    }

    handleNavigation = (path: string) => {
        this.setState({ activeItem: path });
        //clear the path and redirect to the new one
        window.location.replace(`/${path}`);
    };

    render() {
        const { activeItem } = this.state;
        return (
            <header style={{ padding: '1.5rem', backgroundColor: '#f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <Link to={'/'}>
                            <h1 style={{ margin: 0 }}>Backoffice</h1>
                        </Link>
                    </div>
                    <div>
                        <Menu horizontal>
                            <MenuItem onClick={() => this.handleNavigation('staging/mig')}
                                      active={activeItem === 'staging/mig'}
                            >migration</MenuItem>
                            <MenuItem onClick={() => this.handleNavigation('staging/socSec')}
                                      active={activeItem === 'staging/socSec'}
                            >social security</MenuItem>
                            <MenuItem onClick={() => this.handleNavigation('staging/tax')}
                                      active={activeItem === 'staging/tax'}
                            >tax</MenuItem>

                            <Dropdown
                                selection
                                text='Production ⚠️'
                                pointing='top'
                                className='link item'>
                                <DropdownMenu>
                                    <DropdownItem
                                        key='prod/mig'
                                        onClick={() => this.handleNavigation('prod/mig')}
                                        active={activeItem === 'prod/mig'}
                                    >Migration</DropdownItem>
                                    <DropdownItem
                                        key='prod/socSec'
                                        onClick={() => this.handleNavigation('prod/socSec')}
                                        active={activeItem === 'prod/socSec'}
                                    >Social Security</DropdownItem>
                                    <DropdownItem
                                        key='prod/tax'
                                        onClick={() => this.handleNavigation('prod/tax')}
                                        active={activeItem === 'prod/tax'}
                                    >Tax</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <Dropdown
                                selection
                                text='Development 🪛'
                                pointing='top'
                                className='link item'>
                                <DropdownMenu>
                                    <DropdownItem
                                        key='dev/mig'
                                        onClick={() => this.handleNavigation('dev/mig')}
                                        active={activeItem === 'dev/mig'}
                                    >Migration</DropdownItem>
                                    <DropdownItem
                                        key='dev/socSec'
                                        onClick={() => this.handleNavigation('dev/socSec')}
                                        active={activeItem === 'dev/socSec'}
                                    >Social Security</DropdownItem>
                                    <DropdownItem
                                        key='dev/tax'
                                        onClick={() => this.handleNavigation('dev/tax')}
                                        active={activeItem === 'dev/tax'}
                                    >Tax</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Menu>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
