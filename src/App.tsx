import React from 'react';
import './App.css';
import TableViewTax from "./components/TableViewTax";

function App() {
    return (
        <div className="main">
            <h2>React Crud Operations</h2>
            <div className="overflow-auto">
                <TableViewTax/>
            </div>
        </div>
    );
}

export default App;
