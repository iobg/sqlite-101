'use strict'

const { Database } = require('sqlite3').verbose()
const db = new Database('db/Chinook_Sqlite.sqlite')
const Table = require('cli-table')
const knex = require('knex')({
	client:'sqlite3',
	connection:{
		filename:'db/Chinook_Sqlite.sqlite'
	},
	useNullAsDefault:true
})

// var table = new Table({
//     head: ['Invoice Id', 'Name','Date', 'Billing Country']
//   , colWidths: []
// });
// //basic sqlite3
// db.serialize(()=>{
// 	db.each(`
// 		SELECT FirstName ||' '|| LastName AS 'Name',
// 					 InvoiceId,
// 					 InvoiceDate,
// 					 BillingCountry
// 		FROM 	 Invoice
// 		JOIN   Customer
// 		ON Invoice.customerId = Customer.CustomerId
// 		WHERE  Country = 'Brazil'`
		
// 				,(err,{InvoiceId,Name,InvoiceDate,BillingCountry})=>{
// 						table.push([InvoiceId,Name,InvoiceDate,BillingCountry])
// 				},()=>y
// 					console.log(table.toString())
// 				})
	
// })
// db.close()

//using knex
//#5
knex('Invoice').distinct('BillingCountry').orderBy('BillingCountry')
.then(console.log)
//#6
knex('Invoice').where('BillingCountry', 'Brazil')
.then(console.log)
//#7
knex('Invoice')
.select(knex.raw(`Employee.FirstName ||' '|| Employee.LastName as Name, Invoice.*`))
.join('Customer','Invoice.CustomerId', 'Customer.CustomerId')
.join('Employee' ,'Customer.SupportRepId', 'Employee.EmployeeId')
.then(console.log)
//#8
knex('Invoice')
.select(knex.raw(`Employee.FirstName ||' '|| Employee.LastName as Name, SUM(Invoice.Total) as Total, Customer.FirstName,Invoice.BillingCountry`))
.join('Customer','Customer.CustomerId', 'Invoice.CustomerId')
.join('Employee','Customer.SupportRepId', 'Employee.EmployeeId')
.then(console.log)


knex.destroy()
