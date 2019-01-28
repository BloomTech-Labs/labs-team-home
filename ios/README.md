# Team Home
>  Team communication in one home.

[![Swift Version][swift-image]][swift-url]
[![Build Status][travis-image]][travis-url]
[![License][license-image]][license-url]
[![Platform](https://img.shields.io/cocoapods/p/LFAlertController.svg?style=flat)](http://cocoapods.org/pods/LFAlertController)

Connect with team members across multiple message boards and update each other in an instant...

## Features

- [x] Message Boards

## Requirements

- iOS 12.1+
- Xcode 10.1
- Cocoapods

## Getting Started

#### Xcode

Xcode is the IDE of choice for most iOS developers, and the only one officially supported by Apple. To install, simply download Xcode on the Mac App Store. It comes with the newest SDK and simulators, and you can install more stuff under Preferences > Downloads.

Don't open any Xcode project or workspace files yet. You will need to install the project's external dependencies first.

#### CocoaPods

This project uses [CocoaPods](http://cocoapods.org/) to handles all external dependencies (e.g. third-party libraries or frameworks).

To install Cocoapods, open your terminal and enter the following code:

    sudo gem install cocoapods

From the root directory of the project, enter the following commands to install the Podfile:

    cd ios/TeamHome
    pod install
    
Note that from now on, you'll need to open the `.xcworkspace` file instead of `.xcproject`, or the project's code will not compile.

## Project Structure

The projects files are organized into folders in the Xcode project, the following is the file structure from the Team Home folder inside the project.

├─ Models
├─ Resources (including plists and App Delegate)
├─ View Controllers and GraphQL files
├─ Storyboards

Reminder: Keep the API.swift and schema.json files in the Team Home folder and outside of any other folders. Otherwise, you will need to update the build phase code for "Generate Apollo GraphQL API".

## Extra

Distributed under the MIT license. 

[swift-image]:https://img.shields.io/badge/swift-3.0-orange.svg
[swift-url]: https://swift.org/
[license-image]: https://img.shields.io/badge/License-MIT-blue.svg
[license-url]: LICENSE
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[codebeat-image]: https://codebeat.co/badges/c19b47ea-2f9d-45df-8458-b2d952fe9dad
[codebeat-url]: https://codebeat.co/projects/github-com-vsouza-awesomeios-com
