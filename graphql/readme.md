
# GraphQL

Hosted at - https://anmolksachan.github.io/graphql/

This repository contains a list of test cases to validate the security of a GraphQL API endpoint. The test cases include various security vulnerabilities such as SQL injection, cross-site scripting (XSS), path traversal, command injection, and authentication and authorization bypasses.

## Test Cases

The following test cases are included in this repository:

-   **GraphQL API endpoint:** Test common GraphQL API endpoint URLs.
-   **Introspection query:** Verify that the introspection query is disabled.
-   **SQL Injection:** Attempt to perform SQL injection.
-   **Cross-site scripting (XSS):** Attempt to perform a cross-site scripting attack.
-   **Path Traversal:** Attempt to perform path traversal.
-   **Command Injection:** Attempt to perform command injection.
-   **Authentication Bypass:** Attempt to bypass authentication.
-   **Authorization Bypass:** Attempt to bypass authorization.
-   **SQL Injection - UNION attack:** Attempt to perform a SQL injection using UNION.
-   **XSS - Script tag bypass:** Attempt to perform a cross-site scripting attack using script tag bypass.
-   **Path Traversal - Absolute path:** Attempt to perform path traversal using an absolute path.
-   **Command Injection - Arbitrary command execution:** Attempt to execute an arbitrary command using command injection.
-   **Authentication Bypass - SQL Injection:** Attempt to bypass authentication using SQL Injection.
-   **Authorization Bypass - Forced browsing:** Attempt to bypass authorization using forced browsing.
-   **No query:** Attempt to send a request without a query parameter.
-   **Empty query:** Attempt to send an empty query parameter.
-   **Invalid query parameter:** Attempt to send an invalid query parameter.
-   **Invalid variable type:** Attempt to send a variable with an invalid type.
-   **Missing required variable:** Attempt to send a request without a required variable.
-   **Lots More** 

## Usage

The `test_cases` field in the JSON file contains an array of all the test cases. Each test case has a `name`, `description`, and `payload` field. The `payload` field contains the GraphQL query to be sent in the test case.

To use this repository, simply copy the `payload` field from the desired test case into your GraphQL client(varies as per scenario/ application behavious) and send the request to the GraphQL API endpoint you wish to test.

## Contributing

If you wish to contribute to this repository, feel free to fork the repository and submit a pull request. Please ensure that any new test cases you add follow the same format as the existing test cases in  `checklist.json` . Additionally, please provide a clear `name` and `description` for each new test case.
