package com.surittec.service.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.surittec.service.enums.TelefoneTipoEnum;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="telefone")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Telefone {

    @Id
    @GeneratedValue( strategy= GenerationType.AUTO )
    @Column(name="id")
    private long id;

    @Column(name="tipo")
    @Enumerated(EnumType.STRING)
    @NotNull
    private TelefoneTipoEnum tipo;

    @Column(name="numero")
    @NotNull
    private String numero;

    @ManyToOne
    @JsonIgnore
    private Cliente cliente;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TelefoneTipoEnum getTipo() {
        return tipo;
    }

    public void setTipo(TelefoneTipoEnum tipo) {
        this.tipo = tipo;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
}
