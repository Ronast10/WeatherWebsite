<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "city_weather";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM Adelaide";
    $result = $conn->query($sql);

    if ($result) {
        if ($result->num_rows > 0) {
            $weatherData = array(); // Initialize an array to store the data

            while ($row = $result->fetch_assoc()) {
                $weatherData[] = $row; // Add each row to the array
            }

            // Encode the array into JSON format
            $jsonWeatherData = json_encode($weatherData);

            // Output the JSON data
            echo $jsonWeatherData;
        } else {
            echo "No data available.";
        }
    } else {
        echo "Error: " . $conn->error;
    }

    $conn->close();
    ?>
    