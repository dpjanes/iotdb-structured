/*
 *  lib/value_unit.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-10-15
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
const errors = require("iotdb-errors")

/**
 */
const value_unit = (v, paramd) => {
    paramd = Object.assign({
        scalar_unit: "unit:Number",
        coerce_value: true,
        coerce_unit: null,
    }, paramd || {})

    const result = {
        value: null,
        unit: null,
    }

    if (_.is.Array(v)) {
        v = v[0]
    }

    if (_.is.Nullish(v)) {
    } else if (_.is.Atomic(v)) {
        result.value = v
        result.unit = paramd.scalar_unit
    } else if (_.is.Dictionary(v)) {
        result.value = _.d.first(v, "schema:value", null)
        result.unit = _.d.first(v, "schema:unitCode", null)
    } else {
    }

    if (!_.is.Undefined(result.value) && paramd.coerce_value) {
        result.value = _.coerce.to.Number(result.value, null)
    }

    if (!_.is.String(result.unit) || _.is.Nullish(result.unit)) {
        result.value = null
        result.unit = null
    }
    
    if (result.unit && paramd.coerce_unit) {
        const nvalue = _.convert.convert({
            from: result.unit,
            to: paramd.coerce_unit,
            value: result.vaue,
        })

        if (_.is.Nullish(nvalue)) {
            throw new errors.NotApproproate(`could not convert ${result.value} ${result.unit} to ${paramd.coerce_unit}`)
        }
    }

    return result
}

value_unit.method = "value_unit"
value_unit.description = `
    Return the { value, unit } of some structured value,
    e.g. a schema:StructuredValue.

    If the value is a simple scalar, the unit is assumed
    to be "unit:Number".

    paramd.scalar_unit (unit:Number): change the default scalar value 
    paramd.coerce_value (true): coerce value to a number
    paramd.coerce_unit (null): coerce the value to this unit
    `

/**
 *  API
 */
exports.value_unit = value_unit