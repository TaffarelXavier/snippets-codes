
```java
//O pacote donde se encontra a classe AlunoController
package controllers;

import servicos.Funcoes;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.swing.JOptionPane;
import modelos.Aluno;
import servicos.Conexao;


 * @author Taffarel Xavier <taffarel_deus@hotmail.com>
 */
public class AlunoController extends Funcoes {

    /**
     * *
     *
     * @param nome
     * @param dataNascimento
     * @param cpf
     * @param telefone
     * @param email
     * @return
     */
```
> # Incluir / Insert
```java
    public static int incluir(String nome, String dataNascimento, String cpf, String telefone, String email) {
        try {
            String sql = "INSERT INTO aluno (nomealuno, data_nascimento,"
                    + " cpf, telefone, email) VALUES (?,?,?,?,?);";
            PreparedStatement preparedStatement = Conexao.conectar().prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            preparedStatement.setString(1, nome.trim());
            preparedStatement.setString(2, dataNascimento.trim());
            preparedStatement.setString(3, cpf.trim());
            preparedStatement.setString(4, telefone.trim());
            preparedStatement.setString(5, email.trim());

            int affectedRows = preparedStatement.executeUpdate();

            if (affectedRows == 0) {
                JOptionPane.showMessageDialog(null, "A criação do usuário falhou!", "Atenção", 1);
                return -1;
            }

            ResultSet rs = preparedStatement.getGeneratedKeys();

            int generatedKey = 0;

            if (rs.next()) {
                generatedKey = rs.getInt(1); //Retorna o ID da inserção.
            } else {
                JOptionPane.showMessageDialog(null, "A criação do usuário falhou!", "Atenção", 1);
                return -1;
            }

            return generatedKey;

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Atenção: erro!", 1);
        }
        return 0;
    }
```
> # Excluir / Delete
```java
    /**
     *
     * @param alunoId
     * @return
     */
    public static int excluir(int alunoId) {
        String sql = "DELETE FROM aluno WHERE codaluno = ?;";
        PreparedStatement preparedStatement;
        try {
            preparedStatement = Conexao.conectar().prepareStatement(sql,
                    ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);
            preparedStatement.setInt(1, alunoId);
            return preparedStatement.executeUpdate();
        } catch (Exception ex) {
        }
        return 0;
    }
```
> # Atualizar / UPDATE
```java
    /**
     *
     * @param nome
     * @param dataNascimento
     * @param cpf
     * @param telefone
     * @param email
     * @param alunoIDd
     * @return
     */
    public static int alterar(String nome, String dataNascimento, String cpf, String telefone, String email, int alunoIDd) {
        try {
            String sql = "UPDATE aluno SET nomealuno = ?, data_nascimento =?,"
                    + " cpf = ?, telefone =?, email=? WHERE codaluno=?";
            PreparedStatement preparedStatement = Conexao.conectar().prepareStatement(sql,
                    ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_READ_ONLY);
            preparedStatement.setString(1, nome.trim());
            preparedStatement.setString(2, dataNascimento.trim());
            preparedStatement.setString(3, cpf.trim());
            preparedStatement.setString(4, telefone.trim());
            preparedStatement.setString(5, email.trim());
            preparedStatement.setInt(6, alunoIDd);
            return preparedStatement.executeUpdate();
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, e.getMessage(), "Atenção: erro!", 1);
        }
        return 0;
    }
```
> # Listar Tudo / Listing / Read
```java
    public static Aluno[] listarTodos() throws Exception {

        PreparedStatement stm;

        try {

            stm = Conexao.conectar().prepareStatement("SELECT * FROM aluno;");

            ResultSet rs = stm.executeQuery();

            if (!rs.next()) {
                System.out.println("Nenhum registro encontrado.");
            } else {

                Aluno[] alunos = new Aluno[getTotalDeRegistros(rs)];

                int i = 0;

                while (rs.next()) {
                    //String nomeALuno, int codigoAluno, String , String , String , String 
                    alunos[i] = new Aluno(rs.getString("nomealuno"),
                            rs.getInt("codaluno"),
                            rs.getString("data_nascimento"),
                            rs.getString("cpf"),
                            rs.getString("email"),
                            rs.getString("telefone")
                    );
                    ++i;
                }

                return alunos;
            }

        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        return null;
    }
```
> # Filtrar dados
```java
    public static Aluno[] filtrarDadosAluno(String filtro, String filtroTipo) throws Exception {

        PreparedStatement preparedStatement = null;

        try {
            String sql;

            ResultSet rs = null;

            if (filtroTipo.toLowerCase().equals("nome".toLowerCase())) {
                sql = "SELECT * FROM aluno WHERE nomealuno LIKE ?;";
                preparedStatement = Conexao.conectar().prepareStatement(sql);
                preparedStatement.setString(1, "%" + filtro + "%");
            } else if (filtroTipo.toLowerCase().equals("cpf".toLowerCase())) {
                sql = "SELECT * FROM aluno WHERE cpf = ?;";
                preparedStatement = Conexao.conectar().prepareStatement(sql);
                preparedStatement.setString(1, filtro);

            }
            rs = preparedStatement.executeQuery();

            if (!rs.next()) {
                System.out.println("Nenhum registro encontrado para alunos.");
            } else {

                Aluno[] alunos = new Aluno[getTotalDeRegistros(rs)];

                int i = 0;

                while (rs.next()) {
                    //String nomeALuno, int codigoAluno, String , String , String , String 
                    alunos[i] = new Aluno(rs.getString("nomealuno"),
                            rs.getInt("codaluno"),
                            rs.getString("data_nascimento"),
                            rs.getString("cpf"),
                            rs.getString("email"),
                            rs.getString("telefone")
                    );
                    ++i;
                }
                return alunos;
            }

        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        return null;
    }
```
> # Obter dados por id do aluno, por exemplo:
```java
    public static Aluno[] getDadosPorAlunoId(int alunoId) throws Exception {

        PreparedStatement preparedStatement;

        try {

            preparedStatement = Conexao.conectar().prepareStatement("SELECT * FROM aluno WHERE codaluno = ? LIMIT 1;");

            preparedStatement.setInt(1, alunoId);

            ResultSet rs = preparedStatement.executeQuery();

            if (!rs.next()) {
                System.out.println("Nenhum registro encontrado para alunos.");
            } else {

                Aluno[] alunos = new Aluno[getTotalDeRegistros(rs)];

                int i = 0;

                while (rs.next()) {
                    //String nomeALuno, int codigoAluno, String , String , String , String 
                    alunos[i] = new Aluno(rs.getString("nomealuno"),
                            rs.getInt("codaluno"),
                            rs.getString("data_nascimento"),
                            rs.getString("cpf"),
                            rs.getString("email"),
                            rs.getString("telefone")
                    );
                    ++i;
                }
                return alunos;
            }

        } catch (SQLException ex) {
            JOptionPane.showMessageDialog(null, ex.getMessage());
        }
        return null;
    }
}
```