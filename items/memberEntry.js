/* Page3 - Member Entry */
function memberEntry() {
    // Set variables
    memberList = [[], [], []];
    memberCheck = [[], [], []];
    prcData = [];
    flag = 0;

    // Set title
    document.getElementsByTagName('title')[0].innerHTML = 'メンバー設定 - ランダム席替えプログラム';

    // Ptint - Input form
    var changeHTML = `
    <h1>ドキュメント情報編集</h1>
    <table cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td>タイトル : </td>
                <td>
                    <input type="text" id="docTitle" style="text-align: left; width: 500px;">
                </td>
            </tr>
            <tr>
                <td>説明(左) : </td>
                <td>
                    <textarea id="docExp1" style="text-align: left; width: 500px; height: 100px;"></textarea>
                </td>
            </tr>
            <tr>
                <td>説明(右) : </td>
                <td>
                    <textarea id="docExp2" style="text-align: left; width: 500px; height: 100px;"></textarea>
                </td>
            </tr>
        </tbody>
    </table>
    <h1>メンバーを追加</h1>
    <table cellspacing="0" cellpadding="0" class="simple-outline">
        <tbody>
            <tr>
                <td class="simple-square">ファイルから追加 -</td>
                <td class="simple-square"><input type="file" id="selectedFile"></td>
                <td class="simple-square" rowspan="2">
                    追加先:<select id="addBlock">
                        <option value="0">Block A</option>
                        <option value="1">Block B</option>
                        <option value="2">Block C</option>
                    </select>
                </td>
                <td class="simple-square"><input type="button" value="追加" onclick="memberAddFromFile()"></td>
            </tr>
            <tr>
                <td class="simple-square">手動入力で追加 -</td>
                <td class="simple-square">
                    氏名:<input class="obj-inputText" id="addName">, 
                    読み:<input class="obj-inputText" id="addRead"><br>
                    出席番号:<input type="number" class="obj-inputNum" id="addNum">, 
                    性別:<select id="addGen">
                        <option>男</option>
                        <option>女</option>
                    </select>
                </td>
                <td class="simple-square"><input type="button" value="追加" onclick="memberAddFromHand()"></td>
            </tr>
        </tbody>
    </table>
    <p style="font-family: ' + "'Courier New'" + ', Courier, monospace;">
        <span class="seat-clickBox seat-clickBox0" id="seatTypeCountA" style="font-size: 20px;">BlockA:0 / ` + seatTypeCount[0] + `</span>, 
        <span class="seat-clickBox seat-clickBox1" id="seatTypeCountB" style="font-size: 20px;">BlockB:0 / ` + seatTypeCount[1] + `</span>, 
        <span class="seat-clickBox seat-clickBox2" id="seatTypeCountC" style="font-size: 20px;">BlockC:0 / ` + seatTypeCount[2] + `</span>, 
        <input type="button" id="shuffleRunButton" value="抽選" onclick="shuffleRun()" disabled>
    </p>`;

    // Print - Member lists
    var blockNameConvert = ['A', 'B', 'C'];
    for(var i = 0; i < 3; i++) {
        changeHTML += `
        <h2>Block ` + blockNameConvert[i] + `</h2>
        <div>
            <select id="checkOprSelect` + blockNameConvert[i] + '" onchange="memberListOpr(' + i + `)">
                <option>チェックアイテムの操作</option>
                <option>Block A へ移動</option>
                <option>Block B へ移動</option>
                <option>Block C へ移動</option>
                <option>削除</option>
            </select>
        </div>
        <table cellspacing="0" cellpadding="0" class="memberList-outline" id="memberList` + blockNameConvert[i] + `">
        </table>`;
    }

    // Apply to HTML
    document.getElementsByTagName('body')[0].innerHTML = changeHTML;

    // List update
    memberListUpdate(0);
    memberListUpdate(1);
    memberListUpdate(2);

    /* Page3 Event - Read file data */
    document.getElementById('selectedFile').onchange = function(e) {
        // Get & Set variables
        var rawData = e.target.files[0];
        var reader = new FileReader();

        // Data read
        reader.readAsText(rawData);
        reader.onload = function() {
            // Data get
            prcData = reader.result.split('\n');
        }
    }
}

/* Page3 Event - Add file data */
function memberAddFromFile() {
    // Get & Set variables
    var addBlock = document.getElementById('addBlock').selectedIndex;

    // Define a data format
    function stuDataFormat(num, name, read, gen) {
        this.num = num;
        this.name = name;
        this.read = read;
        this.gen = gen;
    }

    // Data store
    for(var i = 0; i < prcData.length; i++) {
        if(prcData[i]) {
            var prcDataPart = prcData[i].split(',');
            memberList[addBlock].push(new stuDataFormat(prcDataPart[0], prcDataPart[1], prcDataPart[2], prcDataPart[3]));
        }
    }

    // Update - Member list
    memberListUpdate(document.getElementById('addBlock').selectedIndex);
}

/* Page3 Event - Add hand input data */
function memberAddFromHand() {
    // Get & Set variables
    var addBlock = document.getElementById('addBlock').selectedIndex;

    // Define a data format and get data
    function stuDataFormat() {
        this.num = document.getElementById('addNum').value;
        this.name = document.getElementById('addName').value;
        this.read = document.getElementById('addRead').value;
        this.gen = document.getElementById('addGen').selectedIndex;
    }

    // Data store
    memberList[addBlock].push(new stuDataFormat());

    // Input clear
    document.getElementById('addNum').value = '';
    document.getElementById('addName').value = '';
    document.getElementById('addRead').value = '';

    // List update
    memberListUpdate(document.getElementById('addBlock').selectedIndex);
}
