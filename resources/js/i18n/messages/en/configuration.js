export default {
    'title': 'Configuration',
    'description': 'This page allows you to configure most of PhpUnitGen working. Configuration is saved in your browser storage.',
    'automatic_generation': {
        'name': 'Automatic generation',
        'help': 'Defines if the generator should try to generate properties and advanced tests or only empty methods to complet.',
    },
    'test_generator': {
        'name': 'Tests generator',
        'help': 'Defines the way the test is generated (properties, methods, etc). If you do not find the one you wan\'t, just create a pull-request to add it to the PhpUnitGen core, or open an issue to ask for it!',
    },
    'mock_generator': {
        'name': 'Mocks library to use',
        'help': 'Defines the library to use for mocks creation. If you do not find the one you use in your project, just create a pull-request to add it to the PhpUnitGen core, or open an issue to ask for it!',
    },
    'base_namespace': {
        'name': 'Base namespace',
        'placeholder': 'PhpUnitGen\\App',
        'help': 'Defines the base namespace of your source code. It will be replaced with the tests namespace.',
    },
    'base_test_namespace': {
        'name': 'Base tests namespace',
        'placeholder': 'PhpUnitGen\\Tests',
        'help': 'Defines the base namespace of your tests. It replaces the base namespace.',
    },
    'test_case': {
        'name': '"TestCase" class to extends',
        'placeholder': 'PHPUnit\\Framework\\TestCase',
        'help': 'Defines the absolute name of the "TestCase" class to extend.',
    },
    'excluded_methods': {
        'name': 'Methods to exclude from generation',
        'placeholder': '__construct',
        'help': 'Defines the methods for which tests skeletons should not be generated. It can be a regular expression (such as "__.*").',
    },
    'merged_php_doc': {
        'name': 'PHPDoc tags to keep',
        'placeholder': 'author',
        'help': 'Defines the PHPDoc tags to take from the source class and re-inject inside the test class.',
    },
    'php_doc': {
        'name': 'PHPDoc tags to add',
        'placeholder': '@author John Doe',
        'help': 'Defines the PHPDoc to add to the test class.',
    },
    'options': {
        'name': 'Options',
        'placeholder_key': 'context',
        'placeholder_value': 'laravel',
        'help': 'Defines the options to use in generators. For more details, check out the documentation.',
    },
    'state': {
        'saving': 'Saving...',
        'saved': 'Saved',
    },
    'list_field': {
        'display_more': 'Display more',
        'created_by': 'Created by',
        'search': 'Search...',
        'no_result': 'No result that match your search.',
    },
};
