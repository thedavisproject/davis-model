# Entity Query Structure

## Query syntax

Query expressions use a prefix/Polish/lisp style. Each sub-expression in the query
is encapsulated in an array, where the first position is the operator and the 
remaining positions are the arguments to the operator.

Any expression (logical or comparison) may be nested inside of a logical expression.
The innermost sub-expressions must be comparison expressions.

## Comparison operators

Possible operators: *=, !=, <, <=, >, >=, like, in, notin*

    [ op, property, value(s) ]

Example

    [ "=", "id", 24 ]          // id = 24

    [ "in", "id", [1,2,3,4] ]  // id in (1,2,3,4)

Rules:
* Comparison expressions will always have a length of 3 (operator + 2 arguments). 
* The first argument must always be a string (property identifier)
* The second argument depends on the operator and the type of the property

## Logical operators

Possible operators: *and, or, not, nor*

    [ op, expression(s) ]

Example:

    [ "and", 
        [ "=", "name", "Foo" ], 
        [ ">", "modified", "12/1/2016" ]
    ] 
    // (name = "Foo") AND (modified > 12/1/2016)

    [ "not",
        [ "=", "name", "Foo" ]
    ]
    // NOT (name = "Foo")

Rules:
* Logical expressions will always have a length of 3 or more, with the exception of "not", which is 2 or more.
* Each argument must be a sub-expression (either logical or comparison)

## Deep nesting Example

    [ "or", 
        [ "not", 
            [ ">", "date", "12/1/2016"]
        ],
        [ "and", 
            [ "=", "published", "false" ],
            [ "=", "modified", "true" ],
            [ "in", "id", [1,2,3] ]
        ]
    ]
    // (NOT (date > 12/1/2016)) OR ((published = false) AND (modified = true) AND (id in (1,2,3))

## Options

Options for manipulating query results.

  {
    // Sort properties
    sort: {
      property: "...",
      direction: "ascending|descending"
    },
    // The number of results to fetch
    take: number,
    // The number of resutls to skip
    skip: number
  }
