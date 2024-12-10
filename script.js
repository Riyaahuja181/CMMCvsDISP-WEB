document.addEventListener('DOMContentLoaded', () => {
    const currentLevelDropdown = document.getElementById('current-level');
    const desiredLevelDropdown = document.getElementById('desired-level');
    const compareButton = document.getElementById('compare-btn');
    const resultsContainer = document.getElementById('comparison-results');

    // Fetch JSON data
    async function fetchData() {
        try {
            console.log('Fetching JSON data...');
            const response = await fetch('updated1.json');

            if (!response.ok) throw new Error('Error loading JSON file');
            const data = await response.json();
            console.log('Fetched Data:', data); // Debugging log for fetched data
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = `<p class="error">Could not load data. Please try again later.</p>`;
            return [];
        }
    }

    // Compare selected levels
    async function compareLevels() {
        console.log('Compare Levels function is running');
        const currentLevel = currentLevelDropdown.value;
        const desiredLevel = desiredLevelDropdown.value;

        console.log('Selected Current Level:', currentLevel);
        console.log('Selected Desired Level:', desiredLevel);

        if (currentLevel === desiredLevel) {
            resultsContainer.innerHTML = `<p class="warning">Please select different levels to compare.</p>`;
            return;
        }

        const data = await fetchData();

        console.log('Data fetched, starting comparison...');
        const matches = data.filter(
            item => 
                {
                    // console.log(item.ID);
                    var string = item['Sheet Name'];
                    var cl = string.split(" to ")[0];
                    var dl = string.split(" to ")[1];
                    console.log(cl,dl);
                    // console.log(currentLevel,desiredLevel);
                    if(cl==currentLevel && dl==desiredLevel)
                    {
                        // console.log("hello");
                        return true;
                    }
                }
        );

        console.log('Matching Data:', matches);

        if (matches.length > 0) {
            console.log('Rendering matching data');
            const tableRows = matches.map(match => `
                <tr>
                    <td>${match.ID}</td>
                    <td>${match.Control}</td>
                    <td>${match.Comments}</td>
                    <td>${match["Control /Action"]}</td>
                </tr>
            `).join('');

            resultsContainer.innerHTML = `
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Control</th>
                            <th>Comments</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>
            `;
        } else {
            console.log('No matching data found');
            resultsContainer.innerHTML = `<p class="no-data">No matching data found for the selected levels.</p>`;
        }
    }

    // Event listener for compare button
    compareButton.addEventListener('click', compareLevels);
});
