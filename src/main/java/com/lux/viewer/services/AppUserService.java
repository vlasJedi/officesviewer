package com.lux.viewer.services;

import com.lux.viewer.models.AppUser;
import com.lux.viewer.repositories.AppUserRepository;
import com.lux.viewer.security.AppUserDetails;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

// @Service designed to be stateless
@Service
public class AppUserService implements UserDetailsService {
    private final AppUserRepository userRepository;

    @Autowired
    public AppUserService(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    // mark whole method to be within an opened transaction
    // to force fetch of roles
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // build template object to match against
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths("id", "firstName", "secondName")
                .withMatcher("username", (genericPropertyMatcher) -> {
                    genericPropertyMatcher.stringMatcher(ExampleMatcher.StringMatcher.EXACT);
                });
        AppUser appUserToFind = new AppUser();
        appUserToFind.setUsername(username);
        // find by example
        Optional<AppUser> userOpt = userRepository.findOne(Example.of(appUserToFind, matcher));
        if (userOpt.isEmpty()) throw new UsernameNotFoundException("Username not found");
        // force fetch of roles as they are lazy loaded and currently is opened transaction
        // so entity of user is NOT in detached state
        // REFACTOR FOR SPRING APPROACH
        userOpt.get().getRoles().size();
        return new AppUserDetails(userOpt.get());
    }
}
