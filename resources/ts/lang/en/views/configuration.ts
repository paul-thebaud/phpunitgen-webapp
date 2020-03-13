export default {
    "title": "Configuration",
    "description": "Here is the list of options for PhpUnitGen. They will be used for your test generations, and are saved in your browser.",
    "quickLinks": "Quick links to fields",
    "state": {
        "saving": "Save in progress...",
        "saved": "Configuration saved",
    },
    "forceEditorTabs": {
        "label": "Force tabs display",
        "help": "Forces the display of editors on tabs, including on large screens.",
    },
    "automaticGeneration": {
        "label": "Automatic generation",
        "help": "Defines whether the generator should attempt to generate advanced properties and tests or just empty methods to be filled.",
    },
    "testGenerator": {
        "label": "Test generator",
        "help": "Defines how the test is generated (properties, methods, etc.). If you can't find the generator that suits you, create a pull-request on the PhpUnitGen core to add it, or open an issue to ask us!",
        "sourceCode": "Source code",
    },
    "mockGenerator": {
        "label": "Library to use for mocks",
        "help": "Defines the library to use to mock objects. If the library you are using is not available, create a pull-request on the PhpUnitGen core to add it, or open an issue to ask us for it!",
        "sourceCode": "Source code",
    },
    "baseNamespace": {
        "label": "Base namespace",
        "placeholder": "App",
        "help": "Defines the base namespace of your source code. It will be replaced by the test namespace.",
    },
    "baseTestNamespace": {
        "label": "Base test namespace",
        "placeholder": "Tests",
        "help": "Defines the base namespace of your tests. It replaces your basic namespace.",
    },
    "testCase": {
        "label": "\"TestCase\" class to extends",
        "placeholder": "Tests\\TestCase",
        "help": "Defines the absolute name of the \"TestCase\" class to be extended in the test.",
    },
    "excludedMethods": {
        "label": "Methods to be excluded from generation",
        "placeholder": "__construct",
        "help": "Defines the methods for which no test skeleton should be generated. May be in the format of a regular expression (\"__.*\" for example to exclude magical methods).",
    },
    "mergedPhpDoc": {
        "label": "PHPDoc annotation to keep",
        "placeholder": "author",
        "help": "Defines the PHPDoc annotations that must be retrieved in the class to be tested and re-injected into the test class.",
    },
    "phpDoc": {
        "label": "PHPDoc annotation to be added",
        "placeholder": "@author John Doe",
        "help": "Defines the PHPDoc annotations that must be added to the test class.",
    },
    "optionsContext": {
        "label": "Context of the project",
        "help": "Defines the context of the project. Allows some generators to generate more precise code (namespace, etc).",
        "values": {
            "laravel": "Laravel",
            "null": "Other",
        },
    },
    "optionsLaravelUser": {
        "label": "User Class for Laravel projects",
        "placeholder": "App\\User",
        "help": "Defines the class of the User's Eloquent model to be used in the tests that need it.",
    },
};
