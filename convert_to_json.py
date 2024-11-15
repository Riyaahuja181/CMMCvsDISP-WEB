import pandas as pd  # type: ignore
import json
from datetime import datetime

# Load the Excel file
file_path = './gaps.xlsx'
df = pd.read_excel(file_path)

# Replace NaN values with an appropriate value, e.g., "N/A"
df.fillna("N/A", inplace=True)

# Convert DataFrame to a list of dictionaries
data = df.to_dict(orient='records')

# Function to convert datetime objects to strings
def serialize(data):
    for entry in data:
        for key, value in entry.items():
            if isinstance(value, datetime):
                entry[key] = value.strftime('%Y-%m-%d %H:%M:%S')  # Convert to string format
    return data

# Serialize the data
json_data = serialize(data)

# Save the data as JSON
with open('updated.json', 'w') as json_file:
    json.dump(json_data, json_file, indent=4)

print("Data has been successfully converted to JSON format and saved as data.json")
