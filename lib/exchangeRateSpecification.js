/*
 *  lib/exchangeRateSpecification.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-05-10
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

    {
        '@type': 'schema:ExchangeRateSpecification',
        'schema:currency': 'USD',
        'schema:currentExchangeRate': {
            '@type': 'schema:UnitPriceSpecification',
            'schema:price': 1500,
            'schema:priceCurrency': 'CDF'
        }
    }

    We don't enforce the @type
 */
const exchangeRateSpecification = (items, paramd) => {
    paramd = _.d.compose(paramd, {
        require_valid_value: false,
        reverse: false,
    })
    // paramd.precision = _.is.Undefined(paramd.precision) ? 2 : paramd.precision

    const d = {}

    if (_.is.Nullish(items)) {
        return d
    }

    _.coerce.list(items)
        .forEach(item => {
            assert.ok(_.is.Dictionary(item))

            const price = _.d.first(item, "schema:currentExchangeRate/schema:price", null)
            const currency_to = _.d.first(item, "schema:currentExchangeRate/schema:priceCurrency", null)
            const currency_from = _.d.first(item, "schema:currency", null)

            if (!_.is.String(currency_to)) {
                if (paramd.require_valid_value) {
                    throw new Error("invalid value: " + currency_to)
                }
                
                return;
            }

            if (!_.is.String(currency_from)) {
                if (paramd.require_valid_value) {
                    throw new Error("invalid value: " + currency_from)
                }
                
                return;
            }

            if (!_.is.Number(price)) {
                if (paramd.require_valid_value) {
                    throw new Error("invalid value: " + value)
                }
                
                return;
            }


            d[`${currency_from}-${currency_to}`] = price

            if (paramd.reverse) {
                const key = `${currency_to}-${currency_from}`
                if (!d[key]) {
                    d[key] = 1 / price
                }
            }
        })

    return d
}

/**
 *  API
 */
exports.exchangeRateSpecification = exchangeRateSpecification
