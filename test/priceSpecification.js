/**
 *  test/priceSpecification.js
 *
 *  David Janes
 *  IOTDB
 *  2018-02-18
 *
 *  Copyright (2013-2020) David P. Janes
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const structured = require("..")
const _util = require("./_util")

describe("priceSpecification", function() {
    describe("total", function() {
        it("single priceSpecification - not in array", function() {
            const values = 
                {
                    "@type": "schema:PriceSpecification",
                    "schema:value": 12.12,
                    "schema:priceCurrency": "USD",
                };

            const expected = {
                "USD": 12.12,
            }
            const actual = structured.priceSpecification.totals(values)

            assert.deepEqual(actual, expected)
        })
        it("single priceSpecification - in array", function() {
            const values = [
                {
                    "@type": "schema:PriceSpecification",
                    "schema:value": 15.15,
                    "schema:priceCurrency": "USD",
                }
            ]

            const expected = {
                "USD": 15.15,
            }
            const actual = structured.priceSpecification.totals(values)

            assert.deepEqual(actual, expected)
        })
        it("multiple homogeneous prices", function() {
            const values = [
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

            const expected = {
                "USD": 36.16,
            }
            const actual = structured.priceSpecification.totals(values)

            assert.deepEqual(actual, expected)
        })
        it("multiple heterogenous weights", function() {
            const values = [
                {
                    "@type": "schema:PriceSpecification",
                    "schema:value": 15.15,
                    "schema:priceCurrency": "USD",
                },
                {
                    "@type": "schema:PriceSpecification",
                    "schema:value": 99.98,
                    "schema:priceCurrency": "CAD",
                },
                {
                    "@type": "schema:PriceSpecification",
                    "schema:value": 21.01,
                    "schema:priceCurrency": "USD",
                }
            ]

            const expected = {
                "USD": 36.16,
                "CAD": 99.98,
            }
            const actual = structured.priceSpecification.totals(values)

            assert.deepEqual(actual, expected)
        })
    })
})
