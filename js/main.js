/**
 * Note: An external CityFinder API is important so that secret API keys (e.g., Yelp Fusion) are not 
 * exposed in this frontend code.
 */
const API_ENDPOINT = "https://volweb.utk.edu/~jyoshiok/";

/**
 * Volweb API endpoint returns GoogleAnalyticsObject script after content; remove it and convert to json.
 * Note: If the script is not included, this will simply return the original response.
 * @param data Called endpoint response data.
 * @return Endpoint response without GoogleAnalyticsObject script as a JSON object.
 */
function cleanResponse(data) {
    var cleanedResponse = data.split('<script>')[0];
    return JSON.parse(cleanedResponse);
}

/**
 * Calls the specified CityFinder endpoint.
 * @param endpoint CityFinder endpoint name.
 */
function callEndpoint(endpoint) {
    // Note: The Content-Type is 'text/html' since the endpoint automatically returns a
    // GoogleAnalyticsObject script, appended to the endpoint's json response.
    fetch(API_ENDPOINT + endpoint + ".php")
        .then((res) => res.text())
        .then((data) => console.log(cleanResponse(data)))
        .catch((err) => console.error(err));
}

// Calling test endpoint.
callEndpoint('test');