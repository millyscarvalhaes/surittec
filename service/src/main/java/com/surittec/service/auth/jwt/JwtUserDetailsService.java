package com.surittec.service.auth.jwt;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if ("admin".equals(username)) {
            List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();
            grantedAuthorities.add( new SimpleGrantedAuthority("ADMIN"));
            return new User("admin", "$2y$12$QwCVscK68IMExCwZb9.TT.qzHqNrpIdlZROt.xYpA.4SSHmzamWAi", grantedAuthorities);
        }
        else if ("comum".equals(username)) {
            List<SimpleGrantedAuthority> grantedAuthorities = new ArrayList<>();
            grantedAuthorities.add( new SimpleGrantedAuthority("COMUM"));
            return new User("comum", "$2y$12$QwCVscK68IMExCwZb9.TT.qzHqNrpIdlZROt.xYpA.4SSHmzamWAi", grantedAuthorities);
        }
        else  {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }
}
