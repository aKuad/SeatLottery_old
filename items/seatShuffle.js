/* Page4 - Seat shuffle and view */
function shuffleRun() {
    // Set variables
    memberListShuffle = [[], [], []];
    var memberListFlag = [[], [], []];

    // Set title
    document.getElementsByTagName('title')[0].innerHTML = '抽選結果 - ランダム席替えプログラム';

    // Member shuffle
    for(var i = 0; i < 3; i++) {
        for(var j = 0; j < memberList[i].length; j++) {
            // Make random number
            var r = Math.floor(Math.random() * memberList[i].length);

            // If already checked, relottery
            if(memberListFlag[i][r]) {
                j--;
            }
            else {
                memberListShuffle[i][r] = j;
                memberListFlag[i][r] = true;
            }
        }
    }

    // Print - Shuffle result
    var k = [0, 0, 0];
    var changeHTML = '';
    changeHTML += `
    <h1 style="margin-top: 0px;">` + document.getElementById('docTitle').value + `</h1>
    <table cellspacing="0" cellpadding="0">
        <tbody>`;
    for(var i = 0; i < seatHeight; i++) {
        changeHTML +=
            '<tr>';
        for(var j = 0; j < seatWidth; j ++) {
            // Edge style
            var edgeStyle = '';
            if(i == 0) {
                edgeStyle += 'border-top: 5px solid rgba(0, 0, 0, 1);';
            }
            else if(seatType[i - 1][j] == 4) {
                edgeStyle += 'border-top: 5px solid rgba(0, 0, 0, 1);';
            }

            if(i == (seatHeight - 1)) {
                edgeStyle += 'border-bottom: 5px solid rgba(0, 0, 0, 1);';
            }
            else if(seatType[i + 1][j] == 4) {
                edgeStyle += 'border-bottom: 5px solid rgba(0, 0, 0, 1);';
            }

            if(j == 0) {
                edgeStyle += 'border-left: 5px solid rgba(0, 0, 0, 1);';
            }
            else if(seatType[i][j - 1] == 4) {
                edgeStyle += 'border-left: 5px solid rgba(0, 0, 0, 1);';
            }

            if(j == (seatWidth - 1)) {
                edgeStyle += 'border-right: 5px solid rgba(0, 0, 0, 1);';
            }
            else if(seatType[i][j + 1] == 4) {
                edgeStyle += 'border-right: 5px solid rgba(0, 0, 0, 1);';
            }

            // Branch with seat type
            switch(seatType[i][j]) {
                case 0:
                case 1:
                case 2:
                    if(memberList[seatType[i][j]][memberListShuffle[seatType[i][j]][k[seatType[i][j]]]].gen == 0) {
                        changeHTML +=
                        '<td class="seat-nameBox seat-nameBoxM" style="' + edgeStyle + '">' +
                            '<ruby><rb>' + memberList[seatType[i][j]][memberListShuffle[seatType[i][j]][k[seatType[i][j]]]].name + '</rb><rt>' + memberList[seatType[i][j]][memberListShuffle[seatType[i][j]][k[seatType[i][j]]]].read + '</rt></ruby><br>' +
                            '[' + memberList[seatType[i][j]][memberListShuffle[seatType[i][j]][k[seatType[i][j]]]].num + ']' +
                        '</td>';
                    }
                    else {
                        changeHTML +=
                        '<td class="seat-nameBox seat-nameBoxF" style="' + edgeStyle + '">' +
                        '<ruby><rb>' + memberList[seatType[i][j]][memberListShuffle[seatType[i][j]][k[seatType[i][j]]]].name + '</rb><rt>' + memberList[seatType[i][j]][memberListShuffle[seatType[i][j]][k[seatType[i][j]]]].read + '</rt></ruby><br>' +
                        '[' + memberList[seatType[i][j]][memberListShuffle[seatType[i][j]][k[seatType[i][j]]]].num + ']' +
                        '</td>';
                    }
                    k[seatType[i][j]]++;
                    break;

                case 3:
                    changeHTML +=
                    '<td class="seat-nameBox seat-nameBoxE" style="' + edgeStyle + '">' +
                    '</td>';
                    break;

                case 4:
                    changeHTML +=
                    '<td class="seat-nameBox">' +
                    '</td>';
                    break;

                default :
                    break;
            }
        }
        changeHTML +=
            '</tr>';
    }
    changeHTML += `
        </tbody>
    </table>
    <table style="margin: 40px auto 0px auto;">
        <tbody>
            <tr>
                <td></td>
                <td class="box-front-board">黒  板</td>
                <td></td>
            </tr>
            <tr>
                <td colspan="3" style="height: 10px;"></td>
            </tr>
            <tr>
                <td style="width: 250px; text-align: left; border: 2px solid rgba(0, 0, 0, 1);">` + document.getElementById('docExp1').value.replace(/\n/g, '<br>') + `</td>
                <td></td>
                <td style="width: 250px; text-aligh: left;">` + document.getElementById('docExp2').value.replace(/\n/g, '<br>') + `</td>
            </tr>
        </tbody>
    </table>`;

    // Apply to HTML
    document.getElementsByTagName('body')[0].innerHTML = changeHTML;
}
