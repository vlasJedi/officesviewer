package com.lux.viewer.controllers;

import com.lux.viewer.models.AppUser;
import com.lux.viewer.models.RoleEnum;
import com.lux.viewer.security.AppUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserDetailsService userDetailsService;

    @Autowired
    public UserController(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @GetMapping("/{username}")
    public AppUser getUserInfo(@PathVariable("username") String username, Authentication authentication)
            throws AccessDeniedException {

        if (username.equals(authentication.getName())) {
            return ((AppUserDetails) userDetailsService
                    .loadUserByUsername(authentication.getName()))
                    .getUser();
        }
        boolean isAdminRole = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals(RoleEnum.ADMIN.toSpringRole()));
        if (!isAdminRole) {
            throw new AccessDeniedException(String.format("Forbidden to get info for the user: %s", username));
        }
        return ((AppUserDetails) userDetailsService.loadUserByUsername(username)).getUser();
    }
}
