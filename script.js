let totalScore = 0;

function interpretData() {
    const inputData = document.getElementById("dataInput").value;
    const values = inputData.split(",");

    if (values.length < 23) { 
        document.getElementById("output").innerHTML = "Invalid data format.";
        return;
    }

    function calculateCount(value, points) {
        return value == 0 ? "0 times (0 points)" : `${value / points} times (${value} points)`;
    }

    totalScore = 0;
    const autonomousPoints = [
        { value: values[0], points: 3 },
        { value: values[1], points: 4 },
        { value: values[2], points: 6 },
        { value: values[3], points: 7 },
        { value: values[4], points: 6 },
        { value: values[5], points: 4 },
        { value: values[6] == 3 ? 3 : 0, points: 1 }
    ];

    const teleopPoints = [
        { value: values[7], points: 2 },
        { value: values[8], points: 3 },
        { value: values[9], points: 4 },
        { value: values[10], points: 5 },
        { value: values[11], points: 6 },
        { value: values[12], points: 4 }
    ];

    const endGamePoints = [
        { value: values[13] == 2 ? 2 : 0, points: 1 },
        { value: values[14] == 12 ? 12 : 0, points: 1 },
        { value: values[15] == 6 ? 6 : 0, points: 1 }
    ];

    autonomousPoints.forEach(item => totalScore += parseInt(item.value));
    teleopPoints.forEach(item => totalScore += parseInt(item.value));
    endGamePoints.forEach(item => totalScore += parseInt(item.value));
    const wonMatch = values[16] == 1 ? "Yes" : "No";
    const lostMatch = values[17] == 1 ? "Yes" : "No";
    const tiedMatch = values[18] == 1 ? "Yes" : "No";
    const matchNumber = values[19];
    const teamNumber = values[20];
    const allianceColor = values[21] == 0 ? "Red" : "Blue";
    const matchType = values[22] == "qualification" ? "Qualification" : "Playoffs";
    const scouterName = values[23];

    const outputText = `
    <div class="section">
        <p><strong>Scouter Name:</strong> ${scouterName}</p>
        <p><strong>Match Type:</strong> ${matchType}</p>
        <p><strong>Autonomous Phase:</strong></p>
        <p>Coral L1: ${calculateCount(values[0], 3)}</p>
        <p>Coral L2: ${calculateCount(values[1], 4)}</p>
        <p>Coral L3: ${calculateCount(values[2], 6)}</p>
        <p>Coral L4: ${calculateCount(values[3], 7)}</p>
        <p>Algae Processor: ${calculateCount(values[4], 6)}</p>
        <p>Algae Net: ${calculateCount(values[5], 4)}</p>
        <p>Left During Autonomous: ${values[6] == 3 ? "Yes" : "No"}</p>
    </div>
    <div class="section">
        <p><strong>Teleoperated Phase:</strong></p>
        <p>Coral L1: ${calculateCount(values[7], 2)}</p>
        <p>Coral L2: ${calculateCount(values[8], 3)}</p>
        <p>Coral L3: ${calculateCount(values[9], 4)}</p>
        <p>Coral L4: ${calculateCount(values[10], 5)}</p>
        <p>Algae Processor: ${calculateCount(values[11], 6)}</p>
        <p>Algae Net: ${calculateCount(values[12], 4)}</p>
    </div>
    <div class="section">
        <p><strong>End Game:</strong></p>
        <p>Parked: ${values[13] == 2 ? "Yes" : "No"}</p>
        <p>Deep: ${values[14] == 12 ? "Yes" : "No"}</p>
        <p>Shallow: ${values[15] == 6 ? "Yes" : "No"}</p>
        <p><strong>Total Score:</strong> ${totalScore} points</p>
    </div>
    <div class="section">
        <p><strong>Match Details:</strong></p>
        <p>Won Match: ${wonMatch}</p>
        <p>Lost Match: ${lostMatch}</p>
        <p>Tied Match: ${tiedMatch}</p>
        <p>Match Number: ${matchNumber}</p>
        <p>Team Number: ${teamNumber}</p>
        <p>Alliance Color: ${allianceColor}</p>
    </div>
    `;
    document.getElementById("output").innerHTML = outputText;
    exportToCSV();
}

function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";

    const inputData = document.getElementById("dataInput").value;
    const values = inputData.split(",");

    if (values.length < 23) {
        alert("Invalid data format.");
        return;
    }

    const autonomousPoints = [
        { value: values[0], points: 3 },
        { value: values[1], points: 4 },
        { value: values[2], points: 6 },
        { value: values[3], points: 7 },
        { value: values[4], points: 6 },
        { value: values[5], points: 4 },
        { value: values[6] == 3 ? 3 : 0, points: 1 }
    ];

    const teleopPoints = [
        { value: values[7], points: 2 },
        { value: values[8], points: 3 },
        { value: values[9], points: 4 },
        { value: values[10], points: 5 },
        { value: values[11], points: 6 },
        { value: values[12], points: 4 }
    ];

    const endGamePoints = [
        { value: values[13] == 2 ? 2 : 0, points: 1 },
        { value: values[14] == 12 ? 12 : 0, points: 1 },
        { value: values[15] == 6 ? 6 : 0, points: 1 }
    ];

    let totalScore = 0;
    autonomousPoints.forEach(item => totalScore += parseInt(item.value));
    teleopPoints.forEach(item => totalScore += parseInt(item.value));
    endGamePoints.forEach(item => totalScore += parseInt(item.value));

    const matchNumber = values[19];
    const teamNumber = values[20];
    const allianceColor = values[21] == 0 ? "Red" : "Blue";
    const matchType = values[22] == "qualification" ? "Qualification" : "Playoffs";
    const scouterName = values[23];

    // Match details section
    csvContent += "\n,,,,,,,Scouter Name\r\n";
    csvContent += `,,,,,,,${scouterName}\r\n`;
    csvContent += "\n,,,,,,,Match Type\r\n";
    csvContent += `,,,,,,,${matchType}\r\n`;
    csvContent += "\n,,,,,,,Match Details\r\n";
    csvContent += ",,Won Match,,Lost Match,,Tied Match,,Match Number,,Team Number,,Alliance Color\r\n";
    csvContent += `,,${values[16] == 1 ? "Yes" : "No"},,${values[17] == 1 ? "Yes" : "No"},,${values[18] == 1 ? "Yes" : "No"},,${matchNumber},,${teamNumber},,${allianceColor}\r\n`;

    // Autonomous phase section
    csvContent += "\n,,,,,,,Autonomous Phase\r\n";
    csvContent += "\n,Coral L1,,Coral L2,,Coral L3,,Coral L4,,Algae Processor,,Algae Net,,Left During Autonomous\r\n";
    csvContent += `,${values[0]},,${values[1]},,${values[2]},,${values[3]},,${values[4]},,${values[5]},,${values[6] == 3 ? "Yes" : "No"}\r\n`;

    // Teleop phase section
    csvContent += "\n,,,,,,,Teleop Phase\r\n";
    csvContent += "\n,,Coral L1,,Coral L2,,Coral L3,,Coral L4,,Algae Processor,,Algae Net\r\n";
    csvContent += `,${values[7]},,${values[8]},,${values[9]},,${values[10]},,${values[11]},,${values[12]}\r\n`;

    // End game section
    csvContent += "\n,,,,,,,End Game\r\n";
    csvContent += "\n,,,,Parked,,Deep,,Shallow,,Total Score\r\n";
    csvContent += `,,,,${values[13] == 2 ? "Yes" : "No"},,${values[14] == 12 ? "Yes" : "No"},,${values[15] == 6 ? "Yes" : "No"},,${totalScore}\r\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Scouter-${scouterName}_${matchType} Match-${matchNumber}_Team- ${teamNumber}_${allianceColor}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// QR code scanning functionality
document.addEventListener('DOMContentLoaded', function () {
    const startScannerButton = document.getElementById('startScannerButton');
    let qrScanner;

    startScannerButton.addEventListener('click', function() {
        document.getElementById('qr-reader').classList.remove('hidden');
        this.style.display = 'none';

        function onScanSuccess(decodedText, decodedResult) {
            // Close the scanner after a successful scan
            qrScanner.clear();
            document.getElementById('qr-reader').classList.add('hidden');
            console.log(`Code matched = ${decodedText}`, decodedResult);
            document.getElementById('dataInput').value = decodedText;
            interpretData();
        }

        // Create an instance of Html5QrcodeScanner with the ID of the HTML element
        qrScanner = new Html5QrcodeScanner(
            "qr-reader", { fps: 10, qrbox: 300 });

        // Start scanning
        qrScanner.render(onScanSuccess);
    });
});
