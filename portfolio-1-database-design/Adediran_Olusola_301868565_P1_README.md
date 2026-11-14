# Portfolio 1 — Database Design and Modelling

I organised the data into class_group, room, lesson_session. The design document explains the fields, keys, relationships and business rules. The normalisation document shows the sample tables at 1NF, 2NF and 3NF.

## Database checks

| Table | Rows |
| --- | --- |
| class_group | 2 |
| room | 2 |
| lesson_session | 3 |

The 13 invalid inserts were rejected at their expected constraints, and the valid sample rows remained unchanged.

## Files

- [Design](Adediran_Olusola_301868565_P1_Design.md)
- [ER diagram](Adediran_Olusola_301868565_P1_ERDiagram.md)
- [Normalisation](Adediran_Olusola_301868565_P1_Normalisation.md)
- [Schema](Adediran_Olusola_301868565_P1_Schema.sql)
- [Sample data](Adediran_Olusola_301868565_P1_SampleData.sql)
- [Constraint tests](Adediran_Olusola_301868565_P1_ConstraintTests.sql)
- [Table and constraint evidence](screenshots/Adediran_Olusola_301868565_P1_DatabaseResults.png)

## Run the SQL

Create a fresh PostgreSQL database. Run the schema first, then the sample data. Run the deliberately invalid statements in ConstraintTests.sql individually outside a transaction; each is expected to produce an error.

## References

- [PostgreSQL — constraints](https://www.postgresql.org/docs/17/ddl-constraints.html)

