# Team Home
>  Team communication in one home.

[![Swift Version][swift-image]][swift-url]
[![Build Status][travis-image]][travis-url]
[![License][license-image]][license-url]
[![Platform](https://img.shields.io/cocoapods/p/LFAlertController.svg?style=flat)](http://cocoapods.org/pods/LFAlertController)

Connect with team members across multiple message boards and update each other in an instant.

## Features

- [x] Team Dashboard
- [x] Message Boards
- [x] Activity Timeline
- [x] User Settings
- [x] Team Detail Page

## Requirements

- iOS 12.1+
- Xcode 10.1
- Cocoapods

## Getting Started

#### Xcode

Xcode is the IDE of choice for most iOS developers, and the only one officially supported by Apple. To install, simply download Xcode on the Mac App Store.

Don't open any Xcode project or workspace files yet. You will need to install the project's external dependencies first.

#### CocoaPods

This project uses [CocoaPods](http://cocoapods.org/) to handles all external dependencies (e.g. third-party libraries or frameworks).

To install Cocoapods, open your terminal and enter the following code:

    sudo gem install cocoapods

From the root directory of the project, enter the following commands to install the Podfile:

    cd ios/TeamHome
    pod install
    
Note that from now on, you'll need to open the `.xcworkspace` file instead of `.xcproject`, or the project's code will not compile.

#### Apollo Tooling & Node

If you open the project now there will be errors for `apollo cli` so you will need to install node if you don't have it already.

To install node through Homebrew, enter the following into your terminal:

    brew install node
    
After node is installed, you will need to add the apollo tooling. To do so, enter the following into your terminal:

    npm install -g apollo
    
Now you can run the Xcode workspace file without any errors.

## Project Structure

The projects files are organized into folders in the Xcode project, the following is the file structure from the Team Home folder inside the project.

```
├─ Team Home (including API.swift and schema.json files)
    ├─ Helper (date formatter and Appearance file)
    ├─ Models
        ├───── Mock json
    ├─ Resources (including plists, fonts and App Delegate)
        ├───── Image Assets
    ├─ View Controllers and GraphQL files
    ├─ Storyboards
```

Reminder: Keep the API.swift and schema.json files in the Team Home folder and outside of any other folders. Otherwise, you will need to update the build phase code for "Generate Apollo GraphQL API".

## Tech Stack

### Xcode

Xcode is the IDE of choice for most iOS developers, and the only one officially supported by Apple. It comes with the newest SDK and simulators, and you can install frameworks and libraries easily to enhance your iOS application.

## Dependencies

#### Cocoapods

This project uses [CocoaPods](http://cocoapods.org/) to handles all external dependencies (e.g. third-party libraries or frameworks). It's easy to install and hundreds of third-party frameworks and libraries are available to install through Cocoapods

#### Apollo for iOS

[Apollo](https://www.apollographql.com/docs/ios/) is a GraphQL client for native iOS apps. It allows you to execute queries and mutations against a GraphQL server (which the backend uses) and returns results as Swift types. There is no need to parse JSON manually.

#### Auth0 SDK

Auth0 provides authentication and authorization as a service for web and mobile applications. [Auth0 SDK](https://auth0.com/docs/libraries/auth0-swift) is a client-side Swift library for Auth0. 

#### Cloudinary iOS SDK

Cloudinary is a cloud-based image management solution for developers. The [Cloudinary iOS SDK](https://cloudinary.com/documentation/ios_integration#getting_started_guide) provides the ability to manage images seamlessly in the iOS application. This includes the abilities to upload images to the server, manipulate images and download images from the server.

#### Material

[Material](https://github.com/CosmicMind/Material) is a UI/UX framework for creating a cohesive styling throughout an iOS application. Material's animation system also incorporates Motion, a library dedicated to animations and transitions.

#### Toucan
[Toucan](https://cocoapods.org/pods/Toucan) is a Swift library that is designed for processing images. This includes resizing, cropping and styling images while being able to chain those image processing stages.

## License

Distributed under the MIT license. 

[swift-image]:https://img.shields.io/badge/swift-3.0-orange.svg
[swift-url]: https://swift.org/
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
