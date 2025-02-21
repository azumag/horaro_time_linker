# Horaro Time Linker

This repository contains a Google Apps Script to fetch and display active schedule items from the Horaro API.

## Setup

1. Open the `code.gs` file in the Google Apps Script editor.
2. Replace the placeholder Horaro API URL with your actual Horaro schedule API URL.
   ```javascript
   const horaroUrl = "https://horaro.org/-/api/v1/schedules/xxxxxxxxxx";
   ```

## Functions

### checkHoraroSchedule()

Fetches the schedule from Horaro and checks if there is an active item based on the current time. If an active item is found, it extracts the URL from the item and returns it. If no active item is found, it returns `null`.

### doGet()

Calls `checkHoraroSchedule()` and returns an HTML output. If an active URL is found, it provides a clickable link to the user. If no active URL is found, it displays a message indicating that there are no active URLs.

## Usage

Deploy the script as a web app to use it. The web app will provide a redirect link to the active schedule item if it exists.
