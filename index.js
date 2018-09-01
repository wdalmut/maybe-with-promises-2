const { Just, Nothing }                                            = require('data.maybe'),
      { map, ifElse, compose, equals, prop }                       = require('ramda'),
      { get_order, send_invoice_ticket, create_guests_for_event, } = require('./order')

const is_confirmed = compose(equals(true), prop('confirmed'));

let id = process.argv[2];

get_order(id)
  .then(ifElse(is_confirmed, Just, Nothing))
  .then(map(create_guests_for_event))
  .then(map(send_invoice_ticket))
  .then(console.log)
;

