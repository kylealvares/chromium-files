function getTableHeaders() {
    return $('table tr').map((row, tr) => {
        return $(tr).find('th').map((col, th) => {
            return $(th).text().trim();
        }).get();
    }).get();
}

const getTableData = () => {
    const tableData = [];
    $('table tr').each((row, tr) => {
        if (row === 0) return;
        const rowData = {};
        $(tr).find('td').each((col, td) => {
            if (col === 0) {
                rowData.isDir = $(td).find('a').hasClass('dir');
            }
            rowData[headers[col].key] = $(td).text();
        });
        tableData.push(rowData);
    });
    return tableData;
}

function formatDateModififed(timestamp) {
    try {
        let [month, day, year] = timestamp.split(',')[0].split('/');
        let [time, period] = timestamp.split(',')[1].trim().split(' ');
        let [hour, minute, second] = time.split(':');
        month = months[parseInt(month) - 1];
        // console.log(`${month} ${day}, 20${year} ${hour} ${period}`);
        return `${month} ${day}, 20${year}`;
    } catch (err) {
        console.error(err);
        return '';
    }
}

function createTable(tableData) {
    return `
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Last Modified</th>
                </tr>
            </thead>
            <tbody>
                ${createRows(tableData)}
            </tbody>
        </table>
    `;
}

function createRows(data) {
    const rows = data.map(row => createRow(row));
    return rows.join('');
}

function createRow(row) {
    return `
        <tr>
            <td>
                ${row.isDir ?
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>` :
            `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>                  
                    `
        }
                <a href=${new URL(`${window.location}${row.name}`)}>${row.name}</a>
            </td>
            <td class="size">${row.size}</td>
            <td class="modified">${row.modified ? formatDateModififed(row.modified) : ''}</td>
        </tr>
    `;
}