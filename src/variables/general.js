// ##############################
// // // for vector map row in Dashboard view
// #############################

const us_flag = require("../assets/img/flags/US.png")
const de_flag = require("../assets/img/flags/DE.png")
const au_flag = require("../assets/img/flags/AU.png")
const gb_flag = require("../assets/img/flags/GB.png")
const ro_flag = require("../assets/img/flags/RO.png")
const br_flag = require("../assets/img/flags/BR.png")

const table_data = [
  { flag: us_flag, country: "USA", count: "2.920", percentage: "53.23%" },
  { flag: de_flag, country: "Germany", count: "1.300", percentage: "20.43%" },
  { flag: au_flag, country: "Australia", count: "760", percentage: "10.35%" },
  { flag: gb_flag, country: "United Kingdom", count: "690", percentage: "7.87%" },
  { flag: ro_flag, country: "Romania", count: "600", percentage: "5.94%" },
  { flag: br_flag, country: "Brasil", count: "550", percentage: "4.34%" }
]

// tasks list for Tasks card in Dashboard view
// data for <thead> of table in Tables view
// data for <tbody> of table in Tables view
// data for the timeline in Timeline view
// data for the timeline in Widgets view
// data for datatables.net in DataTables view
// data for populating the calendar in Calendar view
// data for populating the table from Dashboard view
export {
  table_data
}