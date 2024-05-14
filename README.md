# Legislation-rules-editor

## Overview

**Legislation-rules-editor** is a React-based frontend application designed to streamline the process of editing and categorizing legal texts. Developed as part of a broader project involving both computer engineers and legal experts, this tool serves as an in-house solution for our legal team. The application connects to a MongoDB database using MongoDB Atlas Data API and employs MongoDB for authentication, using email and password.

## Features

- **User Authentication**: Secure login system with email and password, leveraging MongoDB for authentication.
- **Edit and Categorize Legal Text**: Designed specifically for legal experts to edit and categorize legal documents efficiently.
- **Staging and Production Environments**: Users work on a staging database and can push changes to the production environment after review.
- **Deployment**: The application is deployed on Firebase with CI/CD managed by GitHub Actions.

## Technology Stack

- **Frontend**: React
- **Database**: MongoDB (via MongoDB Atlas Data API)
- **Authentication**: MongoDB (email and password)
- **Deployment**: Firebase
- **CI/CD**: GitHub Actions

## Installation

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/Legislation-rules-editor.git
   cd Legislation-rules-editor
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the application**:
   ```sh
   npm start
   ```

## Usage

1. **Login**: Users can log in using their email and password.
2. **Edit Legal Text**: Navigate to the editor interface to modify and categorize legal documents.
3. **Staging to Production**: After making changes in the staging environment, users can push updates to the production database.

## Deployment

The application is deployed on Firebase. Continuous integration and deployment are managed using GitHub Actions. Every push to the main branch triggers the CI/CD pipeline, which deploys the latest changes to Firebase.

## Team

This project was a collaborative effort between our team of developers and legal experts. The primary contributors to the development of the Legislation-rules-editor include:

- **Anej Vovčak** - Developer
- **Jakob Gospodarič** - Developer
