# Förankrad Konferensen Project README

## Introduction

Welcome to the Förankrad Konferensen project! This README will guide you through the setup, technologies used, and how to contribute to the project.

## Project Overview

This project is specifically tailored for the Förankrad Konferensen event, hosted by Pingst Church Västra Frölunda. It is built using Next.js and deployed on Vercel. The platform enables attendees to access event information, make bookings, and receive confirmation emails.

## Technologies Used

Next.js: Next.js is a React framework for building server-side rendered and static websites.
Vercel: Vercel is a cloud platform for static sites and serverless functions, perfect for deploying Next.js projects.
Google Sheets: We utilize Google Sheets as our content management system and for storing bookings.
Resend: Resend is used to send confirmation emails to users who make bookings.
Tailwind: CSS framework. 
DaisyUi: Library using tailwind for styled components.

## Getting Started

To work on the project, please contact us to get access and permissions.

### Setup Requirements
Before setting up the project, ensure you have the following:

Google Service Account: You'll need a Google service account with access to the necessary Google Sheets containing information and permissions.
Sheet IDs: Obtain the sheet IDs containing the required information, and grant permission to your client email in the service account.
Resend Key and DNS Configuration: Obtain a Resend API key for sending confirmation emails and configure DNS for the domain.
Domain Configuration: Configure the DNS for the domain where the project will be deployed.
Project Structure

/app: Contains Next.js app files for routing and rendering.
/components: Contains reusable React components.
/public: Stores static assets such as images.
/google-sheets-api contains the logic for retrieving information and set information in the sheets.
/actions.ts is a file with server actions.

The website fetches data from Google Sheets. When fetching images, only the ID is retrieved. It's the user's responsibility to input the ID into Google Sheets.

## Contribution

We welcome contributions to the project! Please reach out to us to discuss any enhancements, bug fixes, or new features you'd like to work on.

## Contact Us

For inquiries or to work on the project, please contact Förankrad Konferensen Team.

Thank you for your interest in our project! 🙏