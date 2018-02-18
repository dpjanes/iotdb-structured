# iotdb-structured
Helpers for dealing with [schema.org](https://schema.org)-like structured data

# functions

For all the examples, let's see you have a data structure 
that looks like this

    {
        "@context": "https://schema.org",
        "schema:weight": {
            "@type": "schema:StructuredValue",
            "schema:value": 15,
            "schema:unitCode": "unit:Gram"
        },
        "schema:priceSpecification": [
            {
                "@type": "schema:PriceSpecification",
                "schema:value": 15.15,
                "schema:priceCurrency": "USD",
            },
            {
                "@type": "schema:PriceSpecification",
                "schema:value": 21.01,
                "schema:priceCurrency": "USD",
            }
        ]
    }

## weight

These are for links similar to [schema:weight](http://schema.org/weight).

### Get weight in Grams (the default)

    const structured = require("iotdb-structured")

    const g = structured.weight.total(data["schema:weight"])

### Get weight in pounds

See [iotdb-uom-qudt](https://github.com/dpjanes/iotdb-uom-qudt) for units available.
Not that many right now, but we can add more.
The semantic vocabulary is from [QUDT](http://qudt.org/)

    const structured = require("iotdb-structured")

    const lbs = structured.weight.total(data["schema:weight"], {
        unitCode: "unit:PoundMass"
    })

## prices

These are for links similar to [schema:priceSpecification](http://schema.org/priceSpecification).

### Get prices

    const d = structured.priceSpecification.totals(data["schema:priceSpecification"])

The result `d` will look like:

    {
        "USD": 36.16
    }
