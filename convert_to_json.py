import pandas as pd  # type: ignore
import json
from datetime import datetime

# Load the Excel file
file_path = './gaps1.xlsx'
excel_file = pd.ExcelFile(file_path)  # Create ExcelFile object

# List of sheet names you want to exclude
excluded_sheets = [
    'DISP vs CMMC',
    'DISPEntry to CMMC1',
    'DISPEntry to CMMC2',
    'DISP123 to CMMC1',
    'DISP123 to CMMC2',
    'CMMC1 to DATAEntry',
    'CMMC1 to DATA123',
    'CMMC2 to DATAEntry',
    'CMMC2 to DATA123'
]

# Get all sheet names except the excluded ones
sheets_to_load = [sheet for sheet in excel_file.sheet_names if sheet not in excluded_sheets]

# Read only the selected sheets into a dictionary
data_dict = {sheet: excel_file.parse(sheet) for sheet in sheets_to_load}

# Combine all sheets' data
all_data = []
for sheet_name, df in data_dict.items():
    # Replace NaN values with an appropriate value, e.g., "N/A"
    df.fillna("N/A", inplace=True)
    
    # Add sheet name as a column for context (optional)
    df['Sheet Name'] = sheet_name
    
    # Convert DataFrame to a list of dictionaries and append to all_data
    all_data.extend(df.to_dict(orient='records'))

# Function to convert datetime objects to strings
def serialize(data):
    for entry in data:
        for key, value in entry.items():
            if isinstance(value, datetime):
                entry[key] = value.strftime('%Y-%m-%d %H:%M:%S')  # Convert to string format
    return data

# Serialize the data
json_data = serialize(all_data)

# Save the data as JSON
with open('updated1.json', 'w') as json_file:
    json.dump(json_data, json_file, indent=4)

print("Data has been successfully converted to JSON format and saved as 'updated1.json'")
