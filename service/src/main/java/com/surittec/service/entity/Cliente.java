package com.surittec.service.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name="cliente")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Cliente    {

    @Id
    @GeneratedValue( strategy= GenerationType.AUTO )
    @Column(name="id")
    private long id;

    @Column(name="nome")
    @Size(min = 3, max = 100)
    @NotNull
    private String nome;

    @Column(name="cpf")
    @NotNull
    private String cpf;

    @OneToOne( cascade = {CascadeType.ALL}, orphanRemoval = true)
    private Endereco endereco;

    @OneToMany( cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Telefone> telefoneList;

    @OneToMany(cascade = {CascadeType.ALL}, orphanRemoval = true)
    private List<Email> emailList;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public List<Telefone> getTelefoneList() {
        return telefoneList;
    }

    public void setTelefoneList(List<Telefone> telefoneList) {
        this.telefoneList = telefoneList;
    }

    public List<Email> getEmailList() {
        return emailList;
    }

    public void setEmailList(List<Email> emailList) {
        this.emailList = emailList;
    }
}
