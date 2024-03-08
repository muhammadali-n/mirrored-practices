package com.valoriz.algolia.token;

import com.valoriz.algolia.constants.Constants;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class OcctooAccessTokenGenerator {

    public static String generateAccessToken(String dynamicId, String clientId, String clientSecret) {
        try {
            // Construct the URL with the dynamic ID
            String url = "https://destinations.occtoo.com/destinations/" + dynamicId + "/token";
            URL obj = new URL(url);

            // Create connection
            HttpURLConnection connection = (HttpURLConnection) obj.openConnection();

            // Set the request method to POST
            connection.setRequestMethod(Constants.POST);

            // Enable input/output streams
            connection.setDoOutput(true);
            connection.setDoInput(true);

            // Set request headers
            connection.setRequestProperty(Constants.CONTENT_TYPE, Constants.APPLICATION_JSON);

            // Construct the request body
            String requestBody = "{\"clientId\":\"" + clientId + "\",\"clientSecret\":\"" + clientSecret + "\"}";

            // Send the request body
            try (DataOutputStream wr = new DataOutputStream(connection.getOutputStream())) {
                wr.writeBytes(requestBody);
                wr.flush();
            }

            // Read the response
            try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                String inputLine;
                StringBuilder response = new StringBuilder();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                // Parse JSON response and return the access token
                return parseAccessToken(response.toString());
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    private static String parseAccessToken(String jsonResponse) {
        // Parse JSON response and extract the access token
        int startIndex = jsonResponse.indexOf("\"accessToken\":") + 14;
        int endIndex = jsonResponse.indexOf("\",", startIndex);

        // Remove leading and trailing double quotes
        return jsonResponse.substring(startIndex, endIndex).replace("\"", "");
    }

}
