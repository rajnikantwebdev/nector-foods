const {google} = require("googleapis")

const serviceKeyFile = "./nectorf00ds-33b4f8be7cd0.json"
const sheetId = "1lBSFw8HU7uNS1rm3n-_t0AVafNhcnP8jvGG4Mz9k-MI"
const sheetName = "Nector-foods"
const range = 'A:E'

main().then(() => {
    console.log('Completed')
})

async function main() {
    const googleSheetClient = await _getGoogleSheetClient();
    // Reading Google Sheet from a specific range
    const data = await _readGoogleSheet(googleSheetClient, sheetId, sheetName, range);
    console.log(data);
}

async function _getGoogleSheetClient() {
    const auth = new google.auth.GoogleAuth({
        keyFile: serviceKeyFile,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
    return google.sheets({
        version: 'v4',
        auth: authClient,
    });
}

async function _readGoogleSheet(googleSheetClient, sheetId, sheetName, range) {
    const res = await googleSheetClient.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: `${sheetName}!${range}`,
    });

    return res.data.values;
}

async function _writeGoogleSheet(googleSheetClient, sheetId, sheetName, range, data) {
    await googleSheetClient.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: `${sheetName}!${range}`,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "majorDimension": "ROWS",
            "values": data
        },
    })
  }