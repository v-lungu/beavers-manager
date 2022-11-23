DRAFT SQL statements for queries to build off of:
Note: Command Shift K to view in prieview

## **INSERT operation**

`INSERT INTO beaver (name, email, grade) values ('Kyle', 'mr_jake@gmail.com', '01');`

## **GET list of beavers**

`SELECT * FROM beaver;`

## **GET list of guardians**

`SELECT * FROM guardian;`

## **DELETE operation**

`DELETE FROM beaver where name = 'Kyle';`

`DELETE FROM guardian where email = ‘mr_jake@gmail.com’ `

- because of ON DELETE CASCADE clause in beaver, any guardian deleted will also delete the beaver

## **UPDATE operation**

Single attribute update:

`UPDATE beaver SET name = 'Alice WHERE name = 'Kyle';`

Multiple beaver attribute update:

`UPDATE beaver`
`SET name = 'Vlad', grade = '02'`
`WHERE name = 'Kyle';`

## **SELECT operation**

`SELECT * FROM beaver WHERE grade = '01';`

List of beavers with tailColor that is blue

`SELECT DISTINCT *` <br>
`FROM beaver b, tailcolor t` <br>
`WHERE b.grade = t.grade AND t.tail_color = 'Blue';`

## **PROJECT**

`SELECT name, email FROM beaver`

## ** JOIN **

`SELECT *` <br>
`FROM beaver` <br>
`LEFT OUTER JOIN guardian ON beaver.email = guardian.email;`

## **AGGREGATION GROUP BY**

`SELECT guardian.name, guardian.email, count(*)` <br>
`FROM guardian, beaver` <br>
`WHERE guardian.email = beaver.email GROUP BY guardian.email;`

## **AGGREGATION HAVING**

`SELECT guardian.name, guardian.email, count(*)` <br>
`FROM guardian, beaver` <br>
`WHERE guardian.email = beaver.email` <br>
`GROUP BY guardian.email` <br>
`HAVING count(*) > 1;`

## **NESTED AGGREGATION**

TBD

## **DIVISION**

`SELECT *` <br>
`FROM beaver B` <br>
`WHERE NOT EXISTS (SELECT badge.name` <br>
`FROM badge` <br>
`WHERE NOT EXISTS (SELECT BP.email` <br>
`FROM beaverbadgeprogress BP` <br>
`WHERE bp.badge_name = badge.name AND BP.email = B.email AND bp.beaver_name = B.name));`
