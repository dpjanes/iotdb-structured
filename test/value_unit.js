/**
 *  test/value_unit.js
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

"use strict"

const _ = require("iotdb-helpers")

const assert = require("assert")

const structured = require("..")
const _util = require("./_util")

describe("value_unit", function() {
    describe("total", function() {
        it("structured value", function() {
            const input = 
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": 12,
                    "schema:unitCode": "unit:Gram"
                };

            const expected = { value: 12, unit: 'unit:Gram' }
            const actual = structured.value_unit(input)

            assert.deepStrictEqual(actual, expected)
        })
        it("structured value - in array", function() {
            const input = 
                [ {
                    "@type": "schema:StructuredValue",
                    "schema:value": 12,
                    "schema:unitCode": "unit:Gram"
                } ];

            const expected = { value: 12, unit: 'unit:Gram' }
            const actual = structured.value_unit(input)

            assert.deepStrictEqual(actual, expected)
        })
        it("structured value - string coercion", function() {
            const input = 
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": "12.22",
                    "schema:unitCode": "unit:Gram"
                };

            const expected = { value: 12.22, unit: 'unit:Gram' }
            const actual = structured.value_unit(input)

            assert.deepStrictEqual(actual, expected)
        })
        it("structured value - string coercion blocked", function() {
            const input = 
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": "12.22",
                    "schema:unitCode": "unit:Gram"
                };

            const expected = null
            const actual = structured.value_unit(input, { coerce_value: false })

            assert.deepStrictEqual(actual, expected)
        })
        it("structured value - string coercion and number", function() {
            const input = 
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": "1222",
                    "schema:unitCode": "unit:Gram"
                };

            const expected = { value: 1.222, unit: 'unit:Kilogram' }
            const actual = structured.value_unit(input, { coerce_unit: "unit:Kilogram" })

            assert.deepStrictEqual(actual, expected)
        })
        it("scalar value", function() {
            const input = -100.22
            const expected = { value: -100.22, unit: 'unit:Number' }
            const actual = structured.value_unit(input)

            assert.deepStrictEqual(actual, expected)
        })
        it("scalar value in array", function() {
            const input = [ -100.22 ]
            const expected = { value: -100.22, unit: 'unit:Number' }
            const actual = structured.value_unit(input)

            assert.deepStrictEqual(actual, expected)
        })
        it("null value", function() {
            const input = null
            const expected = null
            const actual = structured.value_unit(input)

            assert.deepStrictEqual(actual, expected)
        })
        it("undefined value", function() {
            const input = undefined
            const expected = null
            const actual = structured.value_unit(input)

            assert.deepStrictEqual(actual, expected)
        })
        it("weird value", function() {
            const input = () => 1;
            const expected = null
            const actual = structured.value_unit(input)

            assert.deepStrictEqual(actual, expected)
        })
        it("catch unconvertable", function() {
            const input = -100.22
            const expected = { value: -100.22, unit: 'unit:Number' }

            try {
                const actual = structured.value_unit(input, { coerce_unit: "unit:Schmeckle" })
                throw new Error("expected an error!")
            } catch (x) {
            }
        })
    })
})
