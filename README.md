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

        JComboBox comboBox = (JComboBox) evt.getSource();

        ComboItem item = (ComboItem) comboBox.getSelectedItem();

        habilitarBotoes();

        DefaultTableModel model = (DefaultTableModel) jTableDisciplinasProfessor.getModel();

        model.addRow(new Object[]{item.getValue(), item.getLabel()});

    }  
```
----
> ## How to Retrieve JTable Data as an Array

```
public Object[][] getTableData (JTable table) {
    DefaultTableModel dtm = (DefaultTableModel) table.getModel();
    int nRow = dtm.getRowCount(), nCol = dtm.getColumnCount();
    Object[][] tableData = new Object[nRow][nCol];
    for (int i = 0 ; i < nRow ; i++)
        for (int j = 0 ; j < nCol ; j++)
            tableData[i][j] = dtm.getValueAt(i,j);
    return tableData;
}
```

> ## How to get ID of the newly inserted record in database

```
String sql = "YOUR INSERT STATEMENT HERE";
 
PreparedStatement ps = conn.prepareStatement(sql,
        Statement.RETURN_GENERATED_KEYS); //Segredo está aqui
 
ps.execute();
 
ResultSet rs = ps.getGeneratedKeys();
int generatedKey = 0;
if (rs.next()) {
    generatedKey = rs.getInt(1);
}
 
System.out.println("Inserted record's ID: " + generatedKey);
```

> ## N?o permitir edi??o em uma jTable

```
  String[] columnNames = {"ID", "NOME", "CPF", "STATUS", "OP??O"}; //As colunas ser?o adicionadas:


	Professor professores[] = ProfessorController.listarTudo(); //Os dados

	Object[][] data = new Object[professores.length][5]; //O 2, aqui, ? a quantidade de colunas

	int index = 0;

	for (Professor s : professores) {
		data[index][0] = s.getId(); //
		data[index][1] = s.getNome(); //
		data[index][2] = s.getCPF(); //
		data[index][3] = s.getStatus(); //
		data[index][4] = "Excluir"; //
		index++;
	}

	TableModel model = new DefaultTableModel(data, columnNames) {
		private static final long serialVersionUID = 1L;

		public boolean isCellEditable(int row, int column) {
			return column == 4 || column == 5;
		}
	};

	jTableProfessor.setModel(model);
```

