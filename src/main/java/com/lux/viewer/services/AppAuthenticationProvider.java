package com.lux.viewer.services;

import com.lux.viewer.security.AppUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

// custom implementation of authProvider for AuthManager service
// AuthManager can use several providers by type of auth that they support
// For regular password-based auth this provider can be ignored
@Service
public class AppAuthenticationProvider implements AuthenticationProvider {
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AppAuthenticationProvider(UserDetailsService userDetailsService, PasswordEncoder encoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = encoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String inputPassword = authentication.getCredentials().toString();
        String username = authentication.getPrincipal().toString();
        if (inputPassword.isEmpty() || username.isEmpty()) throw new BadCredentialsException("Bad credentials");
        AppUserDetails userDetails = (AppUserDetails) userDetailsService.loadUserByUsername(username);
        if (!passwordEncoder.matches(inputPassword, userDetails.getPassword()))
            throw new BadCredentialsException("Bad credentials");
        // new to re-create authentication as token which will be used in SecurityContextHolder
        return new UsernamePasswordAuthenticationToken(username,
                inputPassword, userDetails.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }
}
