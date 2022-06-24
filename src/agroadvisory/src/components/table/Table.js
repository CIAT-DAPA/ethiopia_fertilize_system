import React from 'react';

function Table({tableData}) {

    return (

        <div id="table">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    
                    <th scope="col">N</th>
                    <th scope="col">P</th>
                    <th scope="col">Yield</th>
                    <th scope="col">Unit</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                  
                    <td>{tableData.n}</td>
                    <td>{tableData.p}</td>
                    <td>{tableData.yieldData}</td>
                    <td>kg/ha</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    )
    

}
export default Table;