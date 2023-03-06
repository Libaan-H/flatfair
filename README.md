# FlatFair Coding Challenge

This is a TypeScript program that calculates the membership fee for FlatFair based on the rent input and rent period. 

## Installation

This project uses [typescript](https://www.typescriptlang.org/), [node](http://nodejs.org/) and [npm](https://npmjs.com/).

To install Node.js and npm, please follow the instructions on the [official website](https://nodejs.org/en/download/).

To install TypeScript globally, run the following command:
```node
$ npm install -g typescript
```

## Usage
Clone the project to your local machine.

Navigate to the project directory: Open your terminal and navigate to the project directory.

Install dependencies: Run the following command to install the project dependencies:
```node
$ npm install
```

##

To use the program, you can modify the rentInput and unitName variables to suit your needs. The rentInput variable should be set to the rent amount, and the unitName variable should be set to the name of the organization unit.

To run example

```node
$ npm run start
```
To run tests:

```node
$ npm run test
```


## Model
For the model I would use draw.io and create a UML diagram.


1.Add two more rectangles, labeled "Division A" and "Division B", and connect them to the "Client" rectangle with lines.

2. Add four rectangles, labeled "Area A", "Area B", "Area C", and "Area D", and connect them to the appropriate division rectangles with lines.

3. Add 14 rectangles, labeled "Branch A" through "Branch P", and connect them to the appropriate area rectangles with lines.

4. Add a "Config" class to each rectangle that has a "config" property in the JSON.

5. Add the appropriate properties to each class based on the JSON, such as "has_fixed_membership_fee" and "fixed_membership_fee_amount".

6. Add the appropriate associations between classes based on the "parent" property in the JSON.

##

## Written by Libaan Hassan
