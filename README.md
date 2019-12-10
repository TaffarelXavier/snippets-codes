# snippets-codes

> ## Adicionar __created_at__ e __update_at__ a alguma tabela:

```sql
ALTER TABLE `turma`
ADD `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD `update_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
```
----
> ## Adicionar dados pareados _(label e value)_ a um **ComboBox**:

```java
 Disciplina disciplinas[] = DisciplinaController.listarTudo();

    Vector model = new Vector();

    for (Disciplina disciplina : disciplinas) {
        model.addElement(new ComboItem(disciplina.getCodigoDisciplina(), disciplina.getNomeDisciplina()));
    }

 jComboBoxDisciplina.setModel(new javax.swing.DefaultComboBoxModel<>(model));
```
----

> ## Pegar o valor: value e label de um **ComboBox**:
```
private void jComboBoxDisciplinaActionPerformed(java.awt.event.ActionEvent evt) {                                                    
        // TODO add your handling code here:
        JComboBox comboBox = (JComboBox) evt.getSource();

        ComboItem item = (ComboItem) comboBox.getSelectedItem();

        habilitarBotoes();

        DefaultTableModel model = (DefaultTableModel) jTableDisciplinasProfessor.getModel();

        model.addRow(new Object[]{item.getValue(), item.getLabel()});

    }  
```