/**
 *  test/exchangeRateSpecification.js
 *
 *  David Janes
 *  IOTDB
 *  2018-05-10
 *
 *  Copyright [2013-2018] [David P. Janes]
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

describe("exchangeRateSpecification", function() {
    describe("total", function() {
        it("single exchangeRateSpecification - not in array", function() {
            const values = 
                {
                    '@type': 'schema:ExchangeRateSpecification',
                    'schema:currency': 'USD',
                    'schema:currentExchangeRate': {
                        '@type': 'schema:UnitPriceSpecification',
                        'schema:price': 1500,
                        'schema:priceCurrency': 'CDF'
                    }
                }

            const expected = {
                "USD-CDF": 1500
            }
            const actual = structured.exchangeRateSpecification(values)

            assert.deepEqual(actual, expected)
        })
        it("single exchangeRateSpecification - in array", function() {
            const values =  [
                {
                    '@type': 'schema:ExchangeRateSpecification',
                    'schema:currency': 'USD',
                    'schema:currentExchangeRate': {
                        '@type': 'schema:UnitPriceSpecification',
                        'schema:price': 1500,
                        'schema:priceCurrency': 'CDF'
                    }
                }
            ]

            const expected = {
                "USD-CDF": 1500
            }
            const actual = structured.exchangeRateSpecification(values)

            assert.deepEqual(actual, expected)
        })
        it("multiple exchangeRateSpecification", function() {
            const values =  [
                {
                    '@type': 'schema:ExchangeRateSpecification',
                    'schema:currency': 'USD',
                    'schema:currentExchangeRate': {
                        '@type': 'schema:UnitPriceSpecification',
                        'schema:price': 1500,
                        'schema:priceCurrency': 'CDF'
                    }
                },
                {
                    '@type': 'schema:ExchangeRateSpecification',
                    'schema:currency': 'USD',
                    'schema:currentExchangeRate': {
                        '@type': 'schema:UnitPriceSpecification',
                        'schema:price': 1.28,
                        'schema:priceCurrency': 'CAD'
                    }
                }
            ]

            const expected = {
                "USD-CDF": 1500,
                "USD-CAD": 1.28,
            }
            const actual = structured.exchangeRateSpecification(values)

            assert.deepEqual(actual, expected)
        })
    })
})
