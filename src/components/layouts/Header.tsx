import {Link} from "react-router-dom";
import {Dropdown, DropdownItem, DropdownMenu, Menu, MenuItem} from "semantic-ui-react";
import {Component} from "react";

export default class Header extends Component {

    state = {activeItem: ''}

    //check the route and set the active item
    componentDidMount() {
        const path = window.location.pathname;
        switch (path) {
            case '/migDev':
                this.setState({activeItem: 'migDev'});
                break;
            case '/socSecDev':
                this.setState({activeItem: 'socSecDev'});
                break;
            case '/taxDev':
                this.setState({activeItem: 'taxDev'});
                break;
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
                        {/*<Menu secondary>*/}
                        {/*    <MenuItem*/}
                        {/*        name='migration'*/}
                        {/*        active={activeItem === 'mig'}*/}
                        {/*        href={'/mig'}*/}
                        {/*    />*/}
                        {/*    <MenuItem*/}
                        {/*        name='social security'*/}
                        {/*        active={activeItem === 'socSec'}*/}
                        {/*        href={'/socSec'}*/}
                        {/*    />*/}
                        {/*    <MenuItem*/}
                        {/*        name='tax'*/}
                        {/*        active={activeItem === 'tax'}*/}
                        {/*        href={'/tax'}*/}
                        {/*    />*/}
                        {/*    /!*</Menu>*!/*/}
                        {/*    /!*<Menu secondary>*!/*/}
                        {/*    <MenuItem*/}
                        {/*        name='migration ⚠️'*/}
                        {/*        active={activeItem === 'migProd'}*/}
                        {/*        href={'/migProd'}*/}
                        {/*    />*/}
                        {/*    <MenuItem*/}
                        {/*        name='social security ⚠️'*/}
                        {/*        active={activeItem === 'socSecProd'}*/}
                        {/*        href={'/socSecProd'}*/}
                        {/*    />*/}
                        {/*    <MenuItem*/}
                        {/*        name='tax ⚠️'*/}
                        {/*        active={activeItem === 'taxProd'}*/}
                        {/*        href={'/taxProd'}*/}
                        {/*    />*/}
                        {/*</Menu>*/}

                        <Menu horizontal>
                            <MenuItem href={'/mig'}
                                      active={activeItem === 'mig'}
                            >migration</MenuItem>
                            <MenuItem href={'/socSec'}
                                      active={activeItem === 'socSec'}
                            >social security</MenuItem>
                            <MenuItem href={'/tax'}
                                      active={activeItem === 'tax'}
                            >tax</MenuItem>

                            <Dropdown
                                selection
                                text='Production ⚠️'
                                pointing='top'
                                className='link item'>
                                <DropdownMenu>
                                    <DropdownItem
                                        key='migProd'
                                        href={'/migProd'}
                                        active={activeItem === 'migProd'}
                                    >Migration</DropdownItem>
                                    <DropdownItem
                                        key='socSecProd'
                                        href={'/socSecProd'}
                                        active={activeItem === 'socSecProd'}
                                    >Social Security</DropdownItem>
                                    <DropdownItem
                                        key='taxProd'
                                        href={'/taxProd'}
                                        active={activeItem === 'taxProd'}
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
                                        key='migDev'
                                        href={'/migDev'}
                                        active={activeItem === 'migDev'}
                                    >Migration</DropdownItem>
                                    <DropdownItem
                                        key='socSecDev'
                                        href={'/socSecDev'}
                                        active={activeItem === 'socSecDev'}
                                    >Social Security</DropdownItem>
                                    <DropdownItem
                                        key='taxDev'
                                        href={'/taxDev'}
                                        active={activeItem === 'taxDev'}
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