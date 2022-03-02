package com.surittec.service.auth.jwt;

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;
import java.util.List;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = 121336548878L;

    private final String jwtToken;
    private final String username;
    private final List<String> roles;

    public JwtResponse(String jwtToken, String username, List<String> roles) {
        this.jwtToken = jwtToken;
        this.username = username;
        this.roles = roles;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public String getUsername() {
        return username;
    }

    public List<String> getRoles() {
        return roles;
    }
}
