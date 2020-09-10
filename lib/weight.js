/*
 *  lib/weight.js
 *
 *  David Janes
 *  IOTDB.org
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

/**
 *  Return the total weight, normalized
 *
 *  Weights look like this:
 
   { '@type': 'schema:StructuredValue',
     'schema:value': 1,
     'schema:unitCode': 'unit:Gram' }

    We don't enforce the @type
 */
const total = (items, paramd) => {
    paramd = _.d.clone(paramd)
    paramd.otherwise = _.is.Undefined(paramd.otherwise) ? 0 : paramd.otherwise
    paramd.require_valid_weight = true
    paramd.require_valid_unit = true
    paramd.unitCode = paramd.unitCode || "unit:Gram"

    if (_.is.Nullish(items)) {
        return paramd.otherwise;
    }

    let total_weight = 0

    _.coerce.list(items)
        .forEach(item => {
            assert.ok(_.is.Dictionary(item))

            const weight = item["schema:value"]
            if (!_.is.Number(weight) || (weight < 0)) {
                if (paramd.require_valid_weight) {
                    throw new Error("invalid weight: " + weight)
                }
                
                return;
            }

            const unitCode = item["schema:unitCode"]
            if (!_.is.String(unitCode)) {
                if (paramd.require_valid_unit) {
                    throw new Error("invalid unit: " + unitCode)
                }

                return
            }

            const normalized_weight = _.convert.convert({
                from: unitCode,
                to: paramd.unitCode,
                value: weight
            })
            if (_.is.Nullish(normalized_weight)) {
                if (paramd.require_valid_unit) {
                    throw new Error("invalid unit: " + unitCode)
                }

                return
            }

            total_weight += normalized_weight
        })

    return total_weight
}

/**
 *  API
 */
exports.total = total
