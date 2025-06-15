const { _getGoogleSheetClient } = require("../googleSheet");
const sheetId = "1lBSFw8HU7uNS1rm3n-_t0AVafNhcnP8jvGG4Mz9k-MI";
const sheetName = "Nector-foods";
const range = "A:E";

const getAllStudent = async (req, res) => {
    try {
        const googleSheetClient = await _getGoogleSheetClient();
        const sheetResponse = await googleSheetClient.spreadsheets.values.get({
            spreadsheetId: sheetId,
            range: `${sheetName}!${range}`,
        });

        const rows = sheetResponse?.data?.values || [];
        if (rows.length === 0) {
            return res.status(200).json({
                data: [],
                message: "No student data found",
            });
        }

        const headers = rows[0].map(header =>
            header.toLowerCase().replace(/\s+/g, '_')
        );
        const data = rows.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || "";
            });
            return obj;
        });

        res.status(200).json({
            data,
            message: "Student data fetched successfully!",
        });
    } catch (error) {
        console.error("Error fetching student data:", error.message);
        res.status(500).json({
            data: [],
            message: "Unable to fetch student data, try again later!",
        });
    }
};

const deleteRow = async (index) => {
    const sheets = await _getGoogleSheetClient();
    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId: 0,
                            dimension: "ROWS",
                            startIndex: index,
                            endIndex: index + 1
                        }
                    }
                }
            ]
        }
    });
}
  

module.exports = { getAllStudent, deleteRow };