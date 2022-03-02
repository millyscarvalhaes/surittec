package com.surittec.service.controller;

import com.surittec.service.entity.Cliente;
import com.surittec.service.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("cliente")
public class ClientController {

    @Autowired
    ClienteService clienteService;

    @GetMapping
    public ResponseEntity<?> listar(){
        return new ResponseEntity<>(clienteService.listar(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPeloId(@PathVariable Long id){
        return new ResponseEntity<>(clienteService.buscaPeloId(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping
    public ResponseEntity<?> salvar(@RequestBody @Valid  Cliente cliente){
        return new ResponseEntity<>(clienteService.salvar(cliente), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PutMapping
    public ResponseEntity<?> atualizar(@RequestBody Cliente cliente){
        return new ResponseEntity<>(clienteService.salvar(cliente), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id){
        clienteService.excluir(id);
        return new ResponseEntity<>("", HttpStatus.OK);
    }



    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/adm")
    public ResponseEntity<?> listAdm(){
        return new ResponseEntity<>("SÓ ADM PODE ACESSAR", HttpStatus.OK);
    }

}
