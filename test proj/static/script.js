let csvData; // Variable to store CSV data

    function uploadCSV(input) {
      const fileInput = input.files[0];

      if (fileInput) {
        const reader = new FileReader();

        reader.onload = function (e) {
          // Read the CSV data from the FileReader result
          csvData = e.target.result;

          // Display the CSV data on the webpage
          displayCSVData(csvData);
        };

        // Read the file as text
        reader.readAsText(fileInput);
      } else {
        alert('Please select a CSV file.');
      }

      // fetch('/upload', {
      //       method: 'POST',
      //   })
      //   .then(response => response.json())
      //   .then(data => {
      //       // Handle the response from the server
      //       console.log(data.status);

      //       if (data.status === 'success') {
      //           // Display VaR value
      //           document.getElementById('var-value').innerHTML = data.body;
      //           // const varElement = document.querySelector('.var-value');
      //           // varElement.textContent = `Under normal market conditions and based on historical data, there is a 95% confidence that the maximum expected loss over the specified time period will be <=: ${data.var_value.toFixed(2) }`;
      //           // varElement.style.display = 'block';
      //       }
      //   })
      //   .catch(error => {
      //       console.error('Error:', error);
      //   });
    }

    function displayCSVData(csvData) {
      // Split the CSV data into lines
      const lines = csvData.split('\n');

      // Extract the first 10 lines
      const first10Lines = lines.slice(0, 10).join('\n');

      // Assuming there is an HTML element with the id 'csvDisplay' to display the data
      const displayElement = document.getElementById('csvDisplay');

      // Display the first 10 lines of the CSV data
      displayElement.textContent = first10Lines;
    }

    function generate() {
      // Set the source of the generated-image directly to the local file path
      const imagePath = 'static/temp_plot.png';

      // Display the image
      const imageElement = document.getElementById('generated-image');
      imageElement.src = imagePath;
      imageElement.style.display = 'block';

      
    
    }

    function detail() {
      // Set the source of the generated-image directly to the local file path
      const imagePath = 'static/temp_plot2.png';

      // Display the image
      const imageElement = document.getElementById('generated-image2');
      imageElement.src = imagePath;
      imageElement.style.display = 'block';
    
    }

    function clearPage() {
      // Reset the displayed content
      const displayElement = document.getElementById('csvDisplay');
      displayElement.textContent = '';

      const display2Element = document.getElementById('stats');
      display2Element.textContent = '';

      const imageElement = document.getElementById('generated-image');
      imageElement.src = '';
      imageElement.style.display = 'none';

      const imageElement2 = document.getElementById('generated-image2');
      imageElement2.src = '';
      imageElement2.style.display = 'none';

      const fileInput = document.getElementById('fileInput');
      fileInput.value = ''; // This clears the selected file

      csvData = null;

      location.reload();
      window.location.href = '/';
    }