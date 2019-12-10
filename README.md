"# snippets-codes" 

> # Adicionar created_at e update_at a alguma tabela:
 ```sql
ALTER TABLE `turma` 
ADD `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
ADD `update_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
```