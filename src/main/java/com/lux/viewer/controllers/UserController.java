package com.lux.viewer.controllers;

import com.lux.viewer.models.AppUser;
import com.lux.viewer.models.Role;
import com.lux.viewer.models.RoleEnum;
import com.lux.viewer.security.AppUserDetails;
import com.lux.viewer.services.AppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {
    private final AppUserService userService;

    @Autowired
    public UserController(AppUserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{username}")
    public AppUser getUserInfo(@PathVariable("username") String username, Authentication authentication)
            throws AccessDeniedException {

        if (username.equals(authentication.getName())) {
            return ((AppUserDetails) userService
                    .loadUserByUsername(authentication.getName()))
                    .getUser();
        }
        boolean isAdminRole = authentication.getAuthorities().stream()
                .anyMatch(role -> role.getAuthority().equals(RoleEnum.ADMIN.toSpringRole()));
        if (!isAdminRole) {
            throw new AccessDeniedException(String.format("Forbidden to get info for the user: %s", username));
        }
        return ((AppUserDetails) userService.loadUserByUsername(username)).getUser();
    }

    @PutMapping(value = "/{userId}", consumes = {"application/json"})
    public AppUser updateUserInfo(@PathVariable("userId") Long userId, @RequestBody AppUser appUser, Authentication auth)
            throws AccessDeniedException {
        Optional<AppUser> found = userService.getByUserId(userId);
        if (found.isEmpty()
                // if mismatch id vs username
                || !found.get().getUsername().equals(appUser.getUsername())
                // mismatch auth user and provided to update (possibly ADMIN right can be used)
                || !found.get().getUsername().equals(auth.getName())) {
            throw new UsernameNotFoundException("Either user id is missing or mismatch between id and username");
        }
        Set<RoleEnum> dbUserRoles = found.get().getRoles().stream().map(Role::getRoleName).collect(Collectors.toSet());
        Set<RoleEnum> providedUserRoles = appUser.getRoles().stream().map(Role::getRoleName).collect(Collectors.toSet());
        // allow user roles change only for ADMIN
        if (!dbUserRoles.contains(RoleEnum.ADMIN) && !dbUserRoles.equals(providedUserRoles)) {
            throw new AccessDeniedException("User roles not allowed to updated!");
        }
        return userService.updateUser(appUser);
    }

}
