/* Page1 - Set seaet number */
function setSeatNumber() {
    // Set title
    document.getElementsByTagName('title')[0].innerHTML = '席並び指定 - ランダム席替えプログラム';

    // Ptint - Input form
    var changeHTML = `
    <h1>席の縦数、横数、タイプを指定</h1>
    <p>
        縦:<input type="number" class="obj-inputNum" value=6 id="inp-seatHeight">, 
        横:<input type="number" class="obj-inputNum" value=6 id="inp-seatWidth">, 
        <input type="button" value="Enter" onclick="setSeatType()">, 
        <input type="button" value="Next" disabled>
    </p>`;

    // Apply to HTML
    document.getElementsByTagName('body')[0].innerHTML = changeHTML;
}

/* Page2 - Set seat type */
function setSeatType() {
    // Get & Set variables
    seatHeight = document.getElementById('inp-seatHeight').value;
    seatWidth = document.getElementById('inp-seatWidth').value;
    seatType = [];
    seatTypeCount = [0, 0, 0, 0, 0];

    // Print - Input form
    var changeHTML = `
    <h1>席の縦数、横数、タイプを指定</h1>
    <p>
        縦:<input type="number" class="obj-inputNum" value=` + seatHeight + ` id="inp-seatHeight">, 
        横:<input type="number" class="obj-inputNum" value=` + seatWidth + ` id="inp-seatWidth">, 
        <input type="button" value="Enter" onclick="setSeatType()">, 
        <input type="button" value="Next" onclick="memberEntry()">
    </p>
    <p style="font-family: "Courier New" , Courier, monospace;>
        <span class="seat-clickBox seat-clickBox0" id="seatTypeCountA" style="font-size: 25px;">BlockA:0</span>, 
        <span class="seat-clickBox seat-clickBox1" id="seatTypeCountB" style="font-size: 25px;">BlockB:0</span>, 
        <span class="seat-clickBox seat-clickBox2" id="seatTypeCountC" style="font-size: 25px;">BlockC:0</span>, 
        <span class="seat-clickBox seat-clickBox3" id="seatTypeCountE" style="font-size: 25px;">Empty:0</span>, 
        <span class="seat-clickBox seat-clickBox4" id="seatTypeCountN" style="font-size: 25px;">Nothing:0</span>
    </p>`;

    // Print - Seat squares
    changeHTML +=
    '<table cellspacing="0" cellpadding="0" style="border: 2px solid rgba(0, 0, 0, 1);">' +
        '<tbody>';
    for(var i = 0; i < seatHeight; i++) {
        changeHTML +=
            '<tr>';
        seatType.push([]);
        for(var j = 0; j < seatWidth; j ++) {
            changeHTML +=
                '<td class="seat-clickBox seat-clickBox0" onclick="changeSeatType(0, ' + i + ', ' + j + ')" oncontextmenu="changeSeatType(1, ' + i + ', ' + j + ')">A</td>';
            seatType[i][j] = 0;
        }
        changeHTML +=
            '</tr>';
    }
    changeHTML +=
        '</tbody>' +
    '</table>' +
    '<table class="box-front-board" style="margin: 10px auto;"><tbody>' +
    '    <tr><td>黒  板</td></tr>' +
    '</tbody></table>';

    // Apply to HTML
    document.getElementsByTagName('body')[0].innerHTML = changeHTML;

    // Update seat type number
    seatTypeCount[0] = seatHeight * seatWidth;
    document.getElementById('seatTypeCountA').innerHTML = 'BlockA:' + seatTypeCount[0];
}

/* Page2 Event - Change seat type */
function changeSeatType(switchType, seatY, seatX) {
    // Update seatType variable
    if(switchType) {
        seatType[seatY][seatX]--;
        if(seatType[seatY][seatX] == -1) seatType[seatY][seatX] = 4;
    }
    else {
        seatType[seatY][seatX]++;
        if(seatType[seatY][seatX] == 5) seatType[seatY][seatX] = 0;
    }

    // Update HTML style & text
    document.getElementsByTagName('td')[(seatWidth * seatY) + seatX].className = 'seat-clickBox seat-clickBox' + seatType[seatY][seatX];
    switch(seatType[seatY][seatX]) {
        case 0:
            document.getElementsByTagName('td')[(seatWidth * seatY) + seatX].innerHTML = 'A';
            break;

        case 1:
            document.getElementsByTagName('td')[(seatWidth * seatY) + seatX].innerHTML = 'B';
            break;

        case 2:
            document.getElementsByTagName('td')[(seatWidth * seatY) + seatX].innerHTML = 'C';
            break;

        case 3:
            document.getElementsByTagName('td')[(seatWidth * seatY) + seatX].innerHTML = 'E';
            break;

        case 4:
            document.getElementsByTagName('td')[(seatWidth * seatY) + seatX].innerHTML = 'N';
            break;

        default :
            break;
    }

    // Update seatTypeCount
    seatTypeCount = [0, 0, 0, 0, 0];
    for(var i = 0; i < seatHeight; i++) {
        for(var j = 0; j < seatWidth; j ++) {
            seatTypeCount[seatType[i][j]]++;
        }
    }
    document.getElementById('seatTypeCountA').innerHTML = 'BlockA:' + seatTypeCount[0];
    document.getElementById('seatTypeCountB').innerHTML = 'BlockB:' + seatTypeCount[1];
    document.getElementById('seatTypeCountC').innerHTML = 'BlockC:' + seatTypeCount[2];
    document.getElementById('seatTypeCountE').innerHTML = 'Empty:' + seatTypeCount[3];
    document.getElementById('seatTypeCountN').innerHTML = 'Nothing:' + seatTypeCount[4];
}
