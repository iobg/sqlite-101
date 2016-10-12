'use strict'

const { Database } = require('sqlite3').verbose()
const db = new Database('db/Chinook_Sqlite.sqlite')
const Table = require('cli-table')

var table = new Table({
    head: ['Invoice Id', 'Name','Date', 'Billing Country']
  , colWidths: []
});

db.serialize(()=>{
	db.each(`
SELECT FirstName ||' '|| LastName AS 'Name',
			 InvoiceId,
			 InvoiceDate,
			 BillingCountry
FROM 	 Invoice
JOIN   Customer
ON Invoice.customerId = Customer.CustomerId
WHERE  Country = 'Brazil'`
					,(err,{InvoiceId,Name,InvoiceDate,BillingCountry})=>{
						table.push([InvoiceId,Name,InvoiceDate,BillingCountry])
						
				},()=>{
					console.log(table.toString())
				})
	
})


	
db.close()
