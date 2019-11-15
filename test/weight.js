/**
 *  test/weight.js
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

describe("weight", function() {
    describe("total", function() {
        it("single weight - not in array", function() {
            const values = 
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": 12,
                    "schema:unitCode": "unit:Gram"
                };

            const expected = 12;
            const actual = structured.weight.total(values)

            assert.deepEqual(actual, expected)
        })
        it("single weight - in array", function() {
            const values = [
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": 15,
                    "schema:unitCode": "unit:Gram"
                }
            ]

            const expected = 15;
            const actual = structured.weight.total(values)

            assert.deepEqual(actual, expected)
        })
        it("multiple homogeneous weights", function() {
            const values = [
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": 15,
                    "schema:unitCode": "unit:Gram"
                },
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": 27,
                    "schema:unitCode": "unit:Gram"
                }
            ]

            const expected = 42;
            const actual = structured.weight.total(values)

            assert.deepEqual(actual, expected)
        })
        it("multiple heterogenous weights", function() {
            const values = [
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": 15,
                    "schema:unitCode": "unit:Gram"
                },
                {
                    "@type": "schema:StructuredValue",
                    "schema:value": 6,
                    "schema:unitCode": "unit:Carat"
                }
            ]

            const expected = 16.2;
            const actual = structured.weight.total(values)

            assert.deepEqual(actual, expected)
        })
    })
})
