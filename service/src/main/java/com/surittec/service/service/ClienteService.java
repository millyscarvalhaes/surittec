package com.surittec.service.service;

import com.surittec.service.config.CustomValidationException;
import com.surittec.service.entity.Cliente;
import com.surittec.service.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    ClienteRepository clienteRepository;


    public List<Cliente> listar(){
        return clienteRepository.findAll();
    }

    public Cliente buscaPeloId(Long id){
        return clienteRepository.getOne(id);
    }

    public Cliente salvar(Cliente cliente){

        if(cliente.getTelefoneList() == null || cliente.getTelefoneList().size() < 1){
            throw new CustomValidationException("Telefone", "Pelo menos um telefone deve ser cadastrado.");
        }

        if(cliente.getEmailList() == null || cliente.getEmailList().size() < 1){
            throw new CustomValidationException("E-mail", "Pelo menos um e-mail deve ser cadastrado.");
        }

        return  clienteRepository.save(cliente);
    }

    public boolean excluir(Long id){
        if(this.buscaPeloId(id) != null) {
            clienteRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
