package com.surittec.service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="endereco")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Endereco {

    @Id
    @GeneratedValue( strategy= GenerationType.AUTO )
    @Column(name="id")
    private long id;

    @Column(name="cep")
    @NotNull
    private String cep;

    @Column(name="logradouro")
    @NotNull
    private String logradouro;

    @Column(name="bairro")
    @NotNull
    private String bairro;

    @Column(name="cidade")
    @NotNull
    private String cidade;

    @Column(name="uf")
    @NotNull
    private String uf;

    @Column(name="complemento")
    private String complemento;

    @OneToOne
    @JoinColumn(name = "cliente_id")
    @JsonIgnore
    private Cliente cliente;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
