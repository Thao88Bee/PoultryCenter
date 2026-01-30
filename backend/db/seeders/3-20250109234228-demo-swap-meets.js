"use strict";

const { SwapMeet } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const swapMeets = [
  {
    ownerId: 1,
    name: "Watertown Pigeon Club Annual Pet Swap",
    date: "2026-02-21",
    description: `Pet Swap held in Feb or March - 6:30am-10:30am.
      Annual Show & Swap (pigeons only) - November
      Always the Saturday after Thanksgiving.
      For more information on the spring swap & show, contact:
      Pete Dempsey
      dempseypete@yahoo.com
      920-728-0027`,
    address: "03 N Jackson Ave",
    city: "Jefferson",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "Elk Mound Animal Swap",
    date: "2026-05-09",
    description: `8am-12pm
      Monthly on Saturdays From May-October
      Poultry, small animals, baked goods, crafts, etc are allowed!
      Animal sellers outside of WI must have their NPIP 9-3 copy or veterinary paperwork onsite.
      Free for Buyers, $5 for Standard Parking Seller, $10 for Trailer Parking
      All parking spaces are first come, first serve.
      There is no pre-pay or reservation fee.
      Seller fee is paid onsite at the swap.
      Held regardless of weather unless severe or property is deemed unsafe.
      For more information, contact:
      Linda Vue
      elkmoundswap@gmail.com
      Text 715-440-4835
      or
      Call Dina 715-456-1241`,
    address: "E8994 Highway 12",
    city: "Elk Mound",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "RiceStonian Swap",
    date: "2026-05-30",
    description: `6am-10am
      Animals, crafts, baked goods, canned goods, cages, horse tack, candles, homemade soaps, jellies, and so much more
      Hoofstock is allowed, following all state testing and proper tags
      For more information on the swap, contact:
      Shawna Stone
      sstone715@yahoo.com
      715-497-3369`,
    address: "301-399 N Menomonie St",
    city: "Ridgeland",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "Elk Mound Animal Swap",
    date: "2026-06-06",
    description: `8am-12pm
      Monthly on Saturdays From May-October
      Poultry, small animals, baked goods, crafts, etc are allowed!
      Animal sellers outside of WI must have their NPIP 9-3 copy or veterinary paperwork onsite.
      Free for Buyers, $5 for Standard Parking Seller, $10 for Trailer Parking
      All parking spaces are first come, first serve.
      There is no pre-pay or reservation fee.
      Seller fee is paid onsite at the swap.
      Held regardless of weather unless severe or property is deemed unsafe.
      For more information, contact:
      Linda Vue
      elkmoundswap@gmail.com
      Text 715-440-4835
      or
      Call Dina 715-456-1241`,
    address: "E8994 Highway 12",
    city: "Elk Mound",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "Elk Mound Animal Swap",
    date: "2026-07-11",
    description: `8am-12pm
      Monthly on Saturdays From May-October
      Poultry, small animals, baked goods, crafts, etc are allowed!
      Animal sellers outside of WI must have their NPIP 9-3 copy or veterinary paperwork onsite.
      Free for Buyers, $5 for Standard Parking Seller, $10 for Trailer Parking
      All parking spaces are first come, first serve.
      There is no pre-pay or reservation fee.
      Seller fee is paid onsite at the swap.
      Held regardless of weather unless severe or property is deemed unsafe.
      For more information, contact:
      Linda Vue
      elkmoundswap@gmail.com
      Text 715-440-4835
      or
      Call Dina 715-456-1241`,
    address: "E8994 Highway 12",
    city: "Elk Mound",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "RiceStonian Swap",
    date: "2026-07-25",
    description: `6am-10am
      Animals, crafts, baked goods, canned goods, cages, horse tack, candles, homemade soaps, jellies, and so much more
      Hoofstock is allowed, following all state testing and proper tags
      For more information on the swap, contact:
      Shawna Stone
      sstone715@yahoo.com
      715-497-3369`,
    address: "301-399 N Menomonie St",
    city: "Ridgeland",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "Elk Mound Animal Swap",
    date: "2026-08-01",
    description: `8am-12pm
      Monthly on Saturdays From May-October
      Poultry, small animals, baked goods, crafts, etc are allowed!
      Animal sellers outside of WI must have their NPIP 9-3 copy or veterinary paperwork onsite.
      Free for Buyers, $5 for Standard Parking Seller, $10 for Trailer Parking
      All parking spaces are first come, first serve.
      There is no pre-pay or reservation fee.
      Seller fee is paid onsite at the swap.
      Held regardless of weather unless severe or property is deemed unsafe.
      For more information, contact:
      Linda Vue
      elkmoundswap@gmail.com
      Text 715-440-4835
      or
      Call Dina 715-456-1241`,
    address: "E8994 Highway 12",
    city: "Elk Mound",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "RiceStonian Swap",
    date: "2026-08-29",
    description: `6am-10am
      Animals, crafts, baked goods, canned goods, cages, horse tack, candles, homemade soaps, jellies, and so much more
      Hoofstock is allowed, following all state testing and proper tags
      For more information on the swap, contact:
      Shawna Stone
      sstone715@yahoo.com
      715-497-3369`,
    address: "301-399 N Menomonie St",
    city: "Ridgeland",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "Elk Mound Animal Swap",
    date: "2026-09-05",
    description: `8am-12pm
      Monthly on Saturdays From May-October
      Poultry, small animals, baked goods, crafts, etc are allowed!
      Animal sellers outside of WI must have their NPIP 9-3 copy or veterinary paperwork onsite.
      Free for Buyers, $5 for Standard Parking Seller, $10 for Trailer Parking
      All parking spaces are first come, first serve.
      There is no pre-pay or reservation fee.
      Seller fee is paid onsite at the swap.
      Held regardless of weather unless severe or property is deemed unsafe.
      For more information, contact:
      Linda Vue
      elkmoundswap@gmail.com
      Text 715-440-4835
      or
      Call Dina 715-456-1241`,
    address: "E8994 Highway 12",
    city: "Elk Mound",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "RiceStonian Swap",
    date: "2026-09-26",
    description: `6am-10am
      Animals, crafts, baked goods, canned goods, cages, horse tack, candles, homemade soaps, jellies, and so much more
      Hoofstock is allowed, following all state testing and proper tags
      For more information on the swap, contact:
      Shawna Stone
      sstone715@yahoo.com
      715-497-3369`,
    address: "301-399 N Menomonie St",
    city: "Ridgeland",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 1,
    name: "Elk Mound Animal Swap",
    date: "2026-10-03",
    description: `8am-12pm
      Monthly on Saturdays From May-October
      Poultry, small animals, baked goods, crafts, etc are allowed!
      Animal sellers outside of WI must have their NPIP 9-3 copy or veterinary paperwork onsite.
      Free for Buyers, $5 for Standard Parking Seller, $10 for Trailer Parking
      All parking spaces are first come, first serve.
      There is no pre-pay or reservation fee.
      Seller fee is paid onsite at the swap.
      Held regardless of weather unless severe or property is deemed unsafe.
      For more information, contact:
      Linda Vue
      elkmoundswap@gmail.com
      Text 715-440-4835
      or
      Call Dina 715-456-1241`,
    address: "E8994 Highway 12",
    city: "Elk Mound",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Wisconsin Bird & Game Breeder Spring Swap",
    date: "2026-03-07",
    description: `Spring swap is always the second Saturday in March.
      Fall swap & show is always the last Saturday in October.
      6:30am-1:30pm - Swap
      Swap Setup on Friday - 2pm-9pm
      $5 Admission
      For more information, contact:
      Jim Bleuer
      920-379-6188`,
    address: "510 Fond du lac Ave",
    city: "Fond du lac",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Walworth County Fur and Feather Swap",
    date: "2026-04-18",
    description: `Admission is $2, children under twelve free.
      $5 to sell outside, $10 inside
      The swap features a variety of small animals and pets including chickens, turkeys, waterfowl, peacocks, pheasants, rabbits, caged birds and gerbils.
      Equipment and related items will also be sold.
      Health papers required for sale of turkeys.
      Buyers are encouraged to come early.
      A lunch stand will be available on the grounds.
      For more information, contact:
      Dale Wheelock
      dalewheelock@gmail.com
      or
      Rick Henningfeld
      rhenningfeld@vivayic.com`,
    address: "Hwy. 11 East",
    city: "Elkhorn",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 2,
    name: "Wisconsin Bird & Game Breeder Fall Swap",
    date: "2026-10-31",
    description: `Spring swap is always the second Saturday in March.
      Fall swap & show is always the last Saturday in October.
      6:30am-1:30pm - Swap
      Swap Setup on Friday - 2pm-9pm
      $5 Admission
      For more information, contact:
      Jim Bleuer
      920-379-6188`,
    address: "510 Fond du lac Ave",
    city: "Fond du lac",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-04-04",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Taylor County Swap",
    date: "2026-04-04",
    description: `Buyers enter for Free, Sellers pay $10.
      Saturday Swaps: 8am- 12pm
      Sunday Swaps: 10am-12pm
      Now also hosting a Poultry & Rabbit Fun Show during the swap in May & October
      Sellers may set up starting at 7am no pre signup required just show up.
      Buyers will not be allowed entry until 8am.
      (9am for setup and 10am for entry for Sunday swaps)
      April and October swaps will be outside.
      All others will be held in an open sided building.
      Food station available this year serving a few breakfast items as well as brats, hotdogs, and chips.
      Coffee, Hot cocoa, soda, and water.
      Hooved stock will be allowed at some swaps with this year with proper tagging and paperwork requirements, however Dog sales are prohibited.
      For more information, contact:
      Adam Tyznik
      feathersandhooves29@gmail.com
      608-400-5107`,
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-04-18",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Taylor County Swap",
    date: "2026-04-19",
    description: `Buyers enter for Free, Sellers pay $10.
      Saturday Swaps: 8am- 12pm
      Sunday Swaps: 10am-12pm
      Now also hosting a Poultry & Rabbit Fun Show during the swap in May & October
      Sellers may set up starting at 7am no pre signup required just show up.
      Buyers will not be allowed entry until 8am.
      (9am for setup and 10am for entry for Sunday swaps)
      April and October swaps will be outside.
      All others will be held in an open sided building.
      Food station available this year serving a few breakfast items as well as brats, hotdogs, and chips.
      Coffee, Hot cocoa, soda, and water.
      Hooved stock will be allowed at some swaps with this year with proper tagging and paperwork requirements, however Dog sales are prohibited.
      For more information, contact:
      Adam Tyznik
      feathersandhooves29@gmail.com
      608-400-5107`,
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-05-02",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-05-16",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Taylor County Swap",
    date: "2026-05-23",
    description: `Buyers enter for Free, Sellers pay $10.
      Saturday Swaps: 8am- 12pm
      Sunday Swaps: 10am-12pm
      Now also hosting a Poultry & Rabbit Fun Show during the swap in May & October
      Sellers may set up starting at 7am no pre signup required just show up.
      Buyers will not be allowed entry until 8am.
      (9am for setup and 10am for entry for Sunday swaps)
      April and October swaps will be outside.
      All others will be held in an open sided building.
      Food station available this year serving a few breakfast items as well as brats, hotdogs, and chips.
      Coffee, Hot cocoa, soda, and water.
      Hooved stock will be allowed at some swaps with this year with proper tagging and paperwork requirements, however Dog sales are prohibited.
      For more information, contact:
      Adam Tyznik
      feathersandhooves29@gmail.com
      608-400-5107`,
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-05-30",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-06-13",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-06-27",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Taylor County Swap",
    date: "2026-06-27",
    description: `Buyers enter for Free, Sellers pay $10.
      Saturday Swaps: 8am- 12pm
      Sunday Swaps: 10am-12pm
      Now also hosting a Poultry & Rabbit Fun Show during the swap in May & October
      Sellers may set up starting at 7am no pre signup required just show up.
      Buyers will not be allowed entry until 8am.
      (9am for setup and 10am for entry for Sunday swaps)
      April and October swaps will be outside.
      All others will be held in an open sided building.
      Food station available this year serving a few breakfast items as well as brats, hotdogs, and chips.
      Coffee, Hot cocoa, soda, and water.
      Hooved stock will be allowed at some swaps with this year with proper tagging and paperwork requirements, however Dog sales are prohibited.
      For more information, contact:
      Adam Tyznik
      feathersandhooves29@gmail.com
      608-400-5107`,
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-07-11",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Taylor County Swap",
    date: "2026-08-01",
    description: `Buyers enter for Free, Sellers pay $10.
      Saturday Swaps: 8am- 12pm
      Sunday Swaps: 10am-12pm
      Now also hosting a Poultry & Rabbit Fun Show during the swap in May & October
      Sellers may set up starting at 7am no pre signup required just show up.
      Buyers will not be allowed entry until 8am.
      (9am for setup and 10am for entry for Sunday swaps)
      April and October swaps will be outside.
      All others will be held in an open sided building.
      Food station available this year serving a few breakfast items as well as brats, hotdogs, and chips.
      Coffee, Hot cocoa, soda, and water.
      Hooved stock will be allowed at some swaps with this year with proper tagging and paperwork requirements, however Dog sales are prohibited.
      For more information, contact:
      Adam Tyznik
      feathersandhooves29@gmail.com
      608-400-5107`,
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-08-08",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Taylor County Swap",
    date: "2026-08-09",
    description: `Buyers enter for Free, Sellers pay $10.
      Saturday Swaps: 8am- 12pm
      Sunday Swaps: 10am-12pm
      Now also hosting a Poultry & Rabbit Fun Show during the swap in May & October
      Sellers may set up starting at 7am no pre signup required just show up.
      Buyers will not be allowed entry until 8am.
      (9am for setup and 10am for entry for Sunday swaps)
      April and October swaps will be outside.
      All others will be held in an open sided building.
      Food station available this year serving a few breakfast items as well as brats, hotdogs, and chips.
      Coffee, Hot cocoa, soda, and water.
      Hooved stock will be allowed at some swaps with this year with proper tagging and paperwork requirements, however Dog sales are prohibited.
      For more information, contact:
      Adam Tyznik
      feathersandhooves29@gmail.com
      608-400-5107`,
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-08-22",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Taylor County Swap",
    date: "2026-09-05",
    description: `Buyers enter for Free, Sellers pay $10.
      Saturday Swaps: 8am- 12pm
      Sunday Swaps: 10am-12pm
      Now also hosting a Poultry & Rabbit Fun Show during the swap in May & October
      Sellers may set up starting at 7am no pre signup required just show up.
      Buyers will not be allowed entry until 8am.
      (9am for setup and 10am for entry for Sunday swaps)
      April and October swaps will be outside.
      All others will be held in an open sided building.
      Food station available this year serving a few breakfast items as well as brats, hotdogs, and chips.
      Coffee, Hot cocoa, soda, and water.
      Hooved stock will be allowed at some swaps with this year with proper tagging and paperwork requirements, however Dog sales are prohibited.
      For more information, contact:
      Adam Tyznik
      feathersandhooves29@gmail.com
      608-400-5107`,
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-09-19",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-10-03",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "PK Small Animal Swap & Flea Market",
    date: "2026-10-17",
    description: `All events are held on Saturdays.
      7am to noon (April-October)
      $10.00 vendor fee at gate, access to water, no power
      (Sellers encouraged to set up at least half hour early)
      Buyers are free to enter
      Food table on site
      Farmers Market, Flea Market, Animals & Crafts
      No hooved stock or dogs
      For more information, call:
      Paul Kropidlowski
      paulkroppy@yahoo.com
      715-824-3491`,
    address: "4305 Town Line Road",
    city: "Amherst",
    state: "Wisconsin",
    image: null,
  },
  {
    ownerId: 3,
    name: "Taylor County Swap",
    date: "2026-10-24",
    description: `Buyers enter for Free, Sellers pay $10.
      Saturday Swaps: 8am- 12pm
      Sunday Swaps: 10am-12pm
      Now also hosting a Poultry & Rabbit Fun Show during the swap in May & October
      Sellers may set up starting at 7am no pre signup required just show up.
      Buyers will not be allowed entry until 8am.
      (9am for setup and 10am for entry for Sunday swaps)
      April and October swaps will be outside.
      All others will be held in an open sided building.
      Food station available this year serving a few breakfast items as well as brats, hotdogs, and chips.
      Coffee, Hot cocoa, soda, and water.
      Hooved stock will be allowed at some swaps with this year with proper tagging and paperwork requirements, however Dog sales are prohibited.
      For more information, contact:
      Adam Tyznik
      feathersandhooves29@gmail.com
      608-400-5107`,
    address: "State Hwy 13 & WI-64",
    city: "Medford",
    state: "Wisconsin",
    image: "/images/taylor4.jpg",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await SwapMeet.bulkCreate(swapMeets);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SwapMeets";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, { [Op.or]: swapMeets });
  },
};
