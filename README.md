# Snippets-Codes - Trechos de Códigos

# __1 SQL__

> ## Adicionar __created_at__ e __update_at__ a alguma tabela:

```sql
ALTER TABLE `turma`
ADD `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD `update_at` TIMESTAMP on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
```
----
# __2 jTable__

> ## 2.1 Como obter dados de uma JTable como um Array
> ```java
> public Object[][] getTableData (JTable table) {
>    DefaultTableModel dtm = (DefaultTableModel) table.getModel();
>    int nRow = dtm.getRowCount(), nCol = dtm.getColumnCount();
>    Object[][] tableData = new Object[nRow][nCol];
>    for (int i = 0 ; i < nRow ; i++)
>        for (int j = 0 ; j < nCol ; j++)
>            tableData[i][j] = dtm.getValueAt(i,j);
>    return tableData;
> }
> ```
> <br>
----

> ## 2.2 How to get ID of the newly inserted record in database

```java
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
---

> ## 2.3 Como to clear JTable / Como limpar uma JTable
> 
> ```java
> JTable table; //A tabela
> DefaultTableModel model = (DefaultTableModel) table.getModel();
> model.setRowCount(0);
> ```
> <br>
---

> ## 2.4 Não permitir edição em uma jTable

```java
  //Exemplo 1
  String[] columnNames = {"ID", "NOME", "CPF", "STATUS", "OPÇÃO"}; //As colunas ser?o adicionadas:

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
			//return column == 4 || column == 5; Alguma coluna
			return false; //Todas as colunas;
		}
	};

	jTableProfessor.setModel(model); //Fim exemplo 1
	
	//Exemplo 2
	
	 void naoPermitirEdicaoJTable() {

        TableModel model = new DefaultTableModel() {
            private static final long serialVersionUID = 1L;

            @Override
            public boolean isCellEditable(int row, int column) {
                return column == 4 || column == 5;
            }
        };

        jTableDisciplinas.setModel(model);

    }

    //Exemplo 3
    jTableDisciplina.setModel(new DefaultTableModel(data, columnNames) {
        private static final long serialVersionUID = 1L;

        @Override
        public boolean isCellEditable(int row, int column) {
            //return column == 4 || column == 5; Alguma coluna
            return false; //Todas as colunas;
        }
    });
	
```
---
> ## 2.5 Pega o index da Tabela (jTable) ao clicar sobre ela:
> ```java
> //Pega o  index da Tabela ao clicar sobre ela:
> int rowIndex = jTableAluno.convertRowIndexToModel(jTableAluno.getSelectedRow());
> //Pega o modelo da tabela
> TableModel model = jTableAluno.getModel();
> //Pega o Id da linha selecionada, na coluna 1, (1-1=0):
> int id = Integer.parseInt(model.getValueAt(rowIndex, 0).toString());
> 
> ```
> **Geralmente, usa-se este trecho de código com o evento myTableNameMouseClicked. <br><br>**
---

> # __3 JOptionPane__

> ## 3.1 Como mostrar diálogo de confirmação: 

``` java
int dialogResult = JOptionPane.showConfirmDialog(null, "Deseja realmente pagar?", "Warning",JOptionPane.YES_NO_OPTION, JOptionPane.QUESTION_MESSAGE );
if (dialogResult == JOptionPane.YES_OPTION) {
    // Saving code here
} 
```
---

#  __4 JCOMBOBOX__

> ## 4.1 Adicionar um item
> ```java
> comboBox.addItem("item");
> ```
> <br>
---
> ## 4.2 Mostra o componente que foi selecionado:
> ```java
> jComboBoxClienteCNH.getSelectedItem();
> ```
> <br>
---
> ## 4.3 Retorna a posição do componente selecionado:
> ```java
> jComboBox1.getSelectedIndex();
> ``` 
><br>
---
> ## 4.4 Selecionar um item conforme algum critério
> ```java
> jComboBox1.setSelectedItem("AB");
> ```
> <br>
---
> ## 4.5 Remover todos os itens
> ```java
> jComboBox1.removeAllItems();
> ```
> <br>
---
> ## 4.6 Adicionar itens de um array a um combobox
> ```java
> JComboBox b = new JComboBox(new String[]{"String1","String2"});
> ```
> <br>
---
> ## 4.6 Retorna a quantidade de elementos de um combobox
> ```java
> jComboBox1.getItemCount();
> ```
> <br>

----
> ## 4.7 Adicionar dados pareados _(label e value)_ a um **ComboBox**:
> ```java
> Disciplina disciplinas[] = DisciplinaController.listarTudo();
>
>    Vector model = new Vector();
>
>    for (Disciplina disciplina : disciplinas) {
>        model.addElement(new ComboItem(disciplina.getCodigoDisciplina(), disciplina.getNomeDisciplina()));
>    }
>
> jComboBoxDisciplina.setModel(new javax.swing.DefaultComboBoxModel<>(model));
> ```
> <br>

> ## 4.8 Pegar o valor: value e label de um **ComboBox**:
> ```java
> private void jComboBoxDisciplinaActionPerformed(java.awt.event.ActionEvent evt) {                 >
>        JComboBox comboBox = (JComboBox) evt.getSource();
>
>        ComboItem item = (ComboItem) comboBox.getSelectedItem();
>
>        habilitarBotoes();
>
>       DefaultTableModel model = (DefaultTableModel) jTableDisciplinasProfessor.getModel();
>
>        model.addRow(new Object[]{item.getValue(), item.getLabel()});
>
>    }  
> ```
> <br>